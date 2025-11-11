/**
 * GitHub User Following REST API
 * GET /api/github/user/following - List following
 */

const { getAuthHeaders, checkResponseSize } = require('../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  
  try {
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/user/following?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(u => ({ id: u.id, login: u.login, avatar_url: u.avatar_url }))));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub following API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

