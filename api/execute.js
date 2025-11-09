// api/execute.js
const { executeToolInternal } = require('../lib/toolkit');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { tool, args } = body;
    
    if (!tool) {
      return res.status(400).json({ error: 'Missing `tool` parameter' });
    }

    const result = await executeToolInternal(tool, args || {});
    return res.status(200).json({ ok: true, result });
    
  } catch (err) {
    console.error('Error executing tool:', err);
    return res.status(500).json({ 
      ok: false, 
      error: err.message || String(err) 
    });
  }
};
