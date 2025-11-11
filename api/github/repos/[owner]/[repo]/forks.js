/**
 * GitHub Forks REST API
 * GET  /api/github/repos/[owner]/[repo]/forks - List forks
 * POST /api/github/repos/[owner]/[repo]/forks - Create fork
 */

const { getAuthHeaders, checkResponseSize, minimalRepo } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    if (method === 'GET') {
      const { sort = 'newest', per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/forks?sort=${sort}&per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(minimalRepo)));
    }
    
    if (method === 'POST') {
      const { organization, name } = req.body;
      const url = `https://api.github.com/repos/${owner}/${repo}/forks`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ organization, name })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(202).json(checkResponseSize(minimalRepo(data)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub forks API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

