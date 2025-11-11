/**
 * GitHub PR Reviews REST API
 * GET  /api/github/repos/[owner]/[repo]/pulls/[pull_number]/reviews - List reviews
 * POST /api/github/repos/[owner]/[repo]/pulls/[pull_number]/reviews - Create review
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, pull_number } = query;
  
  if (!owner || !repo || !pull_number) {
    return res.status(400).json({ error: 'owner, repo, and pull_number are required' });
  }
  
  try {
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/reviews?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(r => ({ id: r.id, state: r.state, user: { login: r.user.login }, submitted_at: r.submitted_at }))));
    }
    
    if (method === 'POST') {
      const { body, event, comments } = req.body;
      if (!event) throw new Error('event is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/reviews`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ body, event, comments })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub PR reviews API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

