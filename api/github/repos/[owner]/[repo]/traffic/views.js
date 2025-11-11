/**
 * GitHub Traffic Views REST API
 * GET /api/github/repos/[owner]/[repo]/traffic/views - Get views
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
      const { per = 'day' } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/traffic/views?per=${per}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        count: data.count,
        uniques: data.uniques,
        views: data.views?.slice(0, 10) || []
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub traffic views API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

