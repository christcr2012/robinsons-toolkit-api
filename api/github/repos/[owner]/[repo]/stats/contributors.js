/**
 * GitHub Repository Stats REST API
 * GET /api/github/repos/[owner]/[repo]/stats/contributors - Get contributor stats
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
      const url = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data?.map(c => ({ 
        author: { login: c.author?.login, id: c.author?.id },
        total: c.total,
        weeks: c.weeks?.slice(0, 5) || []
      })) || []));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub stats API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

