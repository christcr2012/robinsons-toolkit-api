// api/execute.js
// Auth via x-api-key (set API_KEY in Vercel → Project → Environment Variables)

let toolkitInstance = null;

async function getToolkitInstance() {
  if (toolkitInstance) return toolkitInstance;
  
  try {
    // Use dynamic import for ES Module
    const module = await import('@robinson_ai_systems/robinsons-toolkit-mcp');
    const UnifiedToolkit = module.UnifiedToolkit || module.default?.UnifiedToolkit || module.default;
    
    if (!UnifiedToolkit) {
      throw new Error('UnifiedToolkit not found in module exports');
    }
    
    toolkitInstance = new UnifiedToolkit();
    return toolkitInstance;
  } catch (err) {
    console.error('Failed to load toolkit:', err);
    throw new Error('Toolkit import failed: ' + (err && err.message));
  }
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { tool, args } = body;
    if (!tool) return res.status(400).json({ error: 'Missing `tool`' });

    const toolkit = await getToolkitInstance();
    
    // Call executeToolInternal method
    const result = await toolkit.executeToolInternal(tool, args || {});
    
    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: (err && err.message) || String(err) });
  }
};
