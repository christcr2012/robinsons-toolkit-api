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
}

module.exports = { UnifiedToolkit, register, executeToolInternal };
