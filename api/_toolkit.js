// Loads the real toolkit if available, otherwise falls back to vendored runtime.
// Works with CJS or ESM packages and keeps zero-build.

const path = require('path');
let cached;

async function tryImport(id) {
  try { 
    const mod = await import(id);
    return { mod, type: 'esm' }; 
  } catch (e) { 
    return null; 
  }
}

function tryRequire(id) {
  try { 
    const mod = require(id);
    return { mod, type: 'cjs' }; 
  } catch (e) { 
    // If it's an ERR_REQUIRE_ESM error, we need to use import() instead
    if (e.code === 'ERR_REQUIRE_ESM') {
      return { needsImport: true };
    }
    return null; 
  }
}

function unwrap(m) {
  return m.UnifiedToolkit || (m.default && m.default.UnifiedToolkit) || m;
}

async function getToolkitCtor() {
  // 1) Try to require the npm package (CJS)
  const cjsAttempt = tryRequire('@robinson_ai_systems/robinsons-toolkit-mcp');
  
  // If it needs import (ES module), use dynamic import
  if (cjsAttempt && cjsAttempt.needsImport) {
    const esm = await tryImport('@robinson_ai_systems/robinsons-toolkit-mcp');
    if (esm) return unwrap(esm.mod);
  }
  
  // If CJS worked, use it
  if (cjsAttempt && cjsAttempt.mod) {
    return unwrap(cjsAttempt.mod);
  }
  
  // 2) Try direct import (for ES modules)
  const esm = await tryImport('@robinson_ai_systems/robinsons-toolkit-mcp');
  if (esm) return unwrap(esm.mod);

  // 3) Fallback to vendored runtime (absolute path from project root)
  const vendoredPath = path.join(__dirname, '..', 'vendor', 'robinsons-toolkit-mcp');
  const vendored = tryRequire(vendoredPath);
  if (vendored && vendored.mod) {
    return unwrap(vendored.mod);
  }

  throw new Error('Cannot load toolkit: neither npm package nor vendored runtime found.');
}

module.exports.getToolkitInstance = async function getToolkitInstance() {
  if (cached) return cached;
  const CtorOrObj = await getToolkitCtor();
  cached = (typeof CtorOrObj === 'function') ? new CtorOrObj() : CtorOrObj;
  return cached;
};
