/**
 * GitHub Deployments REST API
 * GET  /api/github/repos/[owner]/[repo]/deployments - List deployments
 * POST /api/github/repos/[owner]/[repo]/deployments - Create deployment
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    if (method === 'GET') {
      const { environment = 'production', per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/deployments?environment=${environment}&per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(d => ({ id: d.id, ref: d.ref, environment: d.environment, created_at: d.created_at }))));
    }
    
    if (method === 'POST') {
      const { ref, environment = 'production', description } = req.body;
      if (!ref) throw new Error('ref is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/deployments`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ref, environment, description })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub deployments API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

