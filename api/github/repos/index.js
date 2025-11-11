/**
 * GitHub Repositories List REST API
 * GET  /api/github/repos - List user/org repos
 * POST /api/github/repos - Create repo
 */

const { getAuthHeaders, checkResponseSize, minimalRepo } = require('../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  
  try {
    // GET /api/github/repos - List repos
    if (method === 'GET') {
      const { org, type = 'owner', sort = 'updated', per_page = 10, page = 1 } = query;
      
      let url;
      if (org) {
        url = `https://api.github.com/orgs/${org}/repos?type=${type}&sort=${sort}&per_page=${per_page}&page=${page}`;
      } else {
        url = `https://api.github.com/user/repos?type=${type}&sort=${sort}&per_page=${per_page}&page=${page}`;
      }
      
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(200).json(checkResponseSize(data.map(minimalRepo)));
    }
    
    // POST /api/github/repos - Create repo
    if (method === 'POST') {
      const { name, description, private: isPrivate, auto_init, gitignore_template, license_template, org } = req.body;
      
      if (!name) throw new Error('name is required');
      
      const body = {
        name,
        description,
        private: isPrivate,
        auto_init,
        gitignore_template,
        license_template
      };
      
      let url;
      if (org) {
        url = `https://api.github.com/orgs/${org}/repos`;
      } else {
        url = `https://api.github.com/user/repos`;
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(201).json(checkResponseSize(minimalRepo(data)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub repos API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

