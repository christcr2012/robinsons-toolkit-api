/**
 * Robinson's Toolkit REST API - Universal Tool Executor
 * Standalone REST API with 1,655 tools across 17 integrations
 */

const MAX_RESPONSE_SIZE = 100 * 1024; // 100KB limit
// Force redeploy - 268 tools implemented for Custom GPT

// Response size checker
function checkResponseSize(data, maxSize = MAX_RESPONSE_SIZE) {
  const jsonStr = JSON.stringify(data);
  if (jsonStr.length > maxSize) {
    throw new Error(`Response too large: ${(jsonStr.length / 1024).toFixed(2)}KB (max: ${(maxSize / 1024).toFixed(2)}KB). Use pagination parameters to reduce response size.`);
  }
  return data;
}

// Authentication helper
function getAuthToken(integration) {
  const envMap = {
    github: 'GITHUB_TOKEN',
    vercel: 'VERCEL_TOKEN',
    neon: 'NEON_API_KEY',
    upstash: 'UPSTASH_API_KEY',
    gmail: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    drive: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    calendar: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    sheets: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    docs: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    admin: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    slides: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    tasks: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    people: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    forms: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    classroom: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    chat: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    openai: 'OPENAI_API_KEY',
    stripe: 'STRIPE_SECRET_KEY',
    supabase: 'SUPABASE_KEY',
    twilio: 'TWILIO_AUTH_TOKEN',
    resend: 'RESEND_API_KEY',
    cloudflare: 'CLOUDFLARE_API_TOKEN',
    postgres: 'POSTGRES_CONNECTION_STRING',
    neo4j: 'NEO4J_URI',
    qdrant: 'QDRANT_URL',
    n8n: 'N8N_API_KEY',
    context7: 'CONTEXT7_API_KEY'
  };
  
  const envVar = envMap[integration];
  if (!envVar) return null;
  
  const token = process.env[envVar];
  if (!token) {
    throw new Error(`${envVar} not configured`);
  }
  
  return token;
}

// Import integration handlers
const githubHandler = require('./handlers/github');
const vercelHandler = require('./handlers/vercel');
const neonHandler = require('./handlers/neon');
const upstashHandler = require('./handlers/upstash');
const googleHandler = require('./handlers/google');
const openaiHandler = require('./handlers/openai');
const stripeHandler = require('./handlers/stripe');
const supabaseHandler = require('./handlers/supabase');
const playwrightHandler = require('./handlers/playwright');
const twilioHandler = require('./handlers/twilio');
const resendHandler = require('./handlers/resend');
const cloudflareHandler = require('./handlers/cloudflare');
const postgresHandler = require('./handlers/postgres');
const neo4jHandler = require('./handlers/neo4j');
const qdrantHandler = require('./handlers/qdrant');
const n8nHandler = require('./handlers/n8n');
const context7Handler = require('./handlers/context7');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // API Key authentication
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid or missing API key' });
  }
  
  try {
    const { tool, ...params } = req.body;

    if (!tool) {
      return res.status(400).json({ error: 'Missing required field: tool' });
    }

    // Extract tool parameters (everything except 'tool' field)
    const toolArgs = params;

    // Extract integration from tool name (e.g., "github_list_repos" -> "github")
    const integration = tool.split('_')[0];
    
    // Route to appropriate handler
    let result;
    
    switch (integration) {
      case 'github':
        result = await githubHandler.execute(tool, toolArgs);
        break;
      case 'vercel':
        result = await vercelHandler.execute(tool, toolArgs);
        break;
      case 'neon':
        result = await neonHandler.execute(tool, toolArgs);
        break;
      case 'upstash':
        result = await upstashHandler.execute(tool, toolArgs);
        break;
      case 'gmail':
      case 'drive':
      case 'calendar':
      case 'sheets':
      case 'docs':
      case 'admin':
      case 'slides':
      case 'tasks':
      case 'people':
      case 'forms':
      case 'classroom':
      case 'chat':
        result = await googleHandler.execute(tool, toolArgs);
        break;
      case 'openai':
        result = await openaiHandler.execute(tool, toolArgs);
        break;
      case 'stripe':
        result = await stripeHandler.execute(tool, toolArgs);
        break;
      case 'supabase':
        result = await supabaseHandler.execute(tool, toolArgs);
        break;
      case 'playwright':
        result = await playwrightHandler.execute(tool, toolArgs);
        break;
      case 'twilio':
        result = await twilioHandler.execute(tool, toolArgs);
        break;
      case 'resend':
        result = await resendHandler.execute(tool, toolArgs);
        break;
      case 'cloudflare':
        result = await cloudflareHandler.execute(tool, toolArgs);
        break;
      case 'postgres':
        result = await postgresHandler.execute(tool, toolArgs);
        break;
      case 'neo4j':
        result = await neo4jHandler.execute(tool, toolArgs);
        break;
      case 'qdrant':
        result = await qdrantHandler.execute(tool, toolArgs);
        break;
      case 'n8n':
        result = await n8nHandler.execute(tool, toolArgs);
        break;
      case 'context7':
        result = await context7Handler.execute(tool, toolArgs);
        break;
      default:
        return res.status(400).json({ error: `Unknown integration: ${integration}` });
    }
    
    // Check response size and return
    const checkedResult = checkResponseSize(result);
    return res.status(200).json({ result: checkedResult });
    
  } catch (error) {
    console.error('Error executing tool:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error',
      tool: req.body?.tool
    });
  }
};

