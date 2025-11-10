const { getToolkitInstance } = require('./_toolkit');

module.exports = async (req, res) => {
  let tool, finalArgs;
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    // TEMPORARILY DISABLED FOR DEBUGGING
    // const key = req.headers['x-api-key'];
    // if (process.env.API_KEY && key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    
    const url = new URL(req.url, `http://${req.headers.host}`);
    const fresh = url.searchParams.get('fresh') === '1';
    const prefer = url.searchParams.get('prefer') || undefined;
    
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { tool: toolName, args = {}, ...rest } = body;
    tool = toolName;
    
    if (!tool) return res.status(400).json({ ok: false, error: 'Missing "tool" parameter.' });
    
    // CRITICAL FIX: Merge args and top-level keys into one flat object
    // This handles both formats:
    // Format 1: { tool: "name", args: { param1, param2 } }
    // Format 2: { tool: "name", param1, param2 }
    finalArgs = { ...args, ...rest };
    
    // CRITICAL: Ensure 'args' doesn't linger as a key (prevents UnrecognizedKwargsError: args)
    delete finalArgs.args;
    
    // DIAGNOSTIC: Log what we're sending to toolkit
    console.log('[execute] Tool:', tool);
    console.log('[execute] Final args:', JSON.stringify(finalArgs, null, 2));
    console.log('[execute] Headers:', JSON.stringify(req.headers, null, 2));
    
    const tk = await getToolkitInstance({ fresh, prefer });
    const exec = tk.executeToolInternal || tk.execute || tk.run;
    if (!exec) return res.status(500).json({ error: 'Toolkit has no execute method' });
    
    // Call toolkit with flattened args
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
