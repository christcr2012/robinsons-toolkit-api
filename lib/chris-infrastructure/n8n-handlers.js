"use strict";
/**
 * N8N Handlers for Chris's Infrastructure
 *
 * Handler functions for all 12 N8N tools
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleN8nWorkflowTrigger = handleN8nWorkflowTrigger;
exports.handleN8nWorkflowList = handleN8nWorkflowList;
exports.handleN8nWorkflowGet = handleN8nWorkflowGet;
exports.handleN8nWorkflowCreate = handleN8nWorkflowCreate;
exports.handleN8nWorkflowUpdate = handleN8nWorkflowUpdate;
exports.handleN8nWorkflowDelete = handleN8nWorkflowDelete;
exports.handleN8nExecutionGetStatus = handleN8nExecutionGetStatus;
exports.handleN8nExecutionList = handleN8nExecutionList;
exports.handleN8nExecutionDelete = handleN8nExecutionDelete;
exports.handleN8nCredentialList = handleN8nCredentialList;
exports.handleN8nCredentialCreate = handleN8nCredentialCreate;
exports.handleN8nConnectionTest = handleN8nConnectionTest;
const fastapi_client_js_1 = require("./fastapi-client.js");
// ============================================================================
// Workflow Operations
// ============================================================================
async function handleN8nWorkflowTrigger(args) {
    const { workflow_id, data } = args;
    return await fastapi_client_js_1.fastAPIClient.n8nTriggerWorkflow(workflow_id, data);
}
async function handleN8nWorkflowList(args) {
    const { active } = args;
    let url = '/gateway/n8n/api/v1/workflows';
    if (active !== undefined) {
        url += `?active=${active}`;
    }
    return await fastapi_client_js_1.fastAPIClient.request(url, {
        method: 'GET',
    });
}
async function handleN8nWorkflowGet(args) {
    const { workflow_id } = args;
    return await fastapi_client_js_1.fastAPIClient.n8nGetWorkflow(workflow_id);
}
async function handleN8nWorkflowCreate(args) {
    const { name, nodes, connections, active = false } = args;
    return await fastapi_client_js_1.fastAPIClient.request('/gateway/n8n/api/v1/workflows', {
        method: 'POST',
        body: JSON.stringify({
            name,
            nodes,
            connections,
            active,
        }),
    });
}
async function handleN8nWorkflowUpdate(args) {
    const { workflow_id, name, nodes, connections, active } = args;
    const updateData = {};
    if (name !== undefined)
        updateData.name = name;
    if (nodes !== undefined)
        updateData.nodes = nodes;
    if (connections !== undefined)
        updateData.connections = connections;
    if (active !== undefined)
        updateData.active = active;
    return await fastapi_client_js_1.fastAPIClient.request(`/gateway/n8n/api/v1/workflows/${workflow_id}`, {
        method: 'PATCH',
        body: JSON.stringify(updateData),
    });
}
async function handleN8nWorkflowDelete(args) {
    const { workflow_id } = args;
    return await fastapi_client_js_1.fastAPIClient.request(`/gateway/n8n/api/v1/workflows/${workflow_id}`, {
        method: 'DELETE',
    });
}
// ============================================================================
// Execution Operations
// ============================================================================
async function handleN8nExecutionGetStatus(args) {
    const { execution_id } = args;
    return await fastapi_client_js_1.fastAPIClient.n8nGetExecutionStatus(execution_id);
}
async function handleN8nExecutionList(args) {
    const { workflow_id, status, limit = 10 } = args;
    let url = '/gateway/n8n/api/v1/executions?';
    const params = [];
    if (workflow_id)
        params.push(`workflowId=${workflow_id}`);
    if (status)
        params.push(`status=${status}`);
    params.push(`limit=${limit}`);
    url += params.join('&');
    return await fastapi_client_js_1.fastAPIClient.request(url, {
        method: 'GET',
    });
}
async function handleN8nExecutionDelete(args) {
    const { execution_id } = args;
    return await fastapi_client_js_1.fastAPIClient.request(`/gateway/n8n/api/v1/executions/${execution_id}`, {
        method: 'DELETE',
    });
}
// ============================================================================
// Credential Operations
// ============================================================================
async function handleN8nCredentialList(args) {
    const { type } = args;
    let url = '/gateway/n8n/api/v1/credentials';
    if (type) {
        url += `?type=${type}`;
    }
    return await fastapi_client_js_1.fastAPIClient.request(url, {
        method: 'GET',
    });
}
async function handleN8nCredentialCreate(args) {
    const { name, type, data } = args;
    return await fastapi_client_js_1.fastAPIClient.request('/gateway/n8n/api/v1/credentials', {
        method: 'POST',
        body: JSON.stringify({
            name,
            type,
            data,
        }),
    });
}
// ============================================================================
// Admin Operations
// ============================================================================
async function handleN8nConnectionTest(args) {
    try {
        const result = await fastapi_client_js_1.fastAPIClient.n8nListWorkflows();
        return {
            success: true,
            message: 'Connection successful',
            workflows: result,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Connection failed',
        };
    }
}
