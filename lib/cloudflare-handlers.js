"use strict";
/**
 * Cloudflare Handler Functions Part 1
 * Zones (DNS & Domain Management) - 30 handlers
 *
 * Note: Cloudflare SDK uses a different pattern than other integrations.
 * The 'cloudflare' package exports a Cloudflare class that needs to be instantiated.
 * Handlers use this.cloudflareClient which is initialized in index.ts constructor.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudflareListZones = cloudflareListZones;
exports.cloudflareGetZone = cloudflareGetZone;
exports.cloudflareCreateZone = cloudflareCreateZone;
exports.cloudflareDeleteZone = cloudflareDeleteZone;
exports.cloudflarePurgeCache = cloudflarePurgeCache;
exports.cloudflareListDnsRecords = cloudflareListDnsRecords;
exports.cloudflareGetDnsRecord = cloudflareGetDnsRecord;
exports.cloudflareCreateDnsRecord = cloudflareCreateDnsRecord;
exports.cloudflareUpdateDnsRecord = cloudflareUpdateDnsRecord;
exports.cloudflareDeleteDnsRecord = cloudflareDeleteDnsRecord;
exports.cloudflareGetZoneSettings = cloudflareGetZoneSettings;
exports.cloudflareUpdateZoneSetting = cloudflareUpdateZoneSetting;
exports.cloudflareGetSslSetting = cloudflareGetSslSetting;
exports.cloudflareUpdateSslSetting = cloudflareUpdateSslSetting;
exports.cloudflareListFirewallRules = cloudflareListFirewallRules;
exports.cloudflareCreateFirewallRule = cloudflareCreateFirewallRule;
exports.cloudflareUpdateFirewallRule = cloudflareUpdateFirewallRule;
exports.cloudflareDeleteFirewallRule = cloudflareDeleteFirewallRule;
exports.cloudflareListPageRules = cloudflareListPageRules;
exports.cloudflareCreatePageRule = cloudflareCreatePageRule;
exports.cloudflareUpdatePageRule = cloudflareUpdatePageRule;
exports.cloudflareDeletePageRule = cloudflareDeletePageRule;
// Helper function to format Cloudflare responses
function formatCloudflareResponse(result) {
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
// ============================================================
// ZONES (DNS & Domain Management) - 30 handlers
// ============================================================
async function cloudflareListZones(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { name, status, page, perPage } = args;
        const zones = await this.cloudflareClient.zones.list({ name, status, page, per_page: perPage });
        return formatCloudflareResponse(zones);
    }
    catch (error) {
        throw new Error(`Failed to list zones: ${error.message}`);
    }
}
async function cloudflareGetZone(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId } = args;
        const zone = await this.cloudflareClient.zones.get(zoneId);
        return formatCloudflareResponse(zone);
    }
    catch (error) {
        throw new Error(`Failed to get zone: ${error.message}`);
    }
}
async function cloudflareCreateZone(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { name, account, jumpStart, type } = args;
        const zone = await this.cloudflareClient.zones.create({ name, account, jump_start: jumpStart, type });
        return formatCloudflareResponse(zone);
    }
    catch (error) {
        throw new Error(`Failed to create zone: ${error.message}`);
    }
}
async function cloudflareDeleteZone(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId } = args;
        await this.cloudflareClient.zones.del(zoneId);
        return formatCloudflareResponse({ zoneId, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete zone: ${error.message}`);
    }
}
async function cloudflarePurgeCache(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, purgeEverything, files, tags, hosts } = args;
        const result = await this.cloudflareClient.zones.purgeCache(zoneId, {
            purge_everything: purgeEverything,
            files,
            tags,
            hosts,
        });
        return formatCloudflareResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to purge cache: ${error.message}`);
    }
}
async function cloudflareListDnsRecords(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
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
    }
    catch (error) {
        throw new Error(`Failed to list DNS records: ${error.message}`);
    }
}
async function cloudflareGetDnsRecord(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, recordId } = args;
        const record = await this.cloudflareClient.dnsRecords.read(zoneId, recordId);
        return formatCloudflareResponse(record);
    }
    catch (error) {
        throw new Error(`Failed to get DNS record: ${error.message}`);
    }
}
async function cloudflareCreateDnsRecord(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
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
    }
    catch (error) {
        throw new Error(`Failed to create DNS record: ${error.message}`);
    }
}
async function cloudflareUpdateDnsRecord(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
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
    }
    catch (error) {
        throw new Error(`Failed to update DNS record: ${error.message}`);
    }
}
async function cloudflareDeleteDnsRecord(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, recordId } = args;
        await this.cloudflareClient.dnsRecords.del(zoneId, recordId);
        return formatCloudflareResponse({ zoneId, recordId, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete DNS record: ${error.message}`);
    }
}
async function cloudflareGetZoneSettings(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId } = args;
        const settings = await this.cloudflareClient.zoneSettings.browse(zoneId);
        return formatCloudflareResponse(settings);
    }
    catch (error) {
        throw new Error(`Failed to get zone settings: ${error.message}`);
    }
}
async function cloudflareUpdateZoneSetting(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, setting, value } = args;
        const result = await this.cloudflareClient.zoneSettings.edit(zoneId, setting, { value });
        return formatCloudflareResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to update zone setting: ${error.message}`);
    }
}
async function cloudflareGetSslSetting(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId } = args;
        const setting = await this.cloudflareClient.zoneSettings.read(zoneId, 'ssl');
        return formatCloudflareResponse(setting);
    }
    catch (error) {
        throw new Error(`Failed to get SSL setting: ${error.message}`);
    }
}
async function cloudflareUpdateSslSetting(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, value } = args;
        const result = await this.cloudflareClient.zoneSettings.edit(zoneId, 'ssl', { value });
        return formatCloudflareResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to update SSL setting: ${error.message}`);
    }
}
async function cloudflareListFirewallRules(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, page, perPage } = args;
        const rules = await this.cloudflareClient.firewallRules.browse(zoneId, { page, per_page: perPage });
        return formatCloudflareResponse(rules);
    }
    catch (error) {
        throw new Error(`Failed to list firewall rules: ${error.message}`);
    }
}
async function cloudflareCreateFirewallRule(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, filter, action, description, priority } = args;
        const rule = await this.cloudflareClient.firewallRules.add(zoneId, {
            filter,
            action,
            description,
            priority,
        });
        return formatCloudflareResponse(rule);
    }
    catch (error) {
        throw new Error(`Failed to create firewall rule: ${error.message}`);
    }
}
async function cloudflareUpdateFirewallRule(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, ruleId, filter, action, description } = args;
        const rule = await this.cloudflareClient.firewallRules.edit(zoneId, ruleId, {
            filter,
            action,
            description,
        });
        return formatCloudflareResponse(rule);
    }
    catch (error) {
        throw new Error(`Failed to update firewall rule: ${error.message}`);
    }
}
async function cloudflareDeleteFirewallRule(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, ruleId } = args;
        await this.cloudflareClient.firewallRules.del(zoneId, ruleId);
        return formatCloudflareResponse({ zoneId, ruleId, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete firewall rule: ${error.message}`);
    }
}
async function cloudflareListPageRules(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId } = args;
        const rules = await this.cloudflareClient.pageRules.browse(zoneId);
        return formatCloudflareResponse(rules);
    }
    catch (error) {
        throw new Error(`Failed to list page rules: ${error.message}`);
    }
}
async function cloudflareCreatePageRule(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, targets, actions, priority, status } = args;
        const rule = await this.cloudflareClient.pageRules.add(zoneId, {
            targets,
            actions,
            priority,
            status,
        });
        return formatCloudflareResponse(rule);
    }
    catch (error) {
        throw new Error(`Failed to create page rule: ${error.message}`);
    }
}
async function cloudflareUpdatePageRule(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, ruleId, targets, actions, status } = args;
        const rule = await this.cloudflareClient.pageRules.edit(zoneId, ruleId, {
            targets,
            actions,
            status,
        });
        return formatCloudflareResponse(rule);
    }
    catch (error) {
        throw new Error(`Failed to update page rule: ${error.message}`);
    }
}
async function cloudflareDeletePageRule(args) {
    if (!this.cloudflareClient)
        throw new Error('Cloudflare client not initialized');
    try {
        const { zoneId, ruleId } = args;
        await this.cloudflareClient.pageRules.del(zoneId, ruleId);
        return formatCloudflareResponse({ zoneId, ruleId, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete page rule: ${error.message}`);
    }
}
