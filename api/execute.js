// Minimal, defensive wrapper. Keep it CommonJS.
// Auth: pass x-api-key header. Set API_KEY in Vercel Project → Environment Variables.

// Lazy require so cold starts only pay for what they use
function loadToolkit() {
  try {
    // If your toolkit is published to npm:
    // const { UnifiedToolkit } = require('@robinson_ai_systems/robinsons-toolkit-mcp');

    // Placeholder implementation so this deploys before wiring the real package
    return {
      async init() {},
      async execute(tool, args) {
        // TODO: replace with: return UnifiedToolkit.executeToolInternal(tool, args)
        return { echo: { tool, args } };
      }
    };
  } catch (err) {
    // Surface import errors clearly
    throw new Error('Toolkit import failed: ' + (err && err.message));
  }
}

let toolkit; // singleton across invocations when hot

module.exports = async (req, res) => {
  try {
    // Method guard
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Simple API key check (optional but recommended for GPT Actions)
    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { tool, args } = body;
    if (!tool) return res.status(400).json({ error: 'Missing `tool`' });

    if (!toolkit) {
      toolkit = loadToolkit();
      if (toolkit.init) await toolkit.init();
    }

    // Call into your toolkit (replace with your real handler)
    const result = await toolkit.execute(tool, args || {});

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: (err && err.message) || String(err) });
  }
};
