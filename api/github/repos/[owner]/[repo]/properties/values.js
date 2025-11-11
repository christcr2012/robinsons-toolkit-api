/**
 * GitHub Custom Properties Values REST API
 * GET  /api/github/repos/[owner]/[repo]/properties/values - Get values
 * PATCH /api/github/repos/[owner]/[repo]/properties/values - Update values
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
      const url = `https://api.github.com/repos/${owner}/${repo}/properties/values`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'PATCH') {
      const { properties } = req.body;
      if (!properties) throw new Error('properties is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/properties/values`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ properties })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub custom properties API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

