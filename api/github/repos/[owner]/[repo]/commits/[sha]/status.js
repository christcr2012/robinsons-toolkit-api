/**
 * GitHub Commit Status REST API
 * GET /api/github/repos/[owner]/[repo]/commits/[sha]/status - Get commit status
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, sha } = query;
  
  if (!owner || !repo || !sha) {
    return res.status(400).json({ error: 'owner, repo, and sha are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/commits/${sha}/status`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        state: data.state,
        statuses: data.statuses?.map(s => ({ state: s.state, context: s.context, description: s.description })) || [],
        sha: data.sha,
        total_count: data.total_count
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub commit status API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

