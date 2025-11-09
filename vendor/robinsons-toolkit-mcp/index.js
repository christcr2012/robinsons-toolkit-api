// CommonJS-only, zero build.
// A tiny runtime facade so /api/execute can call your tools without any MCP deps.

const tools = Object.create(null);

// Register a tool by name → async function(args) => result
function register(name, fn) {
  if (typeof fn !== "function") throw new Error(`Tool ${name} must be a function`);
  tools[name] = fn;
}

async function executeToolInternal(name, args = {}) {
  const fn = tools[name];
  if (!fn) throw new Error(`Unknown tool: ${name}`);
  return await fn(args);
}

// Load your tool handlers here (pure functions, no MCP imports).
function loadDefaultTools() {
  // Built-in ping for smoke tests
  register("ping", async (args) => ({
    ok: true,
    echo: args || {},
    now: new Date().toISOString(),
  }));

  // GitHub tools
  register("github_list_repos", require("./tools/github-list-repos"));
  register("github_create_issue", require("./tools/github-create-issue"));

  // Vercel tools
  register("vercel_list_projects", require("./tools/vercel-list-projects"));

  // Neon tools
  register("neon_list_projects", require("./tools/neon-list-projects"));

  // OpenAI tools
  register("openai_list_models", require("./tools/openai-list-models"));
}

let loaded = false;

class UnifiedToolkit {
  constructor() {
    if (!loaded) {
      loadDefaultTools();
      loaded = true;
    }
  }
  async executeToolInternal(name, args) {
    return executeToolInternal(name, args);
  }
  async execute(name, args) {
    return executeToolInternal(name, args);
  }
  // Add method to list tools for the vendored runtime
  listTools() {
    return Object.keys(tools);
  }
  // Add registry-like structure for compatibility
  get registry() {
    return {
      toolsByCategory: new Map([
        ['vendored', new Map(Object.keys(tools).map(name => [name, { name }]))]
      ]),
      categories: new Map([
        ['vendored', {
          name: 'vendored',
          displayName: 'Vendored Runtime (Fallback)',
          description: 'Limited set of 6 tools from vendored runtime',
          toolCount: Object.keys(tools).length,
          enabled: true
        }]
      ])
    };
  }
}

module.exports = { UnifiedToolkit, register, executeToolInternal };
