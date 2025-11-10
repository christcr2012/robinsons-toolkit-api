/**
 * VERCEL Integration - Pure JavaScript
 * NO MCP dependencies
 */

async function vercelFetch(credentials, path, options = {}) {
  const url = path.startsWith('http') ? path : 'https://api.vercel.com' + path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function vercelFetch(credentials, args) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vercel API error (${response.status}): ${errorText}`);
    }

    return response.json();
}

async function listProjects(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v9/projects?${params}`);
    return this.formatResponse(data);
}

async function getProject(credentials, args) {
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`);
    return this.formatResponse(data);
}

async function createProject(credentials, args) {
    const data = await this.vercelFetch(`/v9/projects`, {
      method: "POST",
      body: JSON.stringify(args),
    });
    return this.formatResponse(data);
}

async function updateProject(credentials, args) {
    const { projectId, ...updates } = args;
    const data = await this.vercelFetch(`/v9/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return this.formatResponse(data);
}

async function deleteProject(credentials, args) {
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function listDeployments(credentials, args) {
    const params = new URLSearchParams();
    if (args.limit) params.append("limit", args.limit.toString());
    if (args.state) params.append("state", args.state);
    const data = await this.vercelFetch(
      `/v6/deployments?projectId=${args.projectId}&${params}`
    );
    return this.formatResponse(data);
}

async function getDeployment(credentials, args) {
    const data = await this.vercelFetch(`/v13/deployments/${args.deploymentId}`);
    return this.formatResponse(data);
}

async function createDeployment(credentials, args) {
    const data = await this.vercelFetch(`/v13/deployments`, {
      method: "POST",
      body: JSON.stringify(args),
    });
    return this.formatResponse(data);
}

async function cancelDeployment(credentials, args) {
    const data = await this.vercelFetch(
      `/v12/deployments/${args.deploymentId}/cancel`,
      { method: "PATCH" }
    );
    return this.formatResponse(data);
}

async function deleteDeployment(credentials, args) {
    const data = await this.vercelFetch(`/v13/deployments/${args.deploymentId}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function getDeploymentEvents(credentials, args) {
    const data = await this.vercelFetch(
      `/v3/deployments/${args.deploymentId}/events`
    );
    return this.formatResponse(data);
}

async function redeploy(credentials, args) {
    const data = await this.vercelFetch(
      `/v13/deployments/${args.deploymentId}/redeploy`,
      {
        method: "POST",
        body: JSON.stringify({ target: args.target }),
      }
    );
    return this.formatResponse(data);
}

async function listEnvVars(credentials, args) {
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}/env`);
    return this.formatResponse(data);
}

async function createEnvVar(credentials, args) {
    const { projectId, ...envVar } = args;
    const data = await this.vercelFetch(`/v10/projects/${projectId}/env`, {
      method: "POST",
      body: JSON.stringify(envVar),
    });
    return this.formatResponse(data);
}

async function updateEnvVar(credentials, args) {
    const { projectId, envId, ...updates } = args;
    const data = await this.vercelFetch(`/v9/projects/${projectId}/env/${envId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return this.formatResponse(data);
}

async function deleteEnvVar(credentials, args) {
    const data = await this.vercelFetch(
      `/v9/projects/${args.projectId}/env/${args.envId}`,
      { method: "DELETE" }
    );
    return this.formatResponse(data);
}

async function bulkCreateEnvVars(credentials, args) {
    const { projectId, variables } = args;
    const results = [];
    for (const envVar of variables) {
      try {
        const data = await this.vercelFetch(`/v10/projects/${projectId}/env`, {
          method: "POST",
          body: JSON.stringify(envVar),
        });
        results.push({ success: true, key: envVar.key, data });
      } catch (error) {
        results.push({ success: false, key: envVar.key, error: error.message });
      }
    }
    return this.formatResponse({ results });
}

async function listDomains(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v5/domains?${params}`);
    return this.formatResponse(data);
}

async function getDomain(credentials, args) {
    const data = await this.vercelFetch(`/v5/domains/${args.domain}`);
    return this.formatResponse(data);
}

async function addDomain(credentials, args) {
    const data = await this.vercelFetch(`/v10/projects/${args.projectId}/domains`, {
      method: "POST",
      body: JSON.stringify({ name: args.domain }),
    });
    return this.formatResponse(data);
}

async function removeDomain(credentials, args) {
    const data = await this.vercelFetch(`/v9/domains/${args.domain}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function verifyDomain(credentials, args) {
    const data = await this.vercelFetch(`/v6/domains/${args.domain}/verify`, {
      method: "POST",
    });
    return this.formatResponse(data);
}

async function listDnsRecords(credentials, args) {
    const data = await this.vercelFetch(`/v4/domains/${args.domain}/records`);
    return this.formatResponse(data);
}

async function createDnsRecord(credentials, args) {
    const { domain, ...record } = args;
    const data = await this.vercelFetch(`/v2/domains/${domain}/records`, {
      method: "POST",
      body: JSON.stringify(record),
    });
    return this.formatResponse(data);
}

async function deleteDnsRecord(credentials, args) {
    const data = await this.vercelFetch(
      `/v2/domains/${args.domain}/records/${args.recordId}`,
      { method: "DELETE" }
    );
    return this.formatResponse(data);
}

async function listTeams(credentials, args) {
    const data = await this.vercelFetch(`/v2/teams`);
    return this.formatResponse(data);
}

async function getTeam(credentials, args) {
    const data = await this.vercelFetch(`/v2/teams/${args.teamId}`);
    return this.formatResponse(data);
}

async function listTeamMembers(credentials, args) {
    const data = await this.vercelFetch(`/v2/teams/${args.teamId}/members`);
    return this.formatResponse(data);
}

async function getDeploymentLogs(credentials, args) {
    const params = new URLSearchParams();
    if (args.limit) params.append("limit", args.limit.toString());
    if (args.since) params.append("since", args.since.toString());
    const data = await this.vercelFetch(
      `/v2/deployments/${args.deploymentId}/events?${params}`
    );
    return this.formatResponse(data);
}

async function getProjectAnalytics(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    const data = await this.vercelFetch(
      `/v1/projects/${args.projectId}/analytics?${params}`
    );
    return this.formatResponse(data);
}

async function listEdgeConfigs(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/edge-config?${params}`);
    return this.formatResponse(data);
}

async function createEdgeConfig(credentials, args) {
    const data = await this.vercelFetch(`/v1/edge-config`, {
      method: "POST",
      body: JSON.stringify(args),
    });
    return this.formatResponse(data);
}

async function getEdgeConfigItems(credentials, args) {
    const data = await this.vercelFetch(
      `/v1/edge-config/${args.edgeConfigId}/items`
    );
    return this.formatResponse(data);
}

async function updateEdgeConfigItems(credentials, args) {
    const { edgeConfigId, items } = args;
    const data = await this.vercelFetch(`/v1/edge-config/${edgeConfigId}/items`, {
      method: "PATCH",
      body: JSON.stringify({ items }),
    });
    return this.formatResponse(data);
}

async function listWebhooks(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/webhooks`);
    return this.formatResponse(data);
}

async function createWebhook(credentials, args) {
    const { projectId, ...webhook } = args;
    const data = await this.vercelFetch(`/v1/projects/${projectId}/webhooks`, {
      method: "POST",
      body: JSON.stringify(webhook),
    });
    return this.formatResponse(data);
}

async function deleteWebhook(credentials, args) {
    const data = await this.vercelFetch(`/v1/webhooks/${args.webhookId}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function listAliases(credentials, args) {
    const params = new URLSearchParams();
    if (args.projectId) params.append("projectId", args.projectId);
    if (args.limit) params.append("limit", args.limit.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await this.vercelFetch(`/v4/aliases${query}`);
    return this.formatResponse(data);
}

async function assignAlias(credentials, args) {
    const data = await this.vercelFetch(`/v2/deployments/${args.deploymentId}/aliases`, {
      method: "POST",
      body: JSON.stringify({ alias: args.alias }),
    });
    return this.formatResponse(data);
}

async function deleteAlias(credentials, args) {
    const data = await this.vercelFetch(`/v2/aliases/${args.aliasId}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function listSecrets(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await this.vercelFetch(`/v3/secrets${query}`);
    return this.formatResponse(data);
}

async function createSecret(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await this.vercelFetch(`/v3/secrets${query}`, {
      method: "POST",
      body: JSON.stringify({ name: args.name, value: args.value }),
    });
    return this.formatResponse(data);
}

async function deleteSecret(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await this.vercelFetch(`/v2/secrets/${args.nameOrId}${query}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function renameSecret(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await this.vercelFetch(`/v2/secrets/${args.nameOrId}${query}`, {
      method: "PATCH",
      body: JSON.stringify({ name: args.newName }),
    });
    return this.formatResponse(data);
}

async function listChecks(credentials, args) {
    const data = await this.vercelFetch(`/v1/deployments/${args.deploymentId}/checks`);
    return this.formatResponse(data);
}

async function createCheck(credentials, args) {
    const { deploymentId, ...check } = args;
    const data = await this.vercelFetch(`/v1/deployments/${deploymentId}/checks`, {
      method: "POST",
      body: JSON.stringify(check),
    });
    return this.formatResponse(data);
}

async function updateCheck(credentials, args) {
    const { deploymentId, checkId, ...update } = args;
    const data = await this.vercelFetch(`/v1/deployments/${deploymentId}/checks/${checkId}`, {
      method: "PATCH",
      body: JSON.stringify(update),
    });
    return this.formatResponse(data);
}

async function listDeploymentFiles(credentials, args) {
    const data = await this.vercelFetch(`/v6/deployments/${args.deploymentId}/files`);
    return this.formatResponse(data);
}

async function getDeploymentFile(credentials, args) {
    const data = await this.vercelFetch(`/v6/deployments/${args.deploymentId}/files/${args.fileId}`);
    return this.formatResponse(data);
}

async function blobList(credentials, args) {
    const params = new URLSearchParams();
    if (args.limit) params.append("limit", args.limit.toString());
    if (args.cursor) params.append("cursor", args.cursor);
    const data = await this.vercelFetch(`/v1/blob?${params}`);
    return this.formatResponse(data);
}

async function blobPut(credentials, args) {
    const data = await this.vercelFetch(`/v1/blob`, {
      method: "PUT",
      body: JSON.stringify({
        pathname: args.pathname,
        body: args.body,
        contentType: args.contentType,
      }),
    });
    return this.formatResponse(data);
}

async function blobDelete(credentials, args) {
    const data = await this.vercelFetch(`/v1/blob`, {
      method: "DELETE",
      body: JSON.stringify({ url: args.url }),
    });
    return this.formatResponse(data);
}

async function blobHead(credentials, args) {
    const data = await this.vercelFetch(`/v1/blob/head?url=${encodeURIComponent(args.url)}`);
    return this.formatResponse(data);
}

async function kvGet(credentials, args) {
    const data = await this.vercelFetch(`/v1/kv/${args.storeId}/get/${args.key}`);
    return this.formatResponse(data);
}

async function kvSet(credentials, args) {
    const body = { key: args.key, value: args.value };
    if (args.ex) body.ex = args.ex;
    const data = await this.vercelFetch(`/v1/kv/${args.storeId}/set`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return this.formatResponse(data);
}

async function kvDelete(credentials, args) {
    const data = await this.vercelFetch(`/v1/kv/${args.storeId}/delete/${args.key}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function kvListKeys(credentials, args) {
    const params = new URLSearchParams();
    if (args.pattern) params.append("pattern", args.pattern);
    if (args.cursor) params.append("cursor", args.cursor);
    const data = await this.vercelFetch(`/v1/kv/${args.storeId}/keys?${params}`);
    return this.formatResponse(data);
}

async function postgresListDatabases(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/postgres?${params}`);
    return this.formatResponse(data);
}

async function postgresCreateDatabase(credentials, args) {
    const data = await this.vercelFetch(`/v1/postgres`, {
      method: "POST",
      body: JSON.stringify({
        name: args.name,
        region: args.region,
      }),
    });
    return this.formatResponse(data);
}

async function postgresDeleteDatabase(credentials, args) {
    const data = await this.vercelFetch(`/v1/postgres/${args.databaseId}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function postgresGetConnectionString(credentials, args) {
    const data = await this.vercelFetch(`/v1/postgres/${args.databaseId}/connection-string`);
    return this.formatResponse(data);
}

async function listFirewallRules(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/security/firewall/${args.projectId}/rules?${params}`);
    return this.formatResponse(data);
}

async function createFirewallRule(credentials, args) {
    const data = await this.vercelFetch(`/v1/security/firewall/${args.projectId}/rules`, {
      method: "POST",
      body: JSON.stringify({
        name: args.name,
        action: args.action,
        condition: args.condition,
      }),
    });
    return this.formatResponse(data);
}

async function updateFirewallRule(credentials, args) {
    const body = {};
    if (args.name) body.name = args.name;
    if (args.action) body.action = args.action;
    if (args.enabled !== undefined) body.enabled = args.enabled;
    const data = await this.vercelFetch(`/v1/security/firewall/${args.projectId}/rules/${args.ruleId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return this.formatResponse(data);
}

async function deleteFirewallRule(credentials, args) {
    const data = await this.vercelFetch(`/v1/security/firewall/${args.projectId}/rules/${args.ruleId}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function getFirewallAnalytics(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    const data = await this.vercelFetch(`/v1/security/firewall/${args.projectId}/analytics?${params}`);
    return this.formatResponse(data);
}

async function listBlockedIps(credentials, args) {
    const data = await this.vercelFetch(`/v1/security/firewall/${args.projectId}/blocked-ips`);
    return this.formatResponse(data);
}

async function blockIp(credentials, args) {
    const data = await this.vercelFetch(`/v1/security/firewall/${args.projectId}/blocked-ips`, {
      method: "POST",
      body: JSON.stringify({
        ipAddress: args.ipAddress,
        notes: args.notes,
      }),
    });
    return this.formatResponse(data);
}

async function unblockIp(credentials, args) {
    const data = await this.vercelFetch(`/v1/security/firewall/${args.projectId}/blocked-ips/${encodeURIComponent(args.ipAddress)}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function enableAttackChallengeMode(credentials, args) {
    const data = await this.vercelFetch(`/v1/security/firewall/${args.projectId}/challenge-mode`, {
      method: "PATCH",
      body: JSON.stringify({ enabled: args.enabled }),
    });
    return this.formatResponse(data);
}

async function getSecurityEvents(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    if (args.limit) params.append("limit", args.limit.toString());
    const data = await this.vercelFetch(`/v1/security/events/${args.projectId}?${params}`);
    return this.formatResponse(data);
}

async function getRuntimeLogsStream(credentials, args) {
    const params = new URLSearchParams();
    if (args.follow) params.append("follow", "1");
    if (args.limit) params.append("limit", args.limit.toString());
    const data = await this.vercelFetch(`/v2/deployments/${args.deploymentId}/events?${params}`);
    return this.formatResponse(data);
}

async function getBuildLogs(credentials, args) {
    const data = await this.vercelFetch(`/v1/deployments/${args.deploymentId}/builds`);
    return this.formatResponse(data);
}

async function getErrorLogs(credentials, args) {
    const params = new URLSearchParams();
    params.append("type", "error");
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    const data = await this.vercelFetch(`/v2/deployments/${args.deploymentId}/events?${params}`);
    return this.formatResponse(data);
}

async function getBandwidthUsage(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    const data = await this.vercelFetch(`/v1/analytics/${args.projectId}/bandwidth?${params}`);
    return this.formatResponse(data);
}

async function getFunctionInvocations(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    const data = await this.vercelFetch(`/v1/analytics/${args.projectId}/functions?${params}`);
    return this.formatResponse(data);
}

async function getCacheMetrics(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    const data = await this.vercelFetch(`/v1/analytics/${args.projectId}/cache?${params}`);
    return this.formatResponse(data);
}

async function getTraces(credentials, args) {
    const params = new URLSearchParams();
    if (args.deploymentId) params.append("deploymentId", args.deploymentId);
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    const data = await this.vercelFetch(`/v1/traces/${args.projectId}?${params}`);
    return this.formatResponse(data);
}

async function getPerformanceInsights(credentials, args) {
    const data = await this.vercelFetch(`/v1/insights/${args.projectId}/performance`);
    return this.formatResponse(data);
}

async function getWebVitals(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    const data = await this.vercelFetch(`/v1/analytics/${args.projectId}/web-vitals?${params}`);
    return this.formatResponse(data);
}

async function getBillingSummary(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/billing/summary?${params}`);
    return this.formatResponse(data);
}

async function getUsageMetrics(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/billing/usage?${params}`);
    return this.formatResponse(data);
}

async function getInvoice(credentials, args) {
    const data = await this.vercelFetch(`/v1/billing/invoices/${args.invoiceId}`);
    return this.formatResponse(data);
}

async function listInvoices(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    if (args.limit) params.append("limit", args.limit.toString());
    const data = await this.vercelFetch(`/v1/billing/invoices?${params}`);
    return this.formatResponse(data);
}

async function getSpendingLimits(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/billing/limits?${params}`);
    return this.formatResponse(data);
}

async function updateSpendingLimits(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/billing/limits?${params}`, {
      method: "PATCH",
      body: JSON.stringify({ maxMonthlySpend: args.maxMonthlySpend }),
    });
    return this.formatResponse(data);
}

async function getCostBreakdown(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/billing/breakdown?${params}`);
    return this.formatResponse(data);
}

async function exportUsageReport(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    params.append("format", args.format);
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/billing/export?${params}`);
    return this.formatResponse(data);
}

async function listIntegrations(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/integrations?${params}`);
    return this.formatResponse(data);
}

async function getIntegration(credentials, args) {
    const data = await this.vercelFetch(`/v1/integrations/${args.integrationId}`);
    return this.formatResponse(data);
}

async function installIntegration(credentials, args) {
    const body = { integrationSlug: args.integrationSlug };
    if (args.teamId) body.teamId = args.teamId;
    if (args.configuration) body.configuration = args.configuration;
    const data = await this.vercelFetch(`/v1/integrations/install`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return this.formatResponse(data);
}

async function uninstallIntegration(credentials, args) {
    const data = await this.vercelFetch(`/v1/integrations/${args.integrationId}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function listIntegrationConfigurations(credentials, args) {
    const data = await this.vercelFetch(`/v1/integrations/${args.integrationId}/configurations`);
    return this.formatResponse(data);
}

async function updateIntegrationConfiguration(credentials, args) {
    const data = await this.vercelFetch(`/v1/integrations/${args.integrationId}/configurations/${args.configurationId}`, {
      method: "PATCH",
      body: JSON.stringify(args.configuration),
    });
    return this.formatResponse(data);
}

async function getIntegrationLogs(credentials, args) {
    const params = new URLSearchParams();
    if (args.limit) params.append("limit", args.limit.toString());
    const data = await this.vercelFetch(`/v1/integrations/${args.integrationId}/logs?${params}`);
    return this.formatResponse(data);
}

async function triggerIntegrationSync(credentials, args) {
    const data = await this.vercelFetch(`/v1/integrations/${args.integrationId}/sync`, {
      method: "POST",
    });
    return this.formatResponse(data);
}

async function listAuditLogs(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    if (args.limit) params.append("limit", args.limit.toString());
    const data = await this.vercelFetch(`/v1/audit-logs?${params}`);
    return this.formatResponse(data);
}

async function getAuditLog(credentials, args) {
    const data = await this.vercelFetch(`/v1/audit-logs/${args.logId}`);
    return this.formatResponse(data);
}

async function exportAuditLogs(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append("from", args.from.toString());
    if (args.to) params.append("to", args.to.toString());
    params.append("format", args.format);
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/audit-logs/export?${params}`);
    return this.formatResponse(data);
}

async function getComplianceReport(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/compliance/${args.reportType}?${params}`);
    return this.formatResponse(data);
}

async function listAccessEvents(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    if (args.userId) params.append("userId", args.userId);
    if (args.limit) params.append("limit", args.limit.toString());
    const data = await this.vercelFetch(`/v1/access-events?${params}`);
    return this.formatResponse(data);
}

async function listCronJobs(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/crons`);
    return this.formatResponse(data);
}

async function createCronJob(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/crons`, {
      method: "POST",
      body: JSON.stringify({
        path: args.path,
        schedule: args.schedule,
      }),
    });
    return this.formatResponse(data);
}

async function updateCronJob(credentials, args) {
    const body = {};
    if (args.schedule) body.schedule = args.schedule;
    if (args.enabled !== undefined) body.enabled = args.enabled;
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/crons/${args.cronId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return this.formatResponse(data);
}

async function deleteCronJob(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/crons/${args.cronId}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function triggerCronJob(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/crons/${args.cronId}/trigger`, {
      method: "POST",
    });
    return this.formatResponse(data);
}

async function listRedirects(credentials, args) {
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`);
    // Redirects are part of project configuration
    return this.formatResponse(data.redirects || []);
}

async function createRedirect(credentials, args) {
    // Get current project config
    const project = await this.vercelFetch(`/v9/projects/${args.projectId}`);
    const redirects = project.redirects || [];
    redirects.push({
      source: args.source,
      destination: args.destination,
      permanent: args.permanent || false,
    });
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`, {
      method: "PATCH",
      body: JSON.stringify({ redirects }),
    });
    return this.formatResponse(data);
}

async function deleteRedirect(credentials, args) {
    // Get current project config
    const project = await this.vercelFetch(`/v9/projects/${args.projectId}`);
    const redirects = (project.redirects || []).filter((_, i) => i.toString() !== args.redirectId);
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`, {
      method: "PATCH",
      body: JSON.stringify({ redirects }),
    });
    return this.formatResponse(data);
}

async function listCustomHeaders(credentials, args) {
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`);
    // Headers are part of project configuration
    return this.formatResponse(data.headers || []);
}

async function createCustomHeader(credentials, args) {
    // Get current project config
    const project = await this.vercelFetch(`/v9/projects/${args.projectId}`);
    const headers = project.headers || [];
    headers.push({
      source: args.source,
      headers: args.headers,
    });
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`, {
      method: "PATCH",
      body: JSON.stringify({ headers }),
    });
    return this.formatResponse(data);
}

async function deleteCustomHeader(credentials, args) {
    // Get current project config
    const project = await this.vercelFetch(`/v9/projects/${args.projectId}`);
    const headers = (project.headers || []).filter((_, i) => i.toString() !== args.headerId);
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`, {
      method: "PATCH",
      body: JSON.stringify({ headers }),
    });
    return this.formatResponse(data);
}

async function listComments(credentials, args) {
    const data = await this.vercelFetch(`/v1/deployments/${args.deploymentId}/comments`);
    return this.formatResponse(data);
}

async function createComment(credentials, args) {
    const body = { text: args.text };
    if (args.path) body.path = args.path;
    const data = await this.vercelFetch(`/v1/deployments/${args.deploymentId}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return this.formatResponse(data);
}

async function updateComment(credentials, args) {
    const data = await this.vercelFetch(`/v1/comments/${args.commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ text: args.text }),
    });
    return this.formatResponse(data);
}

