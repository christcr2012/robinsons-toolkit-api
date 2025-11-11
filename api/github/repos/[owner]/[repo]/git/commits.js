/**
 * GitHub Git Commits REST API
 * GET  /api/github/repos/[owner]/[repo]/git/commits - Get commit
 * POST /api/github/repos/[owner]/[repo]/git/commits - Create commit
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
      const { commit_sha } = query;
      if (!commit_sha) throw new Error('commit_sha is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/git/commits/${commit_sha}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'POST') {
      const { message, tree, parents } = req.body;
      if (!message || !tree) throw new Error('message and tree are required');
      const url = `https://api.github.com/repos/${owner}/${repo}/git/commits`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message, tree, parents })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub git commits API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

