#!/usr/bin/env node

/**
 * Extract ALL tools from Robinson's Toolkit MCP and generate standalone REST API handlers
 * 
 * This script:
 * 1. Reads the MCP server source code
 * 2. Extracts all tool definitions (1,324+ tools)
 * 3. Generates REST API handler code for each tool
 * 4. Creates integration-specific handler files
 * 5. Updates the main execute.js with all handlers
 */

const fs = require('fs');
const path = require('path');

const MCP_REPO = path.join(__dirname, '../../robinsonai-mcp-servers');
const API_REPO = path.join(__dirname, '..');
const TOOLKIT_SRC = path.join(MCP_REPO, 'packages/robinsons-toolkit-mcp/src');

console.log('🔍 Extracting ALL tools from Robinson\'s Toolkit MCP...\n');

// Tool definitions from index.ts
const INDEX_TS = path.join(TOOLKIT_SRC, 'index.ts');
const indexContent = fs.readFileSync(INDEX_TS, 'utf8');

// Extract tool definitions using regex
const toolRegex = /{\s*name:\s*['"]([^'"]+)['"]\s*,\s*description:\s*['"]([^'"]+)['"]\s*,\s*inputSchema:\s*({[^}]+(?:{[^}]*}[^}]*)*})\s*}/g;

const tools = [];
let match;

while ((match = toolRegex.exec(indexContent)) !== null) {
  const [, name, description, schemaStr] = match;
  
  try {
    // Parse the schema (simplified - may need more robust parsing)
    const schema = eval(`(${schemaStr})`);
    
    tools.push({
      name,
      description,
      schema,
      integration: name.split('_')[0] // github, vercel, neon, etc.
    });
  } catch (e) {
    console.warn(`⚠️  Failed to parse schema for ${name}: ${e.message}`);
  }
}

console.log(`✅ Extracted ${tools.length} tools from index.ts\n`);

// Group tools by integration
const byIntegration = {};
tools.forEach(tool => {
  const integration = tool.integration;
  if (!byIntegration[integration]) {
    byIntegration[integration] = [];
  }
  byIntegration[integration].push(tool);
});

console.log('📊 Tools by integration:');
Object.keys(byIntegration).sort().forEach(integration => {
  console.log(`  ${integration}: ${byIntegration[integration].length} tools`);
});

console.log('\n🔨 Generating handler code...\n');

// Generate handler for each integration
Object.keys(byIntegration).forEach(integration => {
  const integrationTools = byIntegration[integration];
  const handlerFile = path.join(API_REPO, 'api', 'handlers', `${integration}.js`);
  
  // Create handlers directory if it doesn't exist
  const handlersDir = path.join(API_REPO, 'api', 'handlers');
  if (!fs.existsSync(handlersDir)) {
    fs.mkdirSync(handlersDir, { recursive: true });
  }
  
  // Generate handler code
  const handlerCode = generateHandlerCode(integration, integrationTools);
  
  fs.writeFileSync(handlerFile, handlerCode);
  console.log(`✅ Generated ${handlerFile} (${integrationTools.length} tools)`);
});

console.log('\n✅ Tool extraction complete!\n');

/**
 * Generate handler code for an integration
 */
function generateHandlerCode(integration, tools) {
  const envVarMap = {
    github: 'GITHUB_TOKEN',
    vercel: 'VERCEL_TOKEN',
    neon: 'NEON_API_KEY',
    upstash: 'UPSTASH_API_KEY',
    gmail: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    drive: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    calendar: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    sheets: 'GOOGLE_SERVICE_ACCOUNT_KEY',
    openai: 'OPENAI_API_KEY',
    stripe: 'STRIPE_SECRET_KEY',
    supabase: 'SUPABASE_KEY',
    playwright: null, // No auth needed
    twilio: 'TWILIO_AUTH_TOKEN',
    resend: 'RESEND_API_KEY',
    cloudflare: 'CLOUDFLARE_API_TOKEN',
    postgres: 'POSTGRES_CONNECTION_STRING',
    neo4j: 'NEO4J_URI',
    qdrant: 'QDRANT_URL',
    n8n: 'N8N_API_KEY',
    context7: 'CONTEXT7_API_KEY'
  };
  
  const envVar = envVarMap[integration];
  
  let code = `/**
 * ${integration.toUpperCase()} API Handlers
 * Auto-generated from Robinson's Toolkit MCP
 * ${tools.length} tools
 */

const MAX_RESPONSE_SIZE = 100 * 1024; // 100KB limit for Custom GPT

function checkResponseSize(data, maxSize = MAX_RESPONSE_SIZE) {
  const jsonStr = JSON.stringify(data);
  if (jsonStr.length > maxSize) {
    throw new Error(\`Response too large: \${(jsonStr.length / 1024).toFixed(2)}KB (max: \${(maxSize / 1024).toFixed(2)}KB)\`);
  }
  return data;
}

`;

  // Add auth helper if needed
  if (envVar) {
    code += `function getAuthHeaders() {
  const token = process.env.${envVar};
  if (!token) {
    throw new Error('${envVar} not configured');
  }
  
  return {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  };
}

`;
  }

  // Generate handler function for each tool
  code += `async function handle${capitalize(integration)}Tool(tool, args) {
  switch (tool) {
`;

  tools.forEach(toolDef => {
    code += `    case '${toolDef.name}':\n`;
    code += `      return await ${toolDef.name.replace(new RegExp(`^${integration}_`), '')}(args);\n\n`;
  });

  code += `    default:
      throw new Error(\`Unknown ${integration} tool: \${tool}\`);
  }
}

`;

  // Generate individual tool functions (stubs for now - will be filled in next phase)
  tools.forEach(toolDef => {
    const funcName = toolDef.name.replace(new RegExp(`^${integration}_`), '');
    const required = toolDef.schema.required || [];
    
    code += `/**
 * ${toolDef.description}
 */
async function ${funcName}(args) {
  // TODO: Implement ${toolDef.name}
  // Required params: ${required.join(', ') || 'none'}
  throw new Error('${toolDef.name} not yet implemented');
}

`;
  });

  code += `module.exports = { handle${capitalize(integration)}Tool };\n`;
  
  return code;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

