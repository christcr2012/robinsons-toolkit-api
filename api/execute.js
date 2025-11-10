const { getToolkitInstance } = require('./_toolkit');

module.exports = async (req, res) => {
  let tool, finalArgs;
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    
    const url = new URL(req.url, `http://${req.headers.host}`);
    const fresh = url.searchParams.get('fresh') === '1';
    const prefer = url.searchParams.get('prefer') || undefined;
    
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { tool: toolName, args, ...rest } = body;
    tool = toolName;
    
    // DIAGNOSTIC: Log what Custom GPT is sending
    console.log('[execute] Raw payload:', JSON.stringify({ tool, args, rest }, null, 2));
    
    if (!tool) return res.status(400).json({ error: 'Missing `tool`' });
    
    const tk = await getToolkitInstance({ fresh, prefer });
    const exec = tk.executeToolInternal || tk.execute || tk.run;
    if (!exec) return res.status(500).json({ error: 'Toolkit has no execute method' });
    
    // UNIVERSAL SOLUTION: Accept both formats for ALL tools
    // Format 1: { tool: "name", args: { param1, param2 } } → use args
    // Format 2: { tool: "name", param1, param2 } → use rest as args
    finalArgs = args ?? rest;
    
    console.log('[execute] Calling tool:', tool);
    console.log('[execute] With args:', JSON.stringify(finalArgs, null, 2));
    
    // Call toolkit directly - no alias resolution needed
    const result = await exec.call(tk, tool, finalArgs);
    
    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error('[execute] Error:', err);
    res.status(500).json({ 
      ok: false, 
      error: (err && err.message) || String(err),
      tool: tool,
      args: finalArgs
    });
  }
};
