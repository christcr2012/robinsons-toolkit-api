/**
 * VERCEL Integration - Pure JavaScript, NO TypeScript, NO MCP
 */

async function vercelFetch(token, path, options = {}) {
  const url = path.startsWith('http') ? path : `https://api.vercel.com${path}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Vercel API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

async function executeVercelTool(tool, args, token) {
  if (!token) {
    throw new Error('Missing Vercel token');
  }

  // Remove 'vercel_' prefix
  const method = tool.replace('vercel_', '');

  switch (method) {
    case 'list_projects':
      return vercelFetch(token, '/v9/projects', { method: 'GET' });
    
    case 'get_project':
      if (!args.projectId) throw new Error('Missing projectId');
      return vercelFetch(token, `/v9/projects/${args.projectId}`, { method: 'GET' });
    
    case 'list_deployments':
      const projectParam = args.projectId ? `?projectId=${args.projectId}` : '';
      return vercelFetch(token, `/v6/deployments${projectParam}`, { method: 'GET' });
    
    default:
      throw new Error(`Unknown Vercel tool: ${tool}`);
  }
}

module.exports = { executeVercelTool };
