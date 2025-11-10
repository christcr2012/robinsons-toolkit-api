const { getToolkitInstance, _loaderStatus } = require('./_toolkit');

module.exports = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const fresh = url.searchParams.get('fresh') === '1';
    const prefer = url.searchParams.get('prefer') || undefined;

    const tk = await getToolkitInstance({ fresh, prefer });
    
    // Get sample tools
    let sample = [];
    let totalTools = 0;
    let categories = 0;
    
    if (tk.registry && tk.registry.toolsByCategory) {
      categories = tk.registry.toolsByCategory.size;
      for (const [cat, tools] of tk.registry.toolsByCategory) {
        totalTools += tools.size;
        if (sample.length < 5) {
          for (const toolName of tools.keys()) {
            sample.push({ name: toolName, category: cat });
            if (sample.length >= 5) break;
          }
        }
      }
    } else if (typeof tk.listTools === 'function') {
      sample = (await tk.listTools()).slice(0, 5);
    } else if (Array.isArray(tk.tools)) {
      sample = tk.tools.slice(0, 5);
    }

    res.status(200).json({
      ok: true,
      prefer: prefer || process.env.TOOLKIT_SOURCE || 'npm',
      cached: !fresh && _loaderStatus().cached,
      categories,
      totalTools,
      sampleCount: sample.length,
      sample
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message, stack: e.stack });
  }
};
