/**
 * Unified REST API - Direct implementation (no broken lib dependencies)
 */

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
      const response = await fetch('https://api.vercel.com/v9/projects', {
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      result = await response.json();
    }
    else if (tool === 'vercel_get_project') {
      const response = await fetch(`https://api.vercel.com/v9/projects/${args.projectId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      result = await response.json();
    }
    else if (tool === 'vercel_list_deployments') {
      const url = args.projectId 
        ? `https://api.vercel.com/v6/deployments?projectId=${args.projectId}`
        : 'https://api.vercel.com/v6/deployments';
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
      result = await response.json();
    }
    
    // GITHUB TOOLS
    else if (tool === 'github_list_repos') {
      const path = args.org ? `/orgs/${args.org}/repos` : '/user/repos';
      const params = new URLSearchParams();
      if (args.type) params.append('type', args.type);
      if (args.per_page) params.append('per_page', args.per_page);
      const query = params.toString() ? `?${params}` : '';
      
      const response = await fetch(`https://api.github.com${path}${query}`, {
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json'
        }
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      result = await response.json();
    }
    else if (tool === 'github_get_repo') {
      const response = await fetch(`https://api.github.com/repos/${args.owner}/${args.repo}`, {
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json'
        }
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      result = await response.json();
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
