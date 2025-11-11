/**
 * Vercel Single Environment Variable REST API
 * GET    /api/vercel/projects/[project_id]/env/[env_id] - Get env var
 * PATCH  /api/vercel/projects/[project_id]/env/[env_id] - Update env var
 * DELETE /api/vercel/projects/[project_id]/env/[env_id] - Delete env var
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
  const { project_id, env_id } = query;
  
  if (!project_id || !env_id) {
    return res.status(400).json({ error: 'project_id and env_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `${VERCEL_API_BASE}/v9/projects/${project_id}/env/${env_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'PATCH') {
      const { value, target } = req.body;
      const url = `${VERCEL_API_BASE}/v9/projects/${project_id}/env/${env_id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ value, target })
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'DELETE') {
      const url = `${VERCEL_API_BASE}/v9/projects/${project_id}/env/${env_id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Vercel env var API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

