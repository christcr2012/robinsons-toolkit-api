/**
 * GitHub Authenticated User REST API
 * GET /api/github/user - Get authenticated user
 */

const { getAuthHeaders, checkResponseSize } = require('../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method } = req;
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/user`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        id: data.id,
        login: data.login,
        name: data.name,
        email: data.email,
        bio: data.bio,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub user API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

