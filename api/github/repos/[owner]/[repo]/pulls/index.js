/**
 * GitHub Pull Requests REST API
 * GET  /api/github/repos/[owner]/[repo]/pulls - List pull requests
 * POST /api/github/repos/[owner]/[repo]/pulls - Create pull request
 */

const { getAuthHeaders, checkResponseSize, minimalPR } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo]/pulls - List pull requests
    if (method === 'GET') {
      const { state = 'open', head, base, sort = 'created', direction = 'desc', per_page = 10, page = 1 } = query;
      
      let url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}&sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`;
      if (head) url += `&head=${head}`;
      if (base) url += `&base=${base}`;
      
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const prs = await response.json();
      
      return res.status(200).json(checkResponseSize(prs.map(minimalPR)));
    }
    
    // POST /api/github/repos/[owner]/[repo]/pulls - Create pull request
    if (method === 'POST') {
      const { title, head, base, body, draft, maintainer_can_modify } = req.body;
      if (!title || !head || !base) throw new Error('title, head, and base are required');
      
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
      const requestBody = { title, head, base, body, draft, maintainer_can_modify };
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(201).json(checkResponseSize(minimalPR(data)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub pulls API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

