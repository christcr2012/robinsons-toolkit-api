/**
 * Vercel Projects REST API
 * GET  /api/vercel/projects - List projects
 * POST /api/vercel/projects - Create project
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
  
  try {
    if (method === 'GET') {
      const { limit = 20, since, until } = query;
      let url = `${VERCEL_API_BASE}/v9/projects?limit=${limit}`;
      if (since) url += `&since=${since}`;
      if (until) url += `&until=${until}`;
      
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.projects?.map(p => ({ id: p.id, name: p.name, framework: p.framework, created_at: p.createdAt })) || []));
    }
    
    if (method === 'POST') {
      const { name, framework, gitRepository } = req.body;
      if (!name) throw new Error('name is required');
      const url = `${VERCEL_API_BASE}/v10/projects`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, framework, gitRepository })
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Vercel projects API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

