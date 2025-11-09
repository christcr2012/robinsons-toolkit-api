// Loads the real toolkit if available, otherwise falls back to vendored runtime.
// Works with CJS or ESM packages and keeps zero-build.

let cached;

function tryRequire(id) {
  try { return { mod: require(id), type: 'cjs' }; } catch { return null; }
}
async function tryImport(id) {
  try { return { mod: await import(id), type: 'esm' }; } catch { return null; }
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

  // 2) Fallback to vendored runtime
  const vendored = tryRequire('../vendor/robinsons-toolkit-mcp');
  if (vendored) return unwrap(vendored.mod);

  throw new Error('Cannot load toolkit: neither npm package nor vendored runtime found.');
}

module.exports.getToolkitInstance = async function getToolkitInstance() {
  if (cached) return cached;
  const CtorOrObj = await getToolkitCtor();
  cached = (typeof CtorOrObj === 'function') ? new CtorOrObj() : CtorOrObj;
  return cached;
};
