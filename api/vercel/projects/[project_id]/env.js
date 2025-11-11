/**
 * Vercel Environment Variables REST API
 * GET  /api/vercel/projects/[project_id]/env - List env vars
 * POST /api/vercel/projects/[project_id]/env - Create env var
 */

const VERCEL_API_BASE = 'https://api.vercel.com';
const MAX_RESPONSE_SIZE = 100 * 1024;

function checkResponseSize(data) {
  const jsonStr = JSON.stringify(data);
  if (jsonStr.length > MAX_RESPONSE_SIZE) {
    throw new Error(`Response too large: ${(jsonStr.length / 1024).toFixed(2)}KB`);
  }
  return data;
}

function getAuthHeaders() {
  const token = process.env.VERCEL_TOKEN;
  if (!token) throw new Error('VERCEL_TOKEN not configured');
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { project_id } = query;
  
  if (!project_id) {
    return res.status(400).json({ error: 'project_id is required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `${VERCEL_API_BASE}/v9/projects/${project_id}/env`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.envs?.map(e => ({ id: e.id, key: e.key, target: e.target })) || []));
    }
    
    if (method === 'POST') {
      const { key, value, target = ['production', 'preview', 'development'] } = req.body;
      if (!key || !value) throw new Error('key and value are required');
      const url = `${VERCEL_API_BASE}/v9/projects/${project_id}/env`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ key, value, target })
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Vercel env vars API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

