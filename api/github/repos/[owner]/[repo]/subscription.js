/**
 * GitHub Repository Subscription REST API
 * GET /api/github/repos/[owner]/[repo]/subscription - Get subscription
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
      const url = `https://api.github.com/repos/${owner}/${repo}/subscription`;
      const response = await fetch(url, { headers });
      if (response.status === 404) {
        return res.status(200).json({ subscribed: false });
      }
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub subscription API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

