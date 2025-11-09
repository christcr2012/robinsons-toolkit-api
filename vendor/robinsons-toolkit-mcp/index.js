// vendor/robinsons-toolkit-mcp/index.js
// Vendored wrapper for Robinson's Toolkit
// Loads the pre-compiled ES module toolkit and exposes it as CommonJS

let toolkitInstance = null;
let toolkitPromise = null;

/**
 * Get or create the UnifiedToolkit instance
 * @returns {Promise<Object>} The toolkit instance
 */
async function getToolkit() {
  if (!toolkitPromise) {
    toolkitPromise = (async () => {
      try {
        // Dynamic import of the ES module
        const mod = await import('../../dist/index.js');
        const { UnifiedToolkit } = mod;
        
        if (!UnifiedToolkit) {
          throw new Error('UnifiedToolkit not found in module exports');
        }
        
        toolkitInstance = new UnifiedToolkit();
        return toolkitInstance;
      } catch (err) {
        console.error('[Vendored Toolkit] Failed to load:', err);
        throw err;
      }
    })();
  }
  
  return toolkitPromise;
}

/**
 * Execute a tool by name with arguments
 * @param {string} tool - Tool name (e.g., 'github_list_repos')
 * @param {Object} args - Tool arguments
 * @returns {Promise<any>} Tool execution result
 */
async function executeToolInternal(tool, args = {}) {
  const toolkit = await getToolkit();
  
  if (!toolkit.executeToolInternal) {
    throw new Error('executeToolInternal method not found on UnifiedToolkit');
  }
  
  return toolkit.executeToolInternal(tool, args);
}

/**
 * List all available tools
 * @returns {Promise<Array>} List of tool names
 */
async function listTools() {
  const toolkit = await getToolkit();
  
  if (toolkit.listTools) {
    return toolkit.listTools();
  }
  
  // Fallback: return empty array if method doesn't exist
  return [];
}

module.exports = {
  executeToolInternal,
  listTools,
  getToolkit
};
