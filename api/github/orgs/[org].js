/**
 * GitHub Organization REST API
 * GET /api/github/orgs/[org] - Get organization
 */

const { getAuthHeaders, checkResponseSize } = require('../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { org } = query;
  
  if (!org) {
    return res.status(400).json({ error: 'org is required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/orgs/${org}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        id: data.id,
        login: data.login,
        name: data.name,
        blog: data.blog,
        location: data.location,
        email: data.email,
        bio: data.bio,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub org API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

