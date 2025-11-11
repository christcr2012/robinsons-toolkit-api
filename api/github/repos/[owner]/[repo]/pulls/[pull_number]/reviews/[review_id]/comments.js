/**
 * GitHub PR Review Comments REST API
 * GET /api/github/repos/[owner]/[repo]/pulls/[pull_number]/reviews/[review_id]/comments - List comments
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, pull_number, review_id } = query;
  
  if (!owner || !repo || !pull_number || !review_id) {
    return res.status(400).json({ error: 'owner, repo, pull_number, and review_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/reviews/${review_id}/comments?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(c => ({ id: c.id, user: c.user?.login, body: c.body, created_at: c.created_at }))));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub PR review comments API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

