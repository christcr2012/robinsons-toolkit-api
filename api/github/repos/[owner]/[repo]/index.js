/**
 * GitHub Single Repository REST API
 * GET    /api/github/repos/[owner]/[repo] - Get repo details
 * PATCH  /api/github/repos/[owner]/[repo] - Update repo
 * DELETE /api/github/repos/[owner]/[repo] - Delete repo
 */

const { getAuthHeaders, checkResponseSize, minimalRepo } = require('../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo] - Get repo details
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(200).json(checkResponseSize(minimalRepo(data)));
    }
    
    // PATCH /api/github/repos/[owner]/[repo] - Update repo
    if (method === 'PATCH') {
      const { name, description, private: isPrivate, has_issues, has_projects, has_wiki } = req.body;
      
      const body = {
        name,
        description,
        private: isPrivate,
        has_issues,
        has_projects,
        has_wiki
      };
      
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body)
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(200).json(checkResponseSize(minimalRepo(data)));
    }
    
    // DELETE /api/github/repos/[owner]/[repo] - Delete repo
    if (method === 'DELETE') {
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub repo API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

