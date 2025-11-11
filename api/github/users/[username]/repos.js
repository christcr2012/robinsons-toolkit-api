/**
 * GitHub User Repos REST API
 * GET /api/github/users/[username]/repos - Get user repos
 */

const { getAuthHeaders, checkResponseSize, minimalRepo } = require('../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { username } = query;
  
  if (!username) {
    return res.status(400).json({ error: 'username is required' });
  }
  
  try {
    if (method === 'GET') {
      const { type = 'owner', sort = 'updated', direction = 'desc', per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/users/${username}/repos?type=${type}&sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(minimalRepo)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub user repos API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

