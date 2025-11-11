/**
 * GitHub Team Discussions REST API
 * GET  /api/github/orgs/[org]/teams/[team_slug]/discussions - List discussions
 * POST /api/github/orgs/[org]/teams/[team_slug]/discussions - Create discussion
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
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/orgs/${org}/teams/${team_slug}/discussions?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(d => ({ number: d.number, title: d.title, body: d.body, created_at: d.created_at }))));
    }
    
    if (method === 'POST') {
      const { title, body } = req.body;
      if (!title) throw new Error('title is required');
      const url = `https://api.github.com/orgs/${org}/teams/${team_slug}/discussions`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, body })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub team discussions API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

