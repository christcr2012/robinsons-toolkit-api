/**
 * GitHub Repositories REST API
 * GET  /api/github/repos - List user repos
 * GET  /api/github/repos/:owner/:repo - Get repo details
 * POST /api/github/repos - Create repo
 * PATCH /api/github/repos/:owner/:repo - Update repo
 * DELETE /api/github/repos/:owner/:repo - Delete repo
 */

const MAX_RESPONSE_SIZE = 100 * 1024;

function checkResponseSize(data) {
  const jsonStr = JSON.stringify(data);
  if (jsonStr.length > MAX_RESPONSE_SIZE) {
    throw new Error(`Response too large: ${(jsonStr.length / 1024).toFixed(2)}KB`);
  }
  return data;
}

function getAuthHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not configured');
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json'
  };
}

const minimalRepo = (r) => ({
  id: r.id,
  name: r.name,
  full_name: r.full_name,
  private: r.private,
  description: r.description,
  html_url: r.html_url,
  created_at: r.created_at,
  updated_at: r.updated_at,
  language: r.language,
  default_branch: r.default_branch,
  stargazers_count: r.stargazers_count,
  forks_count: r.forks_count
});

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const pathParts = req.url.split('/').filter(p => p);
  
  try {
    // GET /api/github/repos - List repos
    if (method === 'GET' && pathParts.length === 3) {
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
    
    // GET /api/github/repos/:owner/:repo - Get repo details
    if (method === 'GET' && pathParts.length === 5) {
      const owner = pathParts[3];
      const repo = pathParts[4];
      
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(200).json(checkResponseSize(minimalRepo(data)));
    }
    
    // POST /api/github/repos - Create repo
    if (method === 'POST' && pathParts.length === 3) {
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
    
    // PATCH /api/github/repos/:owner/:repo - Update repo
    if (method === 'PATCH' && pathParts.length === 5) {
      const owner = pathParts[3];
      const repo = pathParts[4];
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
    
    // DELETE /api/github/repos/:owner/:repo - Delete repo
    if (method === 'DELETE' && pathParts.length === 5) {
      const owner = pathParts[3];
      const repo = pathParts[4];
      
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

