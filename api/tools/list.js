const { getToolkitInstance } = require('../_toolkit');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });

    const { q = '', category = '', offset = '0', limit = '100' } = req.query || {};
    const tk = await getToolkitInstance();

    // Extract all tool names from the registry
    const allTools = [];
    if (tk.registry && tk.registry.toolsByCategory) {
      const toolsByCategory = tk.registry.toolsByCategory;
      const categories = Array.from(toolsByCategory.keys());
      
      for (const cat of categories) {
        // Filter by category if specified
        if (category && cat !== category) continue;
        
        const toolsMap = toolsByCategory.get(cat);
        if (toolsMap && toolsMap instanceof Map) {
          const toolNames = Array.from(toolsMap.keys());
          allTools.push(...toolNames.map(name => ({ name, category: cat })));
        }
      }
    }

    // Filter by search query
    const needle = String(q).toLowerCase();
    let filtered = allTools.filter((t) => 
      t.name.toLowerCase().includes(needle) || 
      t.category.toLowerCase().includes(needle)
    );

    // Pagination
    const start = Math.max(0, parseInt(offset, 10) || 0);
    const end = start + Math.max(1, Math.min(500, parseInt(limit, 10) || 100));
    const slice = filtered.slice(start, end);

    res.status(200).json({ 
      ok: true, 
      total: filtered.length, 
      offset: start, 
      limit: end - start, 
      tools: slice 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: (err && err.message) || String(err) });
  }
};
