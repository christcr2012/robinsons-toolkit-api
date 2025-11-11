/**
 * GitHub Git Trees REST API
 * GET  /api/github/repos/[owner]/[repo]/git/trees - Get tree
 * POST /api/github/repos/[owner]/[repo]/git/trees - Create tree
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
      const { tree_sha, recursive } = query;
      if (!tree_sha) throw new Error('tree_sha is required');
      let url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${tree_sha}`;
      if (recursive) url += '?recursive=1';
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'POST') {
      const { tree, base_tree } = req.body;
      if (!tree) throw new Error('tree is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/git/trees`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ tree, base_tree })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub git trees API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