async function deleteComment(credentials, args) {
    const data = await this.vercelFetch(`/v1/comments/${args.commentId}`, {
      method: "DELETE",
    });
    return this.formatResponse(data);
}

async function resolveComment(credentials, args) {
    const data = await this.vercelFetch(`/v1/comments/${args.commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ resolved: args.resolved }),
    });
    return this.formatResponse(data);
}

async function listGitRepositories(credentials, args) {
    const params = new URLSearchParams();
    if (args.teamId) params.append("teamId", args.teamId);
    const data = await this.vercelFetch(`/v1/git/repositories?${params}`);
    return this.formatResponse(data);
}

async function connectGitRepository(credentials, args) {
    const body = {
      type: args.type,
      repo: args.repo,
    };
    if (args.projectId) body.projectId = args.projectId;
    const data = await this.vercelFetch(`/v1/git/repositories`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return this.formatResponse(data);
}

async function disconnectGitRepository(credentials, args) {
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`, {
      method: "PATCH",
      body: JSON.stringify({ link: null }),
    });
    return this.formatResponse(data);
}

async function syncGitRepository(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/git/sync`, {
      method: "POST",
    });
    return this.formatResponse(data);
}

async function getGitIntegrationStatus(credentials, args) {
    const data = await this.vercelFetch(`/v9/projects/${args.projectId}`);
    return this.formatResponse({
      connected: !!data.link,
      link: data.link,
    });
}

async function listMiddleware(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/middleware`);
    return this.formatResponse(data);
}

