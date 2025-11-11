/**
 * GitHub Repositories REST API
 * GET    /api/github/repos - List user/org repos
 * GET    /api/github/repos/[owner]/[repo] - Get repo details
 * POST   /api/github/repos - Create repo
 * PATCH  /api/github/repos/[owner]/[repo] - Update repo
 * DELETE /api/github/repos/[owner]/[repo] - Delete repo
 * GET    /api/github/repos/[owner]/[repo]/topics - Get topics
 * PUT    /api/github/repos/[owner]/[repo]/topics - Replace topics
 * GET    /api/github/repos/[owner]/[repo]/languages - Get languages
 * GET    /api/github/repos/[owner]/[repo]/tags - Get tags
 * GET    /api/github/repos/[owner]/[repo]/readme - Get README
 * GET    /api/github/repos/[owner]/[repo]/license - Get license
 */

const { getAuthHeaders, checkResponseSize, minimalRepo } = require('../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;

  // Parse URL - Vercel dynamic routes give us owner/repo in query params
  const { owner, repo } = query;

  try {
    // GET /api/github/repos - List repos (no owner/repo in path)
    if (method === 'GET' && !owner && !repo) {
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

    // GET /api/github/repos/[owner]/[repo] - Get repo details
    if (method === 'GET' && owner && repo && !query.action) {
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();

      return res.status(200).json(checkResponseSize(minimalRepo(data)));
    }

    // POST /api/github/repos - Create repo
    if (method === 'POST' && !owner && !repo) {
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

    // PATCH /api/github/repos/[owner]/[repo] - Update repo
    if (method === 'PATCH' && owner && repo) {
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
    if (method === 'DELETE' && owner && repo) {
      
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      
      return res.status(204).send();
    }
    
    return res.status(404).json({ error: 'Not found' });
    
  } catch (error) {
    console.error('GitHub repos API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

