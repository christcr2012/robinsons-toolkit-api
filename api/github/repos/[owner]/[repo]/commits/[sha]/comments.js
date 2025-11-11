/**
 * GitHub Commit Comments REST API
 * GET  /api/github/repos/[owner]/[repo]/commits/[sha]/comments - List comments
 * POST /api/github/repos/[owner]/[repo]/commits/[sha]/comments - Create comment
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, sha } = query;
  
  if (!owner || !repo || !sha) {
    return res.status(400).json({ error: 'owner, repo, and sha are required' });
  }
  
  try {
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/commits/${sha}/comments?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(c => ({ id: c.id, body: c.body, user: { login: c.user.login }, created_at: c.created_at }))));
    }
    
    if (method === 'POST') {
      const { body, line, path } = req.body;
      if (!body) throw new Error('body is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/commits/${sha}/comments`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ body, line, path })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub commit comments API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