async function getMiddlewareLogs(credentials, args) {
    const params = new URLSearchParams();
    if (args.deploymentId) params.append('deploymentId', args.deploymentId);
    if (args.limit) params.append('limit', args.limit.toString());
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/middleware/logs?${params}`);
    return this.formatResponse(data);
}

async function getMiddlewareMetrics(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append('from', args.from);
    if (args.to) params.append('to', args.to);
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/middleware/metrics?${params}`);
    return this.formatResponse(data);
}

async function testMiddleware(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/middleware/test`, {
      method: 'POST',
      body: JSON.stringify({ code: args.code, testRequest: args.testRequest })
    });
    return this.formatResponse(data);
}

async function deployMiddleware(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/middleware`, {
      method: 'POST',
      body: JSON.stringify({ code: args.code, config: args.config })
    });
    return this.formatResponse(data);
}

async function getDeploymentHealth(credentials, args) {
    const data = await this.vercelFetch(`/v1/deployments/${args.deploymentId}/health`);
    return this.formatResponse(data);
}

async function getErrorRate(credentials, args) {
    const params = new URLSearchParams();
    if (args.deploymentId) params.append('deploymentId', args.deploymentId);
    if (args.from) params.append('from', args.from);
    if (args.to) params.append('to', args.to);
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/metrics/errors?${params}`);
    return this.formatResponse(data);
}

async function getResponseTime(credentials, args) {
    const params = new URLSearchParams();
    if (args.deploymentId) params.append('deploymentId', args.deploymentId);
    if (args.from) params.append('from', args.from);
    if (args.to) params.append('to', args.to);
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/metrics/response-time?${params}`);
    return this.formatResponse(data);
}

