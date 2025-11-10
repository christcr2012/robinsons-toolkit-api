/** N8N Integration - Pure JavaScript */

async function n8nFetch(credentials, path, options = {}) {
  const url = path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function handleN8nWorkflowTrigger(credentials, args) {
  const { workflow_id, data } = args;
  return await fastAPIClient.n8nTriggerWorkflow(workflow_id, data);
}

async function handleN8nWorkflowList(credentials, args) {
  const { active } = args;
  
  let url = '/gateway/n8n/api/v1/workflows';
  if (active !== undefined) {
    url += `?active=${active}`;
  }
  
  return await fastAPIClient.request(url, {
    method: 'GET',
  });
}

async function handleN8nWorkflowGet(credentials, args) {
  const { workflow_id } = args;
  return await fastAPIClient.n8nGetWorkflow(workflow_id);
}

async function handleN8nWorkflowCreate(credentials, args) {
  const { name, nodes, connections, active = false } = args;
  
  return await fastAPIClient.request('/gateway/n8n/api/v1/workflows', {
    method: 'POST',
    body: JSON.stringify({
      name,
      nodes,
      connections,
      active,
    }),
  });
}

async function handleN8nWorkflowUpdate(credentials, args) {
  const { workflow_id, name, nodes, connections, active } = args;
  
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (nodes !== undefined) updateData.nodes = nodes;
  if (connections !== undefined) updateData.connections = connections;
  if (active !== undefined) updateData.active = active;
  
  return await fastAPIClient.request(`/gateway/n8n/api/v1/workflows/${workflow_id}`, {
    method: 'PATCH',
    body: JSON.stringify(updateData),
  });
}

async function handleN8nWorkflowDelete(credentials, args) {
  const { workflow_id } = args;
  
  return await fastAPIClient.request(`/gateway/n8n/api/v1/workflows/${workflow_id}`, {
    method: 'DELETE',
  });
}

async function handleN8nExecutionGetStatus(credentials, args) {
  const { execution_id } = args;
  return await fastAPIClient.n8nGetExecutionStatus(execution_id);
}

async function handleN8nExecutionList(credentials, args) {
  const { workflow_id, status, limit = 10 } = args;
  
  let url = '/gateway/n8n/api/v1/executions?';
  const params = [];
  
  if (workflow_id) params.push(`workflowId=${workflow_id}`);
  if (status) params.push(`status=${status}`);
  params.push(`limit=${limit}`);
  
  url += params.join('&');
  
  return await fastAPIClient.request(url, {
    method: 'GET',
  });
}

async function handleN8nExecutionDelete(credentials, args) {
  const { execution_id } = args;
  
  return await fastAPIClient.request(`/gateway/n8n/api/v1/executions/${execution_id}`, {
    method: 'DELETE',
  });
}

async function handleN8nCredentialList(credentials, args) {
  const { type } = args;
  
  let url = '/gateway/n8n/api/v1/credentials';
  if (type) {
    url += `?type=${type}`;
  }
  
  return await fastAPIClient.request(url, {
    method: 'GET',
  });
}

async function handleN8nCredentialCreate(credentials, args) {
  const { name, type, data } = args;
  
  return await fastAPIClient.request('/gateway/n8n/api/v1/credentials', {
    method: 'POST',
    body: JSON.stringify({
      name,
      type,
      data,
    }),
  });
}

async function handleN8nConnectionTest(credentials, args) {
  try {
    const result = await fastAPIClient.n8nListWorkflows();
    return {
      success: true,
      message: 'Connection successful',
      workflows: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection failed',
    };
  }
}

async function executeN8nTool(toolName, args, credentials) {
  const tools = {
    'n8n_handleN8nWorkflowTrigger': handleN8nWorkflowTrigger,
    'n8n_handleN8nWorkflowList': handleN8nWorkflowList,
    'n8n_handleN8nWorkflowGet': handleN8nWorkflowGet,
    'n8n_handleN8nWorkflowCreate': handleN8nWorkflowCreate,
    'n8n_handleN8nWorkflowUpdate': handleN8nWorkflowUpdate,
    'n8n_handleN8nWorkflowDelete': handleN8nWorkflowDelete,
    'n8n_handleN8nExecutionGetStatus': handleN8nExecutionGetStatus,
    'n8n_handleN8nExecutionList': handleN8nExecutionList,
    'n8n_handleN8nExecutionDelete': handleN8nExecutionDelete,
    'n8n_handleN8nCredentialList': handleN8nCredentialList,
    'n8n_handleN8nCredentialCreate': handleN8nCredentialCreate,
    'n8n_handleN8nConnectionTest': handleN8nConnectionTest,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeN8nTool };