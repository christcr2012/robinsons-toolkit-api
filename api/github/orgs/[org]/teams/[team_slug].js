/**
 * GitHub Team REST API
 * GET    /api/github/orgs/[org]/teams/[team_slug] - Get team
 * PATCH  /api/github/orgs/[org]/teams/[team_slug] - Update team
 * DELETE /api/github/orgs/[org]/teams/[team_slug] - Delete team
 */

const { getAuthHeaders, checkResponseSize } = require('../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { org, team_slug } = query;
  
  if (!org || !team_slug) {
    return res.status(400).json({ error: 'org and team_slug are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/orgs/${org}/teams/${team_slug}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'PATCH') {
      const { name, description, privacy } = req.body;
      const url = `https://api.github.com/orgs/${org}/teams/${team_slug}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ name, description, privacy })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'DELETE') {
      const url = `https://api.github.com/orgs/${org}/teams/${team_slug}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub team API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

