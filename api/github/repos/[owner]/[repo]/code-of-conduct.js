/**
 * GitHub Code of Conduct REST API
 * GET /api/github/repos/[owner]/[repo]/code-of-conduct - Get code of conduct
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = {
    ...getAuthHeaders(),
    'Accept': 'application/vnd.github.scarlet-witch-preview+json'
  };
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/community/code_of_conduct`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub code of conduct API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

