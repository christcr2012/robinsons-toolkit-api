/**
 * GitHub Collaborators REST API
 * GET /api/github/repos/[owner]/[repo]/collaborators - List collaborators
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

const minimalUser = (u) => ({
  id: u.id,
  login: u.login,
  avatar_url: u.avatar_url,
  html_url: u.html_url
});

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo]/collaborators - List collaborators
    if (method === 'GET') {
      const { affiliation = 'all', per_page = 10, page = 1 } = query;
      
      const url = `https://api.github.com/repos/${owner}/${repo}/collaborators?affiliation=${affiliation}&per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const collaborators = await response.json();
      
      return res.status(200).json(checkResponseSize(collaborators.map(minimalUser)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub collaborators API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

