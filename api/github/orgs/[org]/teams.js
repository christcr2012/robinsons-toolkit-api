/**
 * GitHub Organization Teams REST API
 * GET  /api/github/orgs/[org]/teams - List teams
 * POST /api/github/orgs/[org]/teams - Create team
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
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/orgs/${org}/teams?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(t => ({ id: t.id, name: t.name, slug: t.slug, permission: t.permission }))));
    }
    
    if (method === 'POST') {
      const { name, description, privacy = 'closed' } = req.body;
      if (!name) throw new Error('name is required');
      const url = `https://api.github.com/orgs/${org}/teams`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, description, privacy })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub org teams API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

