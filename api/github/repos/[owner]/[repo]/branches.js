/**
 * GitHub Branches REST API
 * GET /api/github/repos/[owner]/[repo]/branches - List branches
 */

const { getAuthHeaders, checkResponseSize, minimalBranch } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo]/branches - List branches
    if (method === 'GET') {
      const { protected: isProtected, per_page = 10, page = 1 } = query;
      
      let url = `https://api.github.com/repos/${owner}/${repo}/branches?per_page=${per_page}&page=${page}`;
      if (isProtected !== undefined) url += `&protected=${isProtected}`;
      
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const branches = await response.json();
      
      return res.status(200).json(checkResponseSize(branches.map(minimalBranch)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub branches API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

