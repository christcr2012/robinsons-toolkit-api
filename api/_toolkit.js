// Loads the real toolkit if available, otherwise falls back to vendored runtime.
// Works with CJS or ESM packages and keeps zero-build.

const path = require('path');
let cached;

function tryRequire(id) {
  try { 
    const mod = require(id);
    return { mod, type: 'cjs' }; 
  } catch (e) { 
    return null; 
  }
}

async function tryImport(id) {
  try { 
    const mod = await import(id);
    return { mod, type: 'esm' }; 
  } catch (e) { 
    return null; 
  }
}

function unwrap(m) {
  return m.UnifiedToolkit || (m.default && m.default.UnifiedToolkit) || m;
}

async function getToolkitCtor() {
  // 1) Prefer installed package
  const cjs = tryRequire('@robinson_ai_systems/robinsons-toolkit-mcp');
  if (cjs) return unwrap(cjs.mod);

  const esm = await tryImport('@robinson_ai_systems/robinsons-toolkit-mcp').catch(() => null);
  if (esm) return unwrap(esm.mod);

  // 2) Fallback to vendored runtime (absolute path from project root)
  const vendoredPath = path.join(__dirname, '..', 'vendor', 'robinsons-toolkit-mcp');
  const vendored = tryRequire(vendoredPath);
  if (vendored) return unwrap(vendored.mod);

  throw new Error('Cannot load toolkit: neither npm package nor vendored runtime found.');
}

module.exports.getToolkitInstance = async function getToolkitInstance() {
  if (cached) return cached;
  const CtorOrObj = await getToolkitCtor();
  cached = (typeof CtorOrObj === 'function') ? new CtorOrObj() : CtorOrObj;
  return cached;
};
