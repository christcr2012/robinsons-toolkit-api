// Shared wrapper for tool endpoints (CommonJS). Zero build.
// Uses the full Robinson's Toolkit MCP (1857+ tools)
const { UnifiedToolkit } = require('@robinson_ai_systems/robinsons-toolkit-mcp');
let instance;

function getExec() {
  if (!instance) instance = new UnifiedToolkit();
  const exec = instance.executeToolInternal || instance.execute || instance.run;
  if (!exec) throw new Error('Toolkit has no execute method');
  return { exec, ctx: instance };
}

function makeToolHandler(toolName) {
  return async (req, res) => {
    try {
      if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
      const key = req.headers['x-api-key'];
      if (process.env.API_KEY && key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { exec, ctx } = getExec();
      const result = await exec.call(ctx, toolName, body);
      return res.status(200).json({ ok: true, result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ ok: false, error: (err && err.message) || String(err) });
    }
  };
}

module.exports = { makeToolHandler };
