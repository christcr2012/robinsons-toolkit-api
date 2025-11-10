const { getToolkitInstance } = require('./_toolkit');
const { resolveToolName, mapParameters } = require('./_tool_aliases');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });

    const url = new URL(req.url, `http://${req.headers.host}`);
    const fresh = url.searchParams.get('fresh') === '1';
    const prefer = url.searchParams.get('prefer') || undefined;

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { tool, args, ...rest } = body;
    if (!tool) return res.status(400).json({ error: 'Missing `tool`' });

    const tk = await getToolkitInstance({ fresh, prefer });
    const exec = tk.executeToolInternal || tk.execute || tk.run;
    if (!exec) return res.status(500).json({ error: 'Toolkit has no execute method' });

    // Support both formats: { tool, args: {...} } and { tool, param1, param2, ... }
    let toolArgs = (args && typeof args === 'object' && Object.keys(rest).length === 0) ? args : rest;
    
    // Resolve alias and map parameters
    const resolvedTool = resolveToolName(tool);
    toolArgs = mapParameters(tool, toolArgs);
    
    console.log(`[execute] Original tool: ${tool}, Resolved: ${resolvedTool}`);

    const result = await exec.call(tk, resolvedTool, toolArgs);
    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: (err && err.message) || String(err) });
  }
};
