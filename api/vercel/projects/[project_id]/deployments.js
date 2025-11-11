/**
 * Vercel Deployments REST API
 * GET  /api/vercel/projects/[project_id]/deployments - List deployments
 * POST /api/vercel/projects/[project_id]/deployments - Create deployment
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
      const { limit = 20, until, state } = query;
      let url = `${VERCEL_API_BASE}/v6/deployments?projectId=${project_id}&limit=${limit}`;
      if (until) url += `&until=${until}`;
      if (state) url += `&state=${state}`;
      
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.deployments?.map(d => ({ id: d.id, url: d.url, state: d.state, created: d.created })) || []));
    }
    
    if (method === 'POST') {
      const { name, gitSource } = req.body;
      const url = `${VERCEL_API_BASE}/v13/deployments`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, gitSource, projectId: project_id })
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Vercel deployments API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

