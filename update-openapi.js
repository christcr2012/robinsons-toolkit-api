// Script to update openapi.json with discovery endpoints
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'openapi.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Add /api/tools/list endpoint
schema.paths['/api/tools/list'] = {
  get: {
    operationId: 'tools_list',
    summary: 'List/search tool names across all 1,713 tools',
    description: 'Discover available tools by searching or filtering by category. Use this before calling execute to find the right tool.',
    security: [{ api_key: [] }],
    parameters: [
      { name: 'q', in: 'query', required: false, schema: { type: 'string' }, description: 'Search query to filter tools by name or category' },
      { name: 'category', in: 'query', required: false, schema: { type: 'string', enum: ['github', 'vercel', 'neon', 'upstash', 'google', 'openai', 'stripe', 'supabase', 'playwright', 'twilio', 'resend', 'context7', 'cloudflare', 'postgres', 'neo4j', 'qdrant', 'n8n'] }, description: 'Filter tools by category' },
      { name: 'offset', in: 'query', required: false, schema: { type: 'integer', minimum: 0, default: 0 }, description: 'Pagination offset' },
      { name: 'limit', in: 'query', required: false, schema: { type: 'integer', minimum: 1, maximum: 500, default: 100 }, description: 'Maximum number of results' },
      { name: 'fresh', in: 'query', required: false, schema: { type: 'string', enum: ['0', '1'] }, description: 'Force fresh toolkit load (bypass cache)' },
      { name: 'prefer', in: 'query', required: false, schema: { type: 'string', enum: ['npm', 'vendor'] }, description: 'Prefer npm package or vendor fallback' }
    ],
    responses: { '200': { description: 'List of tools', content: { 'application/json': { schema: { type: 'object', properties: { ok: { type: 'boolean' }, total: { type: 'integer', description: 'Total number of matching tools' }, offset: { type: 'integer' }, limit: { type: 'integer' }, tools: { type: 'array', items: { type: 'object', properties: { name: { type: 'string', description: 'Tool name (use this in execute)' }, category: { type: 'string', description: 'Category this tool belongs to' } } } } } } } } } }
  }
};

// Add /api/tools/categories endpoint
schema.paths['/api/tools/categories'] = {
  get: {
    operationId: 'tools_categories',
    summary: 'List all 17 categories with tool counts',
    description: 'Get overview of all available categories and how many tools each contains',
    security: [{ api_key: [] }],
    parameters: [
      { name: 'fresh', in: 'query', required: false, schema: { type: 'string', enum: ['0', '1'] }, description: 'Force fresh toolkit load (bypass cache)' },
      { name: 'prefer', in: 'query', required: false, schema: { type: 'string', enum: ['npm', 'vendor'] }, description: 'Prefer npm package or vendor fallback' }
    ],
    responses: { '200': { description: 'List of categories', content: { 'application/json': { schema: { type: 'object', properties: { ok: { type: 'boolean' }, total: { type: 'integer' }, categories: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, displayName: { type: 'string' }, description: { type: 'string' }, toolCount: { type: 'integer' }, enabled: { type: 'boolean' }, subcategories: { type: 'array', items: { type: 'string' } } } } } } } } } } }
  }
};

// Add /api/debug-loader endpoint
schema.paths['/api/debug-loader'] = {
  get: {
    operationId: 'debug_loader',
    summary: 'Show loader status (npm vs vendor, cache)',
    description: 'Debug endpoint to verify which toolkit source is loaded and cache status',
    parameters: [
      { name: 'fresh', in: 'query', required: false, schema: { type: 'string', enum: ['0', '1'] }, description: 'Force fresh toolkit load' },
      { name: 'prefer', in: 'query', required: false, schema: { type: 'string', enum: ['npm', 'vendor'] }, description: 'Prefer npm or vendor' }
    ],
    responses: { '200': { description: 'Loader status', content: { 'application/json': { schema: { type: 'object', properties: { ok: { type: 'boolean' }, prefer: { type: 'string' }, cached: { type: 'boolean' }, categories: { type: 'integer' }, totalTools: { type: 'integer' }, sampleCount: { type: 'integer' }, sample: { type: 'array', items: { type: 'object' } } } } } } } }
  }
};

// Update info
schema.info.description = "Serverless API wrapper for Custom GPT to access Robinson's Toolkit with 1,713 tools across 17 categories (GitHub, Vercel, Neon, Upstash, Google Workspace, OpenAI, Stripe, Supabase, Playwright, Twilio, Resend, Context7, Cloudflare, Postgres, Neo4j, Qdrant, n8n). Use /api/tools/list to discover tools, then /api/execute to run them.";
schema.info.version = '1.0.0';

// Write updated schema
fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2), 'utf8');
console.log('✅ Updated openapi.json with discovery endpoints');
console.log('   - Added /api/tools/list');
console.log('   - Added /api/tools/categories');
console.log('   - Added /api/debug-loader');
console.log('   - Updated version to 1.0.0');
