// Loads npm ESM toolkit if available; else falls back to vendored CJS runtime.
// Zero-build; safe on Vercel Node serverless.

let cached = null;

async function loadFromNpm() {
  try {
    const mod = await import('@robinson_ai_systems/robinsons-toolkit-mcp'); // ESM
    const exp = mod.UnifiedToolkit || mod.default?.UnifiedToolkit || mod.default || mod;
    return typeof exp === 'function' ? new exp() : exp;
  } catch (e) {
    console.log('[toolkit] npm import failed:', e?.message);
    return null;
  }
}

function loadFromVendor() {
  try {
    const mod = require('../vendor/robinsons-toolkit-mcp'); // CJS
    const exp = mod.UnifiedToolkit || mod.default?.UnifiedToolkit || mod.default || mod;
    return typeof exp === 'function' ? new exp() : exp;
  } catch (e) {
    console.log('[toolkit] vendor require failed:', e?.message);
    return null;
  }
}

module.exports.getToolkitInstance = async function getToolkitInstance(opts = {}) {
  if (!opts.fresh && cached) return cached;

  const prefer = opts.prefer || process.env.TOOLKIT_SOURCE || 'npm'; // 'npm' | 'vendor'
  let inst = null;

  if (prefer === 'npm') inst = await loadFromNpm();
  if (!inst) inst = loadFromVendor();
  if (!inst && prefer === 'vendor') inst = await loadFromNpm();

  if (!inst) throw new Error('Cannot load toolkit from npm or vendor');

  if (!opts.fresh) cached = inst;
  return inst;
};

module.exports._resetToolkitCache = () => { cached = null; };
module.exports._loaderStatus = () => ({ cached: !!cached });
