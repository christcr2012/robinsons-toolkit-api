#!/usr/bin/env node

/**
 * Generate Tools Registry from MCP Server
 * Reads the main index.ts and extracts all tool definitions
 */

const fs = require('fs');
const path = require('path');

const indexFile = path.resolve(__dirname, '../../robinsonai-mcp-servers/packages/robinsons-toolkit-mcp/src/index.ts');
const outputFile = path.resolve(__dirname, '../TOOLS-REGISTRY.json');

console.log('🔍 Reading MCP index.ts:', indexFile);

if (!fs.existsSync(indexFile)) {
  console.error('❌ File not found:', indexFile);
  process.exit(1);
}

const content = fs.readFileSync(indexFile, 'utf-8');

// Extract tool definitions - they're in the format:
// { name: 'github_list_repos', description: '...', inputSchema: {...} }
const toolPattern = /{\s*name:\s*['"]([^'"]+)['"]\s*,\s*description:\s*['"]([^'"]+)['"]/g;

const tools = [];
let match;

while ((match = toolPattern.exec(content)) !== null) {
  const [, name, description] = match;
  const integration = name.split('_')[0];

  tools.push({
    name,
    description,
    integration
  });
}

console.log(`✅ Found ${tools.length} tools`);

// Group by integration
const byIntegration = {};
tools.forEach(tool => {
  if (!byIntegration[tool.integration]) {
    byIntegration[tool.integration] = [];
  }
  byIntegration[tool.integration].push(tool);
});

console.log('\n📊 Tools by integration:');
Object.keys(byIntegration).sort().forEach(integration => {
  console.log(`  ${integration}: ${byIntegration[integration].length} tools`);
});

// Write registry
const registry = {
  total: tools.length,
  integrations: Object.keys(byIntegration).length,
  byIntegration: Object.keys(byIntegration).reduce((acc, key) => {
    acc[key] = {
      count: byIntegration[key].length,
      tools: byIntegration[key].map(t => ({ name: t.name, description: t.description }))
    };
    return acc;
  }, {}),
  allTools: tools
};

fs.writeFileSync(outputFile, JSON.stringify(registry, null, 2));
console.log(`\n✅ Registry written to: ${outputFile}`);
console.log(`📊 Total: ${tools.length} tools across ${Object.keys(byIntegration).length} integrations`);

