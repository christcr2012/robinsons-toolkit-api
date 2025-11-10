// Loads the real toolkit if available, otherwise falls back to vendored runtime.
// Works with CJS or ESM packages and keeps zero-build.

const path = require('path');
let cached;
let loadError = null;

function tryRequire(id) {
  try { 
    const mod = require(id);
    console.log(`[_toolkit] ✓ Successfully required: ${id}`);
    return { mod, type: 'cjs' }; 
  } catch (e) { 
    console.log(`[_toolkit] ✗ Failed to require ${id}:`, e.message);
    loadError = e;
    return null; 
  }
}

async function tryImport(id) {
  try { 
    const mod = await import(id);
    console.log(`[_toolkit] ✓ Successfully imported: ${id}`);
    return { mod, type: 'esm' }; 
  } catch (e) { 
    console.log(`[_toolkit] ✗ Failed to import ${id}:`, e.message);
    loadError = e;
    return null; 
  }
}

function unwrap(m) {
  return m.UnifiedToolkit || (m.default && m.default.UnifiedToolkit) || m;
}

async function getToolkitCtor() {
  console.log('[_toolkit] Attempting to load toolkit...');
  
  // 1) Prefer installed package
  const cjs = tryRequire('@robinson_ai_systems/robinsons-toolkit-mcp');
  if (cjs) return unwrap(cjs.mod);

  const esm = await tryImport('@robinson_ai_systems/robinsons-toolkit-mcp').catch(() => null);
  if (esm) return unwrap(esm.mod);

  // 2) Fallback to vendored runtime (absolute path from project root)
  console.log('[_toolkit] Trying vendored runtime fallback...');
  const vendoredPath = path.join(__dirname, '..', 'vendor', 'robinsons-toolkit-mcp');
  const vendored = tryRequire(vendoredPath);
  if (vendored) {
    console.log('[_toolkit] ⚠ Using vendored runtime (6 tools only)');
    console.log('[_toolkit] Last npm package error:', loadError ? loadError.message : 'none');
    return unwrap(vendored.mod);
  }

  throw new Error('Cannot load toolkit: neither npm package nor vendored runtime found.');
}

module.exports.getToolkitInstance = async function getToolkitInstance() {
  if (cached) {
    console.log('[_toolkit] Returning cached instance');
    return cached;
  }
  const CtorOrObj = await getToolkitCtor();
  cached = (typeof CtorOrObj === 'function') ? new CtorOrObj() : CtorOrObj;
  console.log('[_toolkit] Toolkit loaded successfully');
  return cached;
};
