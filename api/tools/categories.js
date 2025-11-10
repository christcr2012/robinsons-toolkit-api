const { getToolkitInstance } = require('../_toolkit');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });

    const url = new URL(req.url, `http://${req.headers.host}`);
    const fresh = url.searchParams.get('fresh') === '1';
    const prefer = url.searchParams.get('prefer') || undefined;

    const tk = await getToolkitInstance({ fresh, prefer });

    // Extract categories from the registry
    const categories = [];
    if (tk.registry && tk.registry.categories) {
      const categoriesMap = tk.registry.categories;
      if (categoriesMap instanceof Map) {
        for (const [name, meta] of categoriesMap.entries()) {
          categories.push({
            name: meta.name || name,
            displayName: meta.displayName || name,
            description: meta.description || '',
            toolCount: meta.toolCount || 0,
            enabled: meta.enabled !== false,
            subcategories: meta.subcategories || []
          });
        }
      }
    }

    res.status(200).json({ 
      ok: true, 
      total: categories.length,
      categories 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: (err && err.message) || String(err) });
  }
};
