/** CLOUDFLARE Integration - Pure JavaScript */

async function cloudflareFetch(credentials, path, options = {}) {
  const url = path.startsWith('http') ? path : 'https://api.cloudflare.com/client/v4' + path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function listZones(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { name, status, page, perPage } = args;
    const zones = await this.cloudflareClient.zones.list({ name, status, page, per_page: perPage });
    return formatCloudflareResponse(zones);
  } catch (error) {
    throw new Error(`Failed to list zones: ${error.message}`);
  }
}

async function getZone(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId } = args;
    const zone = await this.cloudflareClient.zones.get(zoneId);
    return formatCloudflareResponse(zone);
  } catch (error) {
    throw new Error(`Failed to get zone: ${error.message}`);
  }
}

async function createZone(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { name, account, jumpStart, type } = args;
    const zone = await this.cloudflareClient.zones.create({ name, account, jump_start: jumpStart, type });
    return formatCloudflareResponse(zone);
  } catch (error) {
    throw new Error(`Failed to create zone: ${error.message}`);
  }
}

async function deleteZone(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId } = args;
    await this.cloudflareClient.zones.del(zoneId);
    return formatCloudflareResponse({ zoneId, status: 'deleted' });
  } catch (error) {
    throw new Error(`Failed to delete zone: ${error.message}`);
  }
}

async function purgeCache(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, purgeEverything, files, tags, hosts } = args;
    const result = await this.cloudflareClient.zones.purgeCache(zoneId, {
      purge_everything: purgeEverything,
      files,
      tags,
      hosts,
    });
    return formatCloudflareResponse(result);
  } catch (error) {
    throw new Error(`Failed to purge cache: ${error.message}`);
  }
}

async function listDnsRecords(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, type, name, content, page, perPage } = args;
    const records = await this.cloudflareClient.dnsRecords.browse(zoneId, {
      type,
      name,
      content,
      page,
      per_page: perPage,
    });
    return formatCloudflareResponse(records);
  } catch (error) {
    throw new Error(`Failed to list DNS records: ${error.message}`);
  }
}

async function getDnsRecord(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, recordId } = args;
    const record = await this.cloudflareClient.dnsRecords.read(zoneId, recordId);
    return formatCloudflareResponse(record);
  } catch (error) {
    throw new Error(`Failed to get DNS record: ${error.message}`);
  }
}

async function createDnsRecord(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, type, name, content, ttl, priority, proxied } = args;
    const record = await this.cloudflareClient.dnsRecords.add(zoneId, {
      type,
      name,
      content,
      ttl,
      priority,
      proxied,
    });
    return formatCloudflareResponse(record);
  } catch (error) {
    throw new Error(`Failed to create DNS record: ${error.message}`);
  }
}

async function updateDnsRecord(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, recordId, type, name, content, ttl, proxied } = args;
    const record = await this.cloudflareClient.dnsRecords.edit(zoneId, recordId, {
      type,
      name,
      content,
      ttl,
      proxied,
    });
    return formatCloudflareResponse(record);
  } catch (error) {
    throw new Error(`Failed to update DNS record: ${error.message}`);
  }
}

async function deleteDnsRecord(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, recordId } = args;
    await this.cloudflareClient.dnsRecords.del(zoneId, recordId);
    return formatCloudflareResponse({ zoneId, recordId, status: 'deleted' });
  } catch (error) {
    throw new Error(`Failed to delete DNS record: ${error.message}`);
  }
}

async function getZoneSettings(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId } = args;
    const settings = await this.cloudflareClient.zoneSettings.browse(zoneId);
    return formatCloudflareResponse(settings);
  } catch (error) {
    throw new Error(`Failed to get zone settings: ${error.message}`);
  }
}

async function updateZoneSetting(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, setting, value } = args;
    const result = await this.cloudflareClient.zoneSettings.edit(zoneId, setting, { value });
    return formatCloudflareResponse(result);
  } catch (error) {
    throw new Error(`Failed to update zone setting: ${error.message}`);
  }
}

async function getSslSetting(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId } = args;
    const setting = await this.cloudflareClient.zoneSettings.read(zoneId, 'ssl');
    return formatCloudflareResponse(setting);
  } catch (error) {
    throw new Error(`Failed to get SSL setting: ${error.message}`);
  }
}

