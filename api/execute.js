/**
 * Unified REST API - Direct implementation (no broken lib dependencies)
 * With response size filtering for Custom GPT compatibility
 */

// Response size limit for Custom GPT compatibility (100KB)
const MAX_RESPONSE_SIZE = 100 * 1024;

// Helper to check response size and throw error if too large
function checkResponseSize(data, maxSize = MAX_RESPONSE_SIZE) {
  const jsonStr = JSON.stringify(data);
  if (jsonStr.length > maxSize) {
    throw new Error(`Response too large: ${(jsonStr.length / 1024).toFixed(2)}KB (max: ${(maxSize / 1024).toFixed(2)}KB). Use pagination parameters to reduce response size.`);
  }
  return data;
}

// Minimal field extractors for common objects
const minimalProject = (p) => ({
  id: p.id,
  name: p.name,
  framework: p.framework,
  createdAt: p.createdAt,
  updatedAt: p.updatedAt,
  link: p.link ? {
    type: p.link.type,
    repo: p.link.repo,
    org: p.link.org,
    productionBranch: p.link.productionBranch
  } : null
});

const minimalDeployment = (d) => ({
  id: d.id,
  url: d.url,
  name: d.name,
  createdAt: d.createdAt,
  readyState: d.readyState,
  target: d.target,
  creator: d.creator ? {
    username: d.creator.username,
    email: d.creator.email
  } : null
});

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
  default_branch: r.default_branch
});

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  if (process.env.API_SECRET_KEY && apiKey !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { tool, args = {} } = req.body;

    if (!tool) {
      return res.status(400).json({ error: 'Missing tool parameter' });
    }

    console.log('Executing:', tool, 'Args:', JSON.stringify(args));

    let result;

    // VERCEL TOOLS
    if (tool === 'vercel_list_projects') {
      const limit = args.limit || 10; // Default to 10 for smaller responses
      const since = args.since || undefined;
      const until = args.until || undefined;

      let url = `https://api.vercel.com/v9/projects?limit=${limit}`;
      if (since) url += `&since=${since}`;
      if (until) url += `&until=${until}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();

      // Return minimal data - just essential fields
      result = checkResponseSize({
        projects: data.projects.map(minimalProject),
        pagination: data.pagination
      });
    }
    else if (tool === 'vercel_get_project') {
      const response = await fetch(`https://api.vercel.com/v9/projects/${args.projectId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();

      // Return minimal data - exclude env vars and large arrays
      result = checkResponseSize({
        ...minimalProject(data),
        latestDeployments: data.latestDeployments ? data.latestDeployments.slice(0, 3).map(minimalDeployment) : []
      });
    }
    else if (tool === 'vercel_list_deployments') {
      const limit = args.limit || 10; // Default to 10 for smaller responses
      let url = args.projectId
        ? `https://api.vercel.com/v6/deployments?projectId=${args.projectId}&limit=${limit}`
        : `https://api.vercel.com/v6/deployments?limit=${limit}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      const data = await response.json();

      // Return minimal deployment data
      result = checkResponseSize({
        deployments: data.deployments.map(minimalDeployment),
        pagination: data.pagination
      });
    }
    
    // GITHUB TOOLS
    else if (tool === 'github_list_repos') {
      const path = args.org ? `/orgs/${args.org}/repos` : '/user/repos';
      const params = new URLSearchParams();
      if (args.type) params.append('type', args.type);
      params.append('per_page', args.per_page || 10); // Default to 10 for smaller responses
      if (args.page) params.append('page', args.page);
      const query = params.toString() ? `?${params}` : '';

      const response = await fetch(`https://api.github.com${path}${query}`, {
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json'
        }
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();

      result = checkResponseSize(data.map(minimalRepo));
    }
    else if (tool === 'github_get_repo') {
      const response = await fetch(`https://api.github.com/repos/${args.owner}/${args.repo}`, {
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json'
        }
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();

      result = checkResponseSize(minimalRepo(data));
    }
    
    else {
      return res.status(400).json({ 
        error: `Tool not implemented yet: ${tool}`,
        hint: 'Currently supported: vercel_list_projects, vercel_get_project, vercel_list_deployments, github_list_repos, github_get_repo'
      });
    }

    return res.status(200).json({
      ok: true,
      tool,
      result
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};
