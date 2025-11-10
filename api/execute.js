/**
 * Unified REST API Endpoint - Executes tools from ALL 16 integrations
 * NO MCP dependencies - pure JavaScript with native fetch()
 */

// Import all 16 integration executors
const { executeGitHubTool } = require('../lib/github');
const { executeVercelTool } = require('../lib/vercel');
const { executeNeonTool } = require('../lib/neon');
const { executeGoogleTool } = require('../lib/google');
const { executeUpstashTool } = require('../lib/upstash');
const { executeStripeTool } = require('../lib/stripe');
const { executeSupabaseTool } = require('../lib/supabase');
const { executeCloudflareTool } = require('../lib/cloudflare');
const { executeResendTool } = require('../lib/resend');
const { executePlaywrightTool } = require('../lib/playwright');
const { executePostgresTool } = require('../lib/postgres');
const { executeTwilioTool } = require('../lib/twilio');
const { executeNeo4jTool } = require('../lib/neo4j');
const { executeQdrantTool } = require('../lib/qdrant');
const { executeContext7Tool } = require('../lib/context7');
const { executeN8nTool } = require('../lib/n8n');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authentication check
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  if (process.env.API_SECRET_KEY && apiKey !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
  }

  try {
    const { tool, args = {} } = req.body;

    if (!tool) {
      return res.status(400).json({ error: 'Missing tool parameter' });
    }

    console.log('Executing tool:', tool, 'with args:', JSON.stringify(args));

    // Gather credentials from environment variables
    const credentials = {
      githubToken: process.env.GITHUB_TOKEN,
      vercelToken: process.env.VERCEL_TOKEN,
      neonApiKey: process.env.NEON_API_KEY,
      googleToken: process.env.GOOGLE_TOKEN,
      upstashApiKey: process.env.UPSTASH_API_KEY,
      stripeApiKey: process.env.STRIPE_API_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      cloudflareApiKey: process.env.CLOUDFLARE_API_KEY,
      cloudflareEmail: process.env.CLOUDFLARE_EMAIL,
      resendApiKey: process.env.RESEND_API_KEY,
      twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
      twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
      neo4jUri: process.env.NEO4J_URI,
      neo4jUser: process.env.NEO4J_USER,
      neo4jPassword: process.env.NEO4J_PASSWORD,
      qdrantUrl: process.env.QDRANT_URL,
      qdrantApiKey: process.env.QDRANT_API_KEY,
      context7ApiKey: process.env.CONTEXT7_API_KEY,
      n8nUrl: process.env.N8N_URL,
      n8nApiKey: process.env.N8N_API_KEY
    };

    let result;

    // Route to appropriate integration based on tool prefix
    if (tool.startsWith('github_')) {
      result = await executeGitHubTool(tool, args, credentials.githubToken);
    } else if (tool.startsWith('vercel_')) {
      result = await executeVercelTool(tool, args, credentials.vercelToken);
    } else if (tool.startsWith('neon_')) {
      result = await executeNeonTool(tool, args, credentials.neonApiKey);
    } else if (tool.startsWith('google_')) {
      result = await executeGoogleTool(tool, args, credentials.googleToken);
    } else if (tool.startsWith('upstash_')) {
      result = await executeUpstashTool(tool, args, credentials.upstashApiKey);
    } else if (tool.startsWith('stripe_')) {
      result = await executeStripeTool(tool, args, credentials.stripeApiKey);
    } else if (tool.startsWith('supabase_')) {
      result = await executeSupabaseTool(tool, args, {
        url: credentials.supabaseUrl,
        key: credentials.supabaseKey
      });
    } else if (tool.startsWith('cloudflare_')) {
      result = await executeCloudflareTool(tool, args, {
        apiKey: credentials.cloudflareApiKey,
        email: credentials.cloudflareEmail
      });
    } else if (tool.startsWith('resend_')) {
      result = await executeResendTool(tool, args, credentials.resendApiKey);
    } else if (tool.startsWith('playwright_')) {
      result = await executePlaywrightTool(tool, args, {});
    } else if (tool.startsWith('postgres_')) {
      result = await executePostgresTool(tool, args, {});
    } else if (tool.startsWith('twilio_')) {
      result = await executeTwilioTool(tool, args, {
        accountSid: credentials.twilioAccountSid,
        authToken: credentials.twilioAuthToken
      });
    } else if (tool.startsWith('neo4j_')) {
      result = await executeNeo4jTool(tool, args, {
        uri: credentials.neo4jUri,
        user: credentials.neo4jUser,
        password: credentials.neo4jPassword
      });
    } else if (tool.startsWith('qdrant_')) {
      result = await executeQdrantTool(tool, args, {
        url: credentials.qdrantUrl,
        apiKey: credentials.qdrantApiKey
      });
    } else if (tool.startsWith('context7_')) {
      result = await executeContext7Tool(tool, args, credentials.context7ApiKey);
    } else if (tool.startsWith('n8n_')) {
      result = await executeN8nTool(tool, args, {
        url: credentials.n8nUrl,
        apiKey: credentials.n8nApiKey
      });
    } else {
      return res.status(400).json({ 
        error: `Unknown tool: ${tool}`,
        hint: 'Tool must start with one of: github_, vercel_, neon_, google_, upstash_, stripe_, supabase_, cloudflare_, resend_, playwright_, postgres_, twilio_, neo4j_, qdrant_, context7_, n8n_'
      });
    }

    return res.status(200).json({
      ok: true,
      tool,
      result
    });

  } catch (error) {
    console.error('Error executing tool:', error);
    return res.status(500).json({
      ok: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
