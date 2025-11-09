// lib/toolkit.js
// CommonJS wrapper for the ES module toolkit

let toolkitPromise = null;

async function getToolkit() {
  if (!toolkitPromise) {
    toolkitPromise = import('../dist/index.js').then(mod => {
      const { UnifiedToolkit } = mod;
      return new UnifiedToolkit();
    });
  }
  return toolkitPromise;
}

async function executeToolInternal(tool, args) {
  const toolkit = await getToolkit();
  return toolkit.executeToolInternal(tool, args);
}

module.exports = { executeToolInternal };