async function getUptimeMetrics(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append('from', args.from);
    if (args.to) params.append('to', args.to);
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/metrics/uptime?${params}`);
    return this.formatResponse(data);
}

async function createAlert(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/alerts`, {
      method: 'POST',
      body: JSON.stringify({
        name: args.name,
        metric: args.metric,
        threshold: args.threshold,
        webhookUrl: args.webhookUrl
      })
    });
    return this.formatResponse(data);
}

async function inviteTeamMember(credentials, args) {
    const data = await this.vercelFetch(`/v1/teams/${args.teamId}/members`, {
      method: 'POST',
      body: JSON.stringify({ email: args.email, role: args.role || 'MEMBER' })
    });
    return this.formatResponse(data);
}

async function removeTeamMember(credentials, args) {
    const data = await this.vercelFetch(`/v1/teams/${args.teamId}/members/${args.userId}`, {
      method: 'DELETE'
    });
    return this.formatResponse(data);
}

async function updateTeamMemberRole(credentials, args) {
    const data = await this.vercelFetch(`/v1/teams/${args.teamId}/members/${args.userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ role: args.role })
    });
    return this.formatResponse(data);
}

async function getTeamActivity(credentials, args) {
    const params = new URLSearchParams();
    if (args.limit) params.append('limit', args.limit.toString());
    if (args.from) params.append('from', args.from);
    if (args.to) params.append('to', args.to);
    const data = await this.vercelFetch(`/v1/teams/${args.teamId}/activity?${params}`);
    return this.formatResponse(data);
}

async function getTeamUsage(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append('from', args.from);
    if (args.to) params.append('to', args.to);
    const data = await this.vercelFetch(`/v1/teams/${args.teamId}/usage?${params}`);
    return this.formatResponse(data);
}

async function promoteDeployment(credentials, args) {
    const data = await this.vercelFetch(`/v13/deployments/${args.deploymentId}/promote`, {
      method: 'POST'
    });
    return this.formatResponse(data);
}

async function rollbackDeployment(credentials, args) {
    const data = await this.vercelFetch(`/v13/deployments/${args.projectId}/rollback`, {
      method: 'POST',
      body: JSON.stringify({ targetDeploymentId: args.targetDeploymentId })
    });
    return this.formatResponse(data);
}

async function pauseDeployment(credentials, args) {
    const data = await this.vercelFetch(`/v1/deployments/${args.deploymentId}/pause`, {
      method: 'POST'
    });
    return this.formatResponse(data);
}

async function resumeDeployment(credentials, args) {
    const data = await this.vercelFetch(`/v1/deployments/${args.deploymentId}/resume`, {
      method: 'POST'
    });
    return this.formatResponse(data);
}

async function getDeploymentDiff(credentials, args) {
    const data = await this.vercelFetch(`/v1/deployments/diff?deployment1=${args.deploymentId1}&deployment2=${args.deploymentId2}`);
    return this.formatResponse(data);
}

async function getStorageUsage(credentials, args) {
    const params = args.teamId ? `?teamId=${args.teamId}` : '';
    const data = await this.vercelFetch(`/v1/storage/usage${params}`);
    return this.formatResponse(data);
}

async function optimizeStorage(credentials, args) {
    const params = args.teamId ? `?teamId=${args.teamId}` : '';
    const data = await this.vercelFetch(`/v1/storage/optimize${params}`);
    return this.formatResponse(data);
}

async function exportBlobData(credentials, args) {
    const data = await this.vercelFetch(`/v1/blob/${args.storeId}/export?format=${args.format || 'json'}`);
    return this.formatResponse(data);
}

async function importBlobData(credentials, args) {
    const data = await this.vercelFetch(`/v1/blob/${args.storeId}/import`, {
      method: 'POST',
      body: JSON.stringify({ data: args.data, format: args.format || 'json' })
    });
    return this.formatResponse(data);
}

async function cloneStorage(credentials, args) {
    const data = await this.vercelFetch(`/v1/storage/clone`, {
      method: 'POST',
      body: JSON.stringify({
        sourceStoreId: args.sourceStoreId,
        targetStoreId: args.targetStoreId
      })
    });
    return this.formatResponse(data);
}

async function scanDeploymentSecurity(credentials, args) {
    const data = await this.vercelFetch(`/v1/deployments/${args.deploymentId}/security-scan`, {
      method: 'POST'
    });
    return this.formatResponse(data);
}

async function getSecurityHeaders(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/security-headers`);
    return this.formatResponse(data);
}

