// api/execute.js
// Auth via x-api-key (set API_KEY in Vercel → Project → Environment Variables)

// Import the UnifiedToolkit from the local build
import { UnifiedToolkit } from '../dist/index.js';

let toolkitInstance = null;

async function getToolkitInstance() {
  if (toolkitInstance) return toolkitInstance;
  
  try {
    toolkitInstance = new UnifiedToolkit();
    return toolkitInstance;
  } catch (err) {
    console.error('Failed to load toolkit:', err);
    throw new Error('Toolkit initialization failed: ' + (err && err.message));
  }
}

export default async (req, res) => {
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

    const toolkit = await getToolkitInstance();
    
    // Call executeToolInternal method
    const result = await toolkit.executeToolInternal(tool, args || {});
    
    return res.status(200).json({ ok: true, result });
    
  } catch (err) {
    console.error('Error executing tool:', err);
    return res.status(500).json({ 
      ok: false, 
      error: err.message || String(err) 
    });
  }
};
