/**
 * GitHub Milestones REST API
 * GET  /api/github/repos/[owner]/[repo]/milestones - List milestones
 * POST /api/github/repos/[owner]/[repo]/milestones - Create milestone
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
      const { state = 'open', sort = 'due_on', direction = 'asc', per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/milestones?state=${state}&sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'POST') {
      const { title, state, description, due_on } = req.body;
      if (!title) throw new Error('title is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/milestones`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, state, description, due_on })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub milestones API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

