const { getToolkitInstance } = require('../_toolkit');
const { getAllAliases, getToolMetadata, searchByIntent } = require('../_tool_aliases');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
    
    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    
    const url = new URL(req.url, `http://${req.headers.host}`);
    const fresh = url.searchParams.get('fresh') === '1';
    const prefer = url.searchParams.get('prefer') || undefined;
    const { q = '', category = '', offset = '0', limit = '100', intent = '' } = req.query || {};
    
    const tk = await getToolkitInstance({ fresh, prefer });
    
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

    // Add aliases as searchable tools WITH METADATA
    const aliases = getAllAliases();
    for (const [alias, actualTool] of Object.entries(aliases)) {
      // Find the category of the actual tool
      const actualToolEntry = allTools.find(t => t.name === actualTool);
      if (actualToolEntry) {
        const metadata = getToolMetadata(alias);
        allTools.push({
          name: alias,
          category: actualToolEntry.category,
          isAlias: true,
          actualTool: actualTool,
          // Include metadata for intent-based search
          ...(metadata && {
            tags: metadata.tags,
            intent: metadata.intent,
            description: metadata.description
          })
        });
      }
    }

    // Filter by intent if specified (semantic search)
    let filtered = allTools;
    if (intent) {
      const intentMatches = searchByIntent(intent);
      const intentNames = new Set(intentMatches.map(m => m.name));
      filtered = filtered.filter(t => intentNames.has(t.name));
    }

    // Filter by search query (keyword search)
    if (q) {
      const needle = String(q).toLowerCase();
      filtered = filtered.filter((t) => {
        // Search in name, category, tags, intent, description
        const searchFields = [
          t.name,
          t.category,
          ...(t.tags || []),
          t.intent || '',
          t.description || ''
        ].map(f => String(f).toLowerCase());
        
        return searchFields.some(field => field.includes(needle));
      });
    }

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
