/**
 * GitHub PR Review REST API
 * GET    /api/github/repos/[owner]/[repo]/pulls/[pull_number]/reviews/[review_id] - Get review
 * DELETE /api/github/repos/[owner]/[repo]/pulls/[pull_number]/reviews/[review_id] - Delete review
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
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/reviews/${review_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'DELETE') {
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/reviews/${review_id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub PR review API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

