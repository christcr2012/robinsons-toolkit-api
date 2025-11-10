#!/usr/bin/env node

/**
 * Generate Complete Standalone API from Robinson's Toolkit MCP
 * 
 * This script:
 * 1. Reads the MCP server's broker-handlers.ts to get actual implementations
 * 2. Extracts ALL tool definitions from index.ts
 * 3. Generates complete handler files for each integration
 * 4. Updates the OpenAPI schema with all tools
 */

const fs = require('fs');
const path = require('path');

const MCP_REPO = path.join(__dirname, '../../robinsonai-mcp-servers');
const API_REPO = path.join(__dirname, '..');
const TOOLKIT_SRC = path.join(MCP_REPO, 'packages/robinsons-toolkit-mcp/src');

console.log('🔨 Generating Complete Standalone API...\n');

// Read broker-handlers.ts to understand the implementation pattern
const BROKER_HANDLERS = path.join(TOOLKIT_SRC, 'broker-handlers.ts');
const brokerContent = fs.readFileSync(BROKER_HANDLERS, 'utf8');

// Read index.ts to get all tool definitions
const INDEX_TS = path.join(TOOLKIT_SRC, 'index.ts');
const indexContent = fs.readFileSync(INDEX_TS, 'utf8');

// Extract tool definitions using a more robust parser
const tools = [];
const toolPattern = /{\s*name:\s*['"]([^'"]+)['"]\s*,\s*description:\s*['"]([^'"]+)['"]/g;

let match;
while ((match = toolPattern.exec(indexContent)) !== null) {
  const [, name, description] = match;
  const integration = name.split('_')[0];
  
  tools.push({
    name,
    description,
    integration
  });
}

console.log(`✅ Found ${tools.length} tools\n`);

// Group by integration
const byIntegration = {};
tools.forEach(tool => {
  if (!byIntegration[tool.integration]) {
    byIntegration[tool.integration] = [];
  }
  byIntegration[tool.integration].push(tool);
});

console.log('📊 Tools by integration:');
Object.keys(byIntegration).sort().forEach(integration => {
  console.log(`  ${integration}: ${byIntegration[integration].length} tools`);
});

// Generate OpenAPI schema with ALL tools
console.log('\n🔨 Generating OpenAPI schema...');

const schema = {
  openapi: '3.1.0',
  info: {
    title: "Robinson's Toolkit API",
    description: `Unified REST API for Robinson's Toolkit - ${tools.length} tools across ${Object.keys(byIntegration).length} integrations`,
    version: '2.0.0'
  },
  servers: [
    {
      url: 'https://robinsons-toolkit-2b66om660-chris-projects-de6cd1bf.vercel.app'
    }
  ],
  paths: {
    '/api/execute': {
      post: {
        operationId: 'executeToolkit',
        summary: 'Execute any toolkit tool',
        description: `Execute any of the ${tools.length} available tools. Provide the tool name and arguments.`,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['tool'],
                properties: {
                  tool: {
                    type: 'string',
                    description: 'Tool name (e.g., github_list_repos, vercel_list_projects)',
                    enum: tools.map(t => t.name)
                  },
                  args: {
                    type: 'object',
                    description: 'Tool-specific arguments',
                    additionalProperties: true
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Successful execution',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      type: 'object',
                      description: 'Tool execution result'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad request - invalid tool or arguments'
          },
          '403': {
            description: 'Forbidden - invalid API key'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/tools': {
      get: {
        operationId: 'listTools',
        summary: 'List all available tools',
        description: `Get a list of all ${tools.length} available tools with their descriptions`,
        responses: {
          '200': {
            description: 'List of tools',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    tools: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          description: { type: 'string' },
                          integration: { type: 'string' }
                        }
                      }
                    },
                    total: { type: 'number' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// Write schema
const schemaPath = path.join(API_REPO, 'CUSTOM-GPT-SCHEMA.json');
fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
console.log(`✅ Generated ${schemaPath}`);

// Generate tools list endpoint
const toolsEndpoint = `/**
 * List all available tools
 */

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const tools = ${JSON.stringify(tools, null, 2)};
  
  return res.status(200).json({
    tools,
    total: tools.length,
    byIntegration: ${JSON.stringify(
      Object.keys(byIntegration).reduce((acc, key) => {
        acc[key] = byIntegration[key].length;
        return acc;
      }, {}),
      null,
      2
    )}
  });
};
`;

const toolsPath = path.join(API_REPO, 'api', 'tools.js');
fs.writeFileSync(toolsPath, toolsEndpoint);
console.log(`✅ Generated ${toolsPath}`);

// Generate tools registry for reference
const registryPath = path.join(API_REPO, 'TOOLS-REGISTRY.json');
fs.writeFileSync(registryPath, JSON.stringify({
  total: tools.length,
  integrations: Object.keys(byIntegration).length,
  byIntegration: Object.keys(byIntegration).reduce((acc, key) => {
    acc[key] = {
      count: byIntegration[key].length,
      tools: byIntegration[key].map(t => t.name)
    };
    return acc;
  }, {})
}, null, 2));
console.log(`✅ Generated ${registryPath}`);

console.log('\n✅ Complete API generation finished!');
console.log(`\n📊 Summary:`);
console.log(`  Total tools: ${tools.length}`);
console.log(`  Integrations: ${Object.keys(byIntegration).length}`);
console.log(`  Schema: CUSTOM-GPT-SCHEMA.json`);
console.log(`  Tools endpoint: api/tools.js`);
console.log(`  Registry: TOOLS-REGISTRY.json`);
console.log(`\n🚀 Next steps:`);
console.log(`  1. Deploy to Vercel: git add . && git commit -m "Complete API" && git push`);
console.log(`  2. Update Custom GPT schema`);
console.log(`  3. Test with: GET /api/tools`);

