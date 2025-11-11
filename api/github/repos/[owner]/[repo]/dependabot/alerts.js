/**
 * GitHub Dependabot Alerts REST API
 * GET /api/github/repos/[owner]/[repo]/dependabot/alerts - List alerts
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
      const { state = 'open', per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/dependabot/alerts?state=${state}&per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(a => ({ number: a.number, state: a.state, dependency: a.dependency?.package?.name, created_at: a.created_at }))));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub dependabot alerts API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

