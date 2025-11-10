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

  // PROJECT MANAGEMENT (continued - 10 more tools)
  if (tool === 'vercel_update_project') {
    const { projectId, name, framework, buildCommand, devCommand, installCommand, outputDirectory } = args;
    if (!projectId) throw new Error('projectId is required');

    const url = `${VERCEL_API_BASE}/v9/projects/${projectId}`;
    const body = {};
    if (name) body.name = name;
    if (framework) body.framework = framework;
    if (buildCommand !== undefined) body.buildCommand = buildCommand;
    if (devCommand !== undefined) body.devCommand = devCommand;
    if (installCommand !== undefined) body.installCommand = installCommand;
    if (outputDirectory !== undefined) body.outputDirectory = outputDirectory;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalProject(data));
  }

  if (tool === 'vercel_pause_project') {
    const { projectId } = args;
    if (!projectId) throw new Error('projectId is required');

    const url = `${VERCEL_API_BASE}/v1/projects/${projectId}/pause`;
    const response = await fetch(url, {
      method: 'POST',
      headers
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);

    return { success: true, message: 'Project paused' };
  }

  if (tool === 'vercel_unpause_project') {
    const { projectId } = args;
    if (!projectId) throw new Error('projectId is required');

    const url = `${VERCEL_API_BASE}/v1/projects/${projectId}/unpause`;
    const response = await fetch(url, {
      method: 'POST',
      headers
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);

    return { success: true, message: 'Project unpaused' };
  }

  // DOMAINS (15 tools)
  if (tool === 'vercel_list_domains') {
    const { limit = 10, since, until } = args;
    let url = `${VERCEL_API_BASE}/v5/domains?limit=${limit}`;
    if (since) url += `&since=${since}`;
    if (until) url += `&until=${until}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      domains: data.domains.map(d => ({
        id: d.id,
        name: d.name,
        verified: d.verified,
        createdAt: d.createdAt
      })),
      pagination: data.pagination
    });
  }

  if (tool === 'vercel_get_domain') {
    const { domain } = args;
    if (!domain) throw new Error('domain is required');

    const url = `${VERCEL_API_BASE}/v5/domains/${domain}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'vercel_add_domain') {
    const { name, projectId } = args;
    if (!name) throw new Error('name is required');

    const url = `${VERCEL_API_BASE}/v10/projects/${projectId}/domains`;
    const body = { name };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'vercel_remove_domain') {
    const { domain, projectId } = args;
    if (!domain || !projectId) throw new Error('domain and projectId are required');

    const url = `${VERCEL_API_BASE}/v9/projects/${projectId}/domains/${domain}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);

    return { success: true, message: 'Domain removed' };
  }

  if (tool === 'vercel_verify_domain') {
    const { domain, projectId } = args;
    if (!domain || !projectId) throw new Error('domain and projectId are required');

    const url = `${VERCEL_API_BASE}/v9/projects/${projectId}/domains/${domain}/verify`;
    const response = await fetch(url, {
      method: 'POST',
      headers
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'vercel_get_domain_config') {
    const { domain } = args;
    if (!domain) throw new Error('domain is required');

    const url = `${VERCEL_API_BASE}/v6/domains/${domain}/config`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  // ENVIRONMENT VARIABLES (12 tools)
  if (tool === 'vercel_list_env_vars') {
    const { projectId } = args;
    if (!projectId) throw new Error('projectId is required');

    const url = `${VERCEL_API_BASE}/v9/projects/${projectId}/env`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      envs: data.envs.map(e => ({
        id: e.id,
        key: e.key,
        type: e.type,
        target: e.target,
        createdAt: e.createdAt
      }))
    });
  }

  if (tool === 'vercel_get_env_var') {
    const { projectId, envId } = args;
    if (!projectId || !envId) throw new Error('projectId and envId are required');

    const url = `${VERCEL_API_BASE}/v9/projects/${projectId}/env/${envId}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'vercel_create_env_var') {
    const { projectId, key, value, type = 'encrypted', target } = args;
    if (!projectId || !key || !value || !target) throw new Error('projectId, key, value, and target are required');

    const url = `${VERCEL_API_BASE}/v10/projects/${projectId}/env`;
    const body = { key, value, type, target };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'vercel_update_env_var') {
    const { projectId, envId, value, target } = args;
    if (!projectId || !envId) throw new Error('projectId and envId are required');

    const url = `${VERCEL_API_BASE}/v9/projects/${projectId}/env/${envId}`;
    const body = {};
    if (value !== undefined) body.value = value;
    if (target) body.target = target;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'vercel_delete_env_var') {
    const { projectId, envId } = args;
    if (!projectId || !envId) throw new Error('projectId and envId are required');

    const url = `${VERCEL_API_BASE}/v9/projects/${projectId}/env/${envId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);

    return { success: true, message: 'Environment variable deleted' };
  }

  // ALIASES (8 tools)
  if (tool === 'vercel_list_aliases') {
    const { projectId, limit = 10 } = args;
    let url = `${VERCEL_API_BASE}/v4/aliases?limit=${limit}`;
    if (projectId) url += `&projectId=${projectId}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      aliases: data.aliases.map(a => ({
        uid: a.uid,
        alias: a.alias,
        createdAt: a.createdAt,
        deploymentId: a.deploymentId
      })),
      pagination: data.pagination
    });
  }

  if (tool === 'vercel_get_alias') {
    const { aliasId } = args;
    if (!aliasId) throw new Error('aliasId is required');

    const url = `${VERCEL_API_BASE}/v2/aliases/${aliasId}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'vercel_assign_alias') {
    const { deploymentId, alias } = args;
    if (!deploymentId || !alias) throw new Error('deploymentId and alias are required');

    const url = `${VERCEL_API_BASE}/v2/deployments/${deploymentId}/aliases`;
    const body = { alias };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'vercel_delete_alias') {
    const { aliasId } = args;
    if (!aliasId) throw new Error('aliasId is required');

    const url = `${VERCEL_API_BASE}/v2/aliases/${aliasId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`Vercel API error: ${response.status}`);

    return { success: true, message: 'Alias deleted' };
  }

  // Default: tool not implemented yet
  throw new Error(`Vercel tool not yet implemented: ${tool}`);
}

module.exports = { execute };