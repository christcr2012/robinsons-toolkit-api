/**
 * GitHub Labels REST API
 * GET  /api/github/repos/[owner]/[repo]/labels - List labels
 * POST /api/github/repos/[owner]/[repo]/labels - Create label
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
      const { per_page = 30, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/labels?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'POST') {
      const { name, color, description } = req.body;
      if (!name) throw new Error('name is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/labels`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, color, description })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub labels API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

