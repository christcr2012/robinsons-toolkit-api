/**
 * GitHub Topics REST API
 * GET /api/github/repos/[owner]/[repo]/topics - Get topics
 * PUT /api/github/repos/[owner]/[repo]/topics - Replace topics
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = {
    ...getAuthHeaders(),
    'Accept': 'application/vnd.github.mercy-preview+json'
  };
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/topics`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'PUT') {
      const { names } = req.body;
      if (!names || !Array.isArray(names)) throw new Error('names array is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/topics`;
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ names })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub topics API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