async function updateSecurityHeaders(credentials, args) {
    const data = await this.vercelFetch(`/v1/projects/${args.projectId}/security-headers`, {
      method: 'PATCH',
      body: JSON.stringify({ headers: args.headers })
    });
    return this.formatResponse(data);
}

async function executeVercelTool(toolName, args, credentials) {
  const tools = {
    'vercel_vercelFetch': vercelFetch,
    'vercel_listProjects': listProjects,
    'vercel_getProject': getProject,
    'vercel_createProject': createProject,
    'vercel_updateProject': updateProject,
    'vercel_deleteProject': deleteProject,
    'vercel_listDeployments': listDeployments,
    'vercel_getDeployment': getDeployment,
    'vercel_createDeployment': createDeployment,
    'vercel_cancelDeployment': cancelDeployment,
    'vercel_deleteDeployment': deleteDeployment,
    'vercel_getDeploymentEvents': getDeploymentEvents,
    'vercel_redeploy': redeploy,
    'vercel_listEnvVars': listEnvVars,
    'vercel_createEnvVar': createEnvVar,
    'vercel_updateEnvVar': updateEnvVar,
    'vercel_deleteEnvVar': deleteEnvVar,
    'vercel_bulkCreateEnvVars': bulkCreateEnvVars,
    'vercel_listDomains': listDomains,
    'vercel_getDomain': getDomain,
    'vercel_addDomain': addDomain,
    'vercel_removeDomain': removeDomain,
    'vercel_verifyDomain': verifyDomain,
    'vercel_listDnsRecords': listDnsRecords,
    'vercel_createDnsRecord': createDnsRecord,
    'vercel_deleteDnsRecord': deleteDnsRecord,
    'vercel_listTeams': listTeams,
    'vercel_getTeam': getTeam,
    'vercel_listTeamMembers': listTeamMembers,
    'vercel_getDeploymentLogs': getDeploymentLogs,
    'vercel_getProjectAnalytics': getProjectAnalytics,
    'vercel_listEdgeConfigs': listEdgeConfigs,
    'vercel_createEdgeConfig': createEdgeConfig,
    'vercel_getEdgeConfigItems': getEdgeConfigItems,
    'vercel_updateEdgeConfigItems': updateEdgeConfigItems,
    'vercel_listWebhooks': listWebhooks,
    'vercel_createWebhook': createWebhook,
    'vercel_deleteWebhook': deleteWebhook,
    'vercel_listAliases': listAliases,
    'vercel_assignAlias': assignAlias,
    'vercel_deleteAlias': deleteAlias,
    'vercel_listSecrets': listSecrets,
    'vercel_createSecret': createSecret,
    'vercel_deleteSecret': deleteSecret,
    'vercel_renameSecret': renameSecret,
    'vercel_listChecks': listChecks,
    'vercel_createCheck': createCheck,
    'vercel_updateCheck': updateCheck,
    'vercel_listDeploymentFiles': listDeploymentFiles,
    'vercel_getDeploymentFile': getDeploymentFile,
    'vercel_blobList': blobList,
    'vercel_blobPut': blobPut,
    'vercel_blobDelete': blobDelete,
    'vercel_blobHead': blobHead,
    'vercel_kvGet': kvGet,
    'vercel_kvSet': kvSet,
    'vercel_kvDelete': kvDelete,
    'vercel_kvListKeys': kvListKeys,
    'vercel_postgresListDatabases': postgresListDatabases,
    'vercel_postgresCreateDatabase': postgresCreateDatabase,
    'vercel_postgresDeleteDatabase': postgresDeleteDatabase,
    'vercel_postgresGetConnectionString': postgresGetConnectionString,
    'vercel_listFirewallRules': listFirewallRules,
    'vercel_createFirewallRule': createFirewallRule,
    'vercel_updateFirewallRule': updateFirewallRule,
    'vercel_deleteFirewallRule': deleteFirewallRule,
    'vercel_getFirewallAnalytics': getFirewallAnalytics,
    'vercel_listBlockedIps': listBlockedIps,
    'vercel_blockIp': blockIp,
    'vercel_unblockIp': unblockIp,
    'vercel_enableAttackChallengeMode': enableAttackChallengeMode,
    'vercel_getSecurityEvents': getSecurityEvents,
    'vercel_getRuntimeLogsStream': getRuntimeLogsStream,
    'vercel_getBuildLogs': getBuildLogs,
    'vercel_getErrorLogs': getErrorLogs,
    'vercel_getBandwidthUsage': getBandwidthUsage,
    'vercel_getFunctionInvocations': getFunctionInvocations,
    'vercel_getCacheMetrics': getCacheMetrics,
    'vercel_getTraces': getTraces,
    'vercel_getPerformanceInsights': getPerformanceInsights,
    'vercel_getWebVitals': getWebVitals,
    'vercel_getBillingSummary': getBillingSummary,
    'vercel_getUsageMetrics': getUsageMetrics,
    'vercel_getInvoice': getInvoice,
    'vercel_listInvoices': listInvoices,
    'vercel_getSpendingLimits': getSpendingLimits,
    'vercel_updateSpendingLimits': updateSpendingLimits,
    'vercel_getCostBreakdown': getCostBreakdown,
    'vercel_exportUsageReport': exportUsageReport,
    'vercel_listIntegrations': listIntegrations,
    'vercel_getIntegration': getIntegration,
    'vercel_installIntegration': installIntegration,
    'vercel_uninstallIntegration': uninstallIntegration,
    'vercel_listIntegrationConfigurations': listIntegrationConfigurations,
    'vercel_updateIntegrationConfiguration': updateIntegrationConfiguration,
    'vercel_getIntegrationLogs': getIntegrationLogs,
    'vercel_triggerIntegrationSync': triggerIntegrationSync,
    'vercel_listAuditLogs': listAuditLogs,
    'vercel_getAuditLog': getAuditLog,
    'vercel_exportAuditLogs': exportAuditLogs,
    'vercel_getComplianceReport': getComplianceReport,
    'vercel_listAccessEvents': listAccessEvents,
    'vercel_listCronJobs': listCronJobs,
    'vercel_createCronJob': createCronJob,
    'vercel_updateCronJob': updateCronJob,
    'vercel_deleteCronJob': deleteCronJob,
    'vercel_triggerCronJob': triggerCronJob,
    'vercel_listRedirects': listRedirects,
    'vercel_createRedirect': createRedirect,
    'vercel_deleteRedirect': deleteRedirect,
    'vercel_listCustomHeaders': listCustomHeaders,
    'vercel_createCustomHeader': createCustomHeader,
    'vercel_deleteCustomHeader': deleteCustomHeader,
    'vercel_listComments': listComments,
    'vercel_createComment': createComment,
    'vercel_updateComment': updateComment,
    'vercel_deleteComment': deleteComment,
    'vercel_resolveComment': resolveComment,
    'vercel_listGitRepositories': listGitRepositories,
    'vercel_connectGitRepository': connectGitRepository,
    'vercel_disconnectGitRepository': disconnectGitRepository,
    'vercel_syncGitRepository': syncGitRepository,
    'vercel_getGitIntegrationStatus': getGitIntegrationStatus,
    'vercel_listMiddleware': listMiddleware,
    'vercel_getMiddlewareLogs': getMiddlewareLogs,
    'vercel_getMiddlewareMetrics': getMiddlewareMetrics,
    'vercel_testMiddleware': testMiddleware,
    'vercel_deployMiddleware': deployMiddleware,
    'vercel_getDeploymentHealth': getDeploymentHealth,
    'vercel_getErrorRate': getErrorRate,
    'vercel_getResponseTime': getResponseTime,
    'vercel_getUptimeMetrics': getUptimeMetrics,
    'vercel_createAlert': createAlert,
    'vercel_inviteTeamMember': inviteTeamMember,
    'vercel_removeTeamMember': removeTeamMember,
    'vercel_updateTeamMemberRole': updateTeamMemberRole,
    'vercel_getTeamActivity': getTeamActivity,
    'vercel_getTeamUsage': getTeamUsage,
    'vercel_promoteDeployment': promoteDeployment,
    'vercel_rollbackDeployment': rollbackDeployment,
    'vercel_pauseDeployment': pauseDeployment,
    'vercel_resumeDeployment': resumeDeployment,
    'vercel_getDeploymentDiff': getDeploymentDiff,
    'vercel_getStorageUsage': getStorageUsage,
    'vercel_optimizeStorage': optimizeStorage,
    'vercel_exportBlobData': exportBlobData,
    'vercel_importBlobData': importBlobData,
    'vercel_cloneStorage': cloneStorage,
    'vercel_scanDeploymentSecurity': scanDeploymentSecurity,
    'vercel_getSecurityHeaders': getSecurityHeaders,
    'vercel_updateSecurityHeaders': updateSecurityHeaders,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeVercelTool };