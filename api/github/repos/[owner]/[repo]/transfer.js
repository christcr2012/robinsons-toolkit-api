/**
 * GitHub Repository Transfer REST API
 * POST /api/github/repos/[owner]/[repo]/transfer - Transfer repository
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
      const { new_owner, new_name } = req.body;
      if (!new_owner) throw new Error('new_owner is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/transfer`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ new_owner, new_name })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(202).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub transfer API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