async function updateSslSetting(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, value } = args;
    const result = await this.cloudflareClient.zoneSettings.edit(zoneId, 'ssl', { value });
    return formatCloudflareResponse(result);
  } catch (error) {
    throw new Error(`Failed to update SSL setting: ${error.message}`);
  }
}

async function listFirewallRules(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, page, perPage } = args;
    const rules = await this.cloudflareClient.firewallRules.browse(zoneId, { page, per_page: perPage });
    return formatCloudflareResponse(rules);
  } catch (error) {
    throw new Error(`Failed to list firewall rules: ${error.message}`);
  }
}

async function createFirewallRule(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, filter, action, description, priority } = args;
    const rule = await this.cloudflareClient.firewallRules.add(zoneId, {
      filter,
      action,
      description,
      priority,
    });
    return formatCloudflareResponse(rule);
  } catch (error) {
    throw new Error(`Failed to create firewall rule: ${error.message}`);
  }
}

async function updateFirewallRule(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, ruleId, filter, action, description } = args;
    const rule = await this.cloudflareClient.firewallRules.edit(zoneId, ruleId, {
      filter,
      action,
      description,
    });
    return formatCloudflareResponse(rule);
  } catch (error) {
    throw new Error(`Failed to update firewall rule: ${error.message}`);
  }
}

async function deleteFirewallRule(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, ruleId } = args;
    await this.cloudflareClient.firewallRules.del(zoneId, ruleId);
    return formatCloudflareResponse({ zoneId, ruleId, status: 'deleted' });
  } catch (error) {
    throw new Error(`Failed to delete firewall rule: ${error.message}`);
  }
}

async function listPageRules(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId } = args;
    const rules = await this.cloudflareClient.pageRules.browse(zoneId);
    return formatCloudflareResponse(rules);
  } catch (error) {
    throw new Error(`Failed to list page rules: ${error.message}`);
  }
}

async function createPageRule(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, targets, actions, priority, status } = args;
    const rule = await this.cloudflareClient.pageRules.add(zoneId, {
      targets,
      actions,
      priority,
      status,
    });
    return formatCloudflareResponse(rule);
  } catch (error) {
    throw new Error(`Failed to create page rule: ${error.message}`);
  }
}

async function updatePageRule(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, ruleId, targets, actions, status } = args;
    const rule = await this.cloudflareClient.pageRules.edit(zoneId, ruleId, {
      targets,
      actions,
      status,
    });
    return formatCloudflareResponse(rule);
  } catch (error) {
    throw new Error(`Failed to update page rule: ${error.message}`);
  }
}

async function deletePageRule(credentials, args) {
  if (!this.cloudflareClient) throw new Error('Cloudflare client not initialized');
  try {
    const { zoneId, ruleId } = args;
    await this.cloudflareClient.pageRules.del(zoneId, ruleId);
    return formatCloudflareResponse({ zoneId, ruleId, status: 'deleted' });
  } catch (error) {
    throw new Error(`Failed to delete page rule: ${error.message}`);
  }
}

async function executeCloudflareTool(toolName, args, credentials) {
  const tools = {
    'cloudflare_listZones': listZones,
    'cloudflare_getZone': getZone,
    'cloudflare_createZone': createZone,
    'cloudflare_deleteZone': deleteZone,
    'cloudflare_purgeCache': purgeCache,
    'cloudflare_listDnsRecords': listDnsRecords,
    'cloudflare_getDnsRecord': getDnsRecord,
    'cloudflare_createDnsRecord': createDnsRecord,
    'cloudflare_updateDnsRecord': updateDnsRecord,
    'cloudflare_deleteDnsRecord': deleteDnsRecord,
    'cloudflare_getZoneSettings': getZoneSettings,
    'cloudflare_updateZoneSetting': updateZoneSetting,
    'cloudflare_getSslSetting': getSslSetting,
    'cloudflare_updateSslSetting': updateSslSetting,
    'cloudflare_listFirewallRules': listFirewallRules,
    'cloudflare_createFirewallRule': createFirewallRule,
    'cloudflare_updateFirewallRule': updateFirewallRule,
    'cloudflare_deleteFirewallRule': deleteFirewallRule,
    'cloudflare_listPageRules': listPageRules,
    'cloudflare_createPageRule': createPageRule,
    'cloudflare_updatePageRule': updatePageRule,
    'cloudflare_deletePageRule': deletePageRule,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeCloudflareTool };