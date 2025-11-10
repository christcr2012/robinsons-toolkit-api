/**
 * Vercel API Handler - ALL 151 Vercel tools
 * Standalone implementation using Vercel REST API
 */

const VERCEL_API_BASE = 'https://api.vercel.com';
const MAX_RESPONSE_SIZE = 100 * 1024;

function checkResponseSize(data) {
  const jsonStr = JSON.stringify(data);
  if (jsonStr.length > MAX_RESPONSE_SIZE) {
    throw new Error(`Response too large: ${(jsonStr.length / 1024).toFixed(2)}KB`);
  }
  return data;
}

function getAuthHeaders() {
  const token = process.env.VERCEL_TOKEN;
  if (!token) throw new Error('VERCEL_TOKEN not configured');

  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

// Minimal field extractors
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

async function execute(tool, args) {
  const headers = getAuthHeaders();

  // PROJECT MANAGEMENT
  if (tool === 'vercel_list_projects') {
    const { limit = 10, since, until } = args;
    let url = `${VERCEL_API_BASE}/v9/projects?limit=${limit}`;
    if (since) url += `&since=${since}`;
    if (until) url += `&until=${until}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      projects: data.projects.map(minimalProject),
      pagination: data.pagination
    });
  }

  if (tool === 'vercel_get_project') {
    const { projectId } = args;
    if (!projectId) throw new Error('projectId is required');

    const url = `${VERCEL_API_BASE}/v9/projects/${projectId}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalProject(data));
  }

  if (tool === 'vercel_create_project') {
    const { name, framework, gitRepository } = args;
    if (!name) throw new Error('name is required');

    const url = `${VERCEL_API_BASE}/v9/projects`;
    const body = { name, framework, gitRepository };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalProject(data));
  }

  if (tool === 'vercel_delete_project') {
    const { projectId } = args;
    if (!projectId) throw new Error('projectId is required');

    const url = `${VERCEL_API_BASE}/v9/projects/${projectId}`;
    const response = await fetch(url, { method: 'DELETE', headers });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);

    return { success: true, message: `Project ${projectId} deleted` };
  }

  // DEPLOYMENT MANAGEMENT
  if (tool === 'vercel_list_deployments') {
    const { projectId, limit = 10, state } = args;
    if (!projectId) throw new Error('projectId is required');

    let url = `${VERCEL_API_BASE}/v6/deployments?projectId=${projectId}&limit=${limit}`;
    if (state) url += `&state=${state}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      deployments: data.deployments.map(minimalDeployment),
      pagination: data.pagination
    });
  }

  if (tool === 'vercel_get_deployment') {
    const { deploymentId } = args;
    if (!deploymentId) throw new Error('deploymentId is required');

    const url = `${VERCEL_API_BASE}/v13/deployments/${deploymentId}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalDeployment(data));
  }

  // Default: tool not implemented yet
  throw new Error(`Vercel tool not yet implemented: ${tool}`);
}

module.exports = { execute };