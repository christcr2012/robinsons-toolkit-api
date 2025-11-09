// api/execute.js
// Robinson's Toolkit API - Execute endpoint
// Uses the full Robinson's Toolkit MCP (1857+ tools)

let UnifiedToolkitRef = null;

function loadToolkitSync() {
  try {
    // Use the published npm package with 1857+ tools
    const mod = require("@robinson_ai_systems/robinsons-toolkit-mcp");
    return mod.UnifiedToolkit || (mod.default && mod.default.UnifiedToolkit) || mod;
  } catch (e) {
    // Fallback to vendored runtime (6 tools only)
    try {
      const mod = require("../vendor/robinsons-toolkit-mcp");
      return mod.UnifiedToolkit || (mod.default && mod.default.UnifiedToolkit) || mod;
    } catch {
      throw new Error('Failed to load Robinson\'s Toolkit: ' + (e && e.message));
    }
  }
}

async function getUnifiedToolkit() {
  if (!UnifiedToolkitRef) {
    const UnifiedToolkit = loadToolkitSync();
    UnifiedToolkitRef = (typeof UnifiedToolkit === "function")
      ? new UnifiedToolkit()
      : UnifiedToolkit;
  }
  return UnifiedToolkitRef;
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY)
      return res.status(401).json({ error: 'Unauthorized' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { tool, args } = body;
    if (!tool) return res.status(400).json({ error: 'Missing `tool`' });

    const tk = await getUnifiedToolkit();
    const exec = tk.executeToolInternal || tk.execute || tk.run;
    if (!exec) return res.status(500).json({ error: 'Toolkit has no execute method' });

    const result = await exec.call(tk, tool, args || {});
    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: (err && err.message) || String(err) });
  }
};
