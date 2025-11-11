/**
 * GitHub Required Pull Request Reviews REST API
 * GET /api/github/repos/[owner]/[repo]/branches/[branch]/protection/required-pull-request-reviews - Get required reviews
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, branch } = query;
  
  if (!owner || !repo || !branch) {
    return res.status(400).json({ error: 'owner, repo, and branch are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/branches/${branch}/protection/required-pull-request-reviews`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub required PR reviews API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

