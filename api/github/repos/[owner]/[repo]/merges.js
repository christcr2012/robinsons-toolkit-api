/**
 * GitHub Merges REST API
 * POST /api/github/repos/[owner]/[repo]/merges - Merge branches
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
    if (method === 'POST') {
      const { base, head, commit_message } = req.body;
      if (!base || !head) throw new Error('base and head are required');
      const url = `https://api.github.com/repos/${owner}/${repo}/merges`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ base, head, commit_message })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub merges API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

