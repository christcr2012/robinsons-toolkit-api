// api/execute.js
// Auth via x-api-key (set API_KEY in Vercel → Project → Environment Variables)

let UnifiedToolkitRef = null;

function loadToolkitSync() {
  try {
    const mod = require('@robinson_ai_systems/robinsons-toolkit-mcp');
    return mod.UnifiedToolkit || (mod.default && mod.default.UnifiedToolkit) || mod;
  } catch (err) {
    console.error('Failed to load toolkit (sync):', err.message);
    return null;
  }
}

async function loadToolkitAsync() {
  try {
    const mod = await import('@robinson_ai_systems/robinsons-toolkit-mcp');
    return mod.UnifiedToolkit || (mod.default && mod.default.UnifiedToolkit) || mod;
  } catch (err) {
    throw new Error('Toolkit import failed: ' + (err && err.message));
  }
}

async function getUnifiedToolkit() {
  if (UnifiedToolkitRef) return UnifiedToolkitRef;
  UnifiedToolkitRef = loadToolkitSync();
  if (!UnifiedToolkitRef) UnifiedToolkitRef = await loadToolkitAsync();
  return UnifiedToolkitRef;
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { tool, args } = body;
    if (!tool) return res.status(400).json({ error: 'Missing `tool`' });

    const UnifiedToolkit = await getUnifiedToolkit();
    // If UnifiedToolkit is a class, instantiate; if it's a module with functions, use as-is
    const instance = (typeof UnifiedToolkit === 'function') ? new UnifiedToolkit() : UnifiedToolkit;

    // Prefer executeToolInternal(tool, args), else fallback to execute(tool, args)
    const exec = instance.executeToolInternal || instance.execute || instance.run;
    if (!exec) return res.status(500).json({ error: 'Toolkit has no execute method' });

    const result = await exec.call(instance, tool, args || {});
    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: (err && err.message) || String(err) });
  }
};
