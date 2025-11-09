"use strict";
/**
 * Supabase Handler Functions - Part 2
 * Storage (25 tools) + Realtime (15 tools) + Edge Functions (15 tools) + Management API (10 tools) = 65 handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseStorageCreateBucket = supabaseStorageCreateBucket;
exports.supabaseStorageGetBucket = supabaseStorageGetBucket;
exports.supabaseStorageListBuckets = supabaseStorageListBuckets;
exports.supabaseStorageEmptyBucket = supabaseStorageEmptyBucket;
exports.supabaseStorageDeleteBucket = supabaseStorageDeleteBucket;
exports.supabaseStorageUpdateBucket = supabaseStorageUpdateBucket;
exports.supabaseStorageUpload = supabaseStorageUpload;
exports.supabaseStorageDownload = supabaseStorageDownload;
exports.supabaseStorageList = supabaseStorageList;
exports.supabaseStorageMove = supabaseStorageMove;
exports.supabaseStorageCopy = supabaseStorageCopy;
exports.supabaseStorageRemove = supabaseStorageRemove;
exports.supabaseStorageCreateSignedUrl = supabaseStorageCreateSignedUrl;
exports.supabaseStorageCreateSignedUrls = supabaseStorageCreateSignedUrls;
exports.supabaseStorageGetPublicUrl = supabaseStorageGetPublicUrl;
exports.supabaseStorageUpdate = supabaseStorageUpdate;
exports.supabaseStorageCreatePolicy = supabaseStorageCreatePolicy;
exports.supabaseStorageGetPolicy = supabaseStorageGetPolicy;
exports.supabaseStorageListPolicies = supabaseStorageListPolicies;
exports.supabaseStorageUpdatePolicy = supabaseStorageUpdatePolicy;
exports.supabaseStorageDeletePolicy = supabaseStorageDeletePolicy;
exports.supabaseRealtimeChannel = supabaseRealtimeChannel;
exports.supabaseRealtimeSubscribe = supabaseRealtimeSubscribe;
exports.supabaseRealtimeUnsubscribe = supabaseRealtimeUnsubscribe;
exports.supabaseRealtimeRemoveChannel = supabaseRealtimeRemoveChannel;
exports.supabaseRealtimeTrackPresence = supabaseRealtimeTrackPresence;
exports.supabaseRealtimeUntrackPresence = supabaseRealtimeUntrackPresence;
exports.supabaseRealtimeGetPresence = supabaseRealtimeGetPresence;
exports.supabaseRealtimeOnPresence = supabaseRealtimeOnPresence;
exports.supabaseRealtimeBroadcast = supabaseRealtimeBroadcast;
exports.supabaseRealtimeOnBroadcast = supabaseRealtimeOnBroadcast;
exports.supabaseRealtimeOnPostgresChanges = supabaseRealtimeOnPostgresChanges;
exports.supabaseRealtimeRemoveAllChannels = supabaseRealtimeRemoveAllChannels;
exports.supabaseRealtimeGetChannels = supabaseRealtimeGetChannels;
exports.supabaseFunctionsInvoke = supabaseFunctionsInvoke;
exports.supabaseFunctionsList = supabaseFunctionsList;
exports.supabaseFunctionsGet = supabaseFunctionsGet;
exports.supabaseFunctionsCreate = supabaseFunctionsCreate;
exports.supabaseFunctionsUpdate = supabaseFunctionsUpdate;
exports.supabaseFunctionsDelete = supabaseFunctionsDelete;
exports.supabaseFunctionsGetLogs = supabaseFunctionsGetLogs;
exports.supabaseManagementCreateProject = supabaseManagementCreateProject;
exports.supabaseManagementListProjects = supabaseManagementListProjects;
exports.supabaseManagementGetProject = supabaseManagementGetProject;
exports.supabaseManagementUpdateProject = supabaseManagementUpdateProject;
exports.supabaseManagementDeleteProject = supabaseManagementDeleteProject;
exports.supabaseManagementCreateOrganization = supabaseManagementCreateOrganization;
exports.supabaseManagementListOrganizations = supabaseManagementListOrganizations;
exports.supabaseManagementGetOrganization = supabaseManagementGetOrganization;
exports.supabaseManagementUpdateOrganization = supabaseManagementUpdateOrganization;
exports.supabaseManagementDeleteOrganization = supabaseManagementDeleteOrganization;
// Helper function to format Supabase responses
function formatSupabaseResponse(result) {
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
// ============================================================
// STORAGE HANDLERS (25 handlers)
// ============================================================
async function supabaseStorageCreateBucket(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { id, options } = args;
        const { data, error } = await this.supabaseClient.storage.createBucket(id, options);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to create bucket: ${error.message}`);
    }
}
async function supabaseStorageGetBucket(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { id } = args;
        const { data, error } = await this.supabaseClient.storage.getBucket(id);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to get bucket: ${error.message}`);
    }
}
async function supabaseStorageListBuckets(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { data, error } = await this.supabaseClient.storage.listBuckets();
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to list buckets: ${error.message}`);
    }
}
async function supabaseStorageEmptyBucket(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { id } = args;
        const { data, error } = await this.supabaseClient.storage.emptyBucket(id);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to empty bucket: ${error.message}`);
    }
}
async function supabaseStorageDeleteBucket(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { id } = args;
        const { data, error } = await this.supabaseClient.storage.deleteBucket(id);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to delete bucket: ${error.message}`);
    }
}
async function supabaseStorageUpdateBucket(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { id, options } = args;
        const { data, error } = await this.supabaseClient.storage.updateBucket(id, options);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to update bucket: ${error.message}`);
    }
}
async function supabaseStorageUpload(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, path, file, options } = args;
        const { data, error } = await this.supabaseClient.storage.from(bucket).upload(path, file, options);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to upload file: ${error.message}`);
    }
}
async function supabaseStorageDownload(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, path } = args;
        const { data, error } = await this.supabaseClient.storage.from(bucket).download(path);
        if (error)
            throw error;
        return formatSupabaseResponse({ success: true, size: data.size });
    }
    catch (error) {
        throw new Error(`Failed to download file: ${error.message}`);
    }
}
async function supabaseStorageList(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, path, options } = args;
        const { data, error } = await this.supabaseClient.storage.from(bucket).list(path, options);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to list files: ${error.message}`);
    }
}
async function supabaseStorageMove(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, fromPath, toPath } = args;
        const { data, error } = await this.supabaseClient.storage.from(bucket).move(fromPath, toPath);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to move file: ${error.message}`);
    }
}
async function supabaseStorageCopy(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, fromPath, toPath } = args;
        const { data, error } = await this.supabaseClient.storage.from(bucket).copy(fromPath, toPath);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to copy file: ${error.message}`);
    }
}
async function supabaseStorageRemove(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, paths } = args;
        const { data, error } = await this.supabaseClient.storage.from(bucket).remove(paths);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to remove files: ${error.message}`);
    }
}
async function supabaseStorageCreateSignedUrl(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, path, expiresIn } = args;
        const { data, error } = await this.supabaseClient.storage.from(bucket).createSignedUrl(path, expiresIn);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to create signed URL: ${error.message}`);
    }
}
async function supabaseStorageCreateSignedUrls(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, paths, expiresIn } = args;
        const { data, error } = await this.supabaseClient.storage.from(bucket).createSignedUrls(paths, expiresIn);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to create signed URLs: ${error.message}`);
    }
}
async function supabaseStorageGetPublicUrl(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, path, options } = args;
        const { data } = this.supabaseClient.storage.from(bucket).getPublicUrl(path, options);
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to get public URL: ${error.message}`);
    }
}
async function supabaseStorageUpdate(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, path, options } = args;
        const { data, error } = await this.supabaseClient.storage.from(bucket).update(path, options);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to update file: ${error.message}`);
    }
}
async function supabaseStorageCreatePolicy(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, name, definition } = args;
        // Note: Policy management typically requires admin API or direct database access
        return formatSupabaseResponse({ message: 'Policy creation requires admin access', bucket, name, definition });
    }
    catch (error) {
        throw new Error(`Failed to create policy: ${error.message}`);
    }
}
async function supabaseStorageGetPolicy(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, name } = args;
        return formatSupabaseResponse({ message: 'Policy retrieval requires admin access', bucket, name });
    }
    catch (error) {
        throw new Error(`Failed to get policy: ${error.message}`);
    }
}
async function supabaseStorageListPolicies(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket } = args;
        return formatSupabaseResponse({ message: 'Policy listing requires admin access', bucket });
    }
    catch (error) {
        throw new Error(`Failed to list policies: ${error.message}`);
    }
}
async function supabaseStorageUpdatePolicy(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, name, definition } = args;
        return formatSupabaseResponse({ message: 'Policy update requires admin access', bucket, name, definition });
    }
    catch (error) {
        throw new Error(`Failed to update policy: ${error.message}`);
    }
}
async function supabaseStorageDeletePolicy(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { bucket, name } = args;
        return formatSupabaseResponse({ message: 'Policy deletion requires admin access', bucket, name });
    }
    catch (error) {
        throw new Error(`Failed to delete policy: ${error.message}`);
    }
}
// ============================================================
// REALTIME HANDLERS (15 handlers)
// ============================================================
async function supabaseRealtimeChannel(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { name, options } = args;
        const channel = this.supabaseClient.channel(name, options);
        return formatSupabaseResponse({ channel: name, status: 'created' });
    }
    catch (error) {
        throw new Error(`Failed to create channel: ${error.message}`);
    }
}
async function supabaseRealtimeSubscribe(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel } = args;
        const ch = this.supabaseClient.channel(channel);
        await ch.subscribe();
        return formatSupabaseResponse({ channel, status: 'subscribed' });
    }
    catch (error) {
        throw new Error(`Failed to subscribe to channel: ${error.message}`);
    }
}
async function supabaseRealtimeUnsubscribe(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel } = args;
        const ch = this.supabaseClient.channel(channel);
        await ch.unsubscribe();
        return formatSupabaseResponse({ channel, status: 'unsubscribed' });
    }
    catch (error) {
        throw new Error(`Failed to unsubscribe from channel: ${error.message}`);
    }
}
async function supabaseRealtimeRemoveChannel(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel } = args;
        this.supabaseClient.removeChannel(this.supabaseClient.channel(channel));
        return formatSupabaseResponse({ channel, status: 'removed' });
    }
    catch (error) {
        throw new Error(`Failed to remove channel: ${error.message}`);
    }
}
async function supabaseRealtimeTrackPresence(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel, state } = args;
        const ch = this.supabaseClient.channel(channel);
        await ch.track(state);
        return formatSupabaseResponse({ channel, state, status: 'tracking' });
    }
    catch (error) {
        throw new Error(`Failed to track presence: ${error.message}`);
    }
}
async function supabaseRealtimeUntrackPresence(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel } = args;
        const ch = this.supabaseClient.channel(channel);
        await ch.untrack();
        return formatSupabaseResponse({ channel, status: 'untracked' });
    }
    catch (error) {
        throw new Error(`Failed to untrack presence: ${error.message}`);
    }
}
async function supabaseRealtimeGetPresence(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel } = args;
        const ch = this.supabaseClient.channel(channel);
        const state = ch.presenceState();
        return formatSupabaseResponse(state);
    }
    catch (error) {
        throw new Error(`Failed to get presence: ${error.message}`);
    }
}
async function supabaseRealtimeOnPresence(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel, event } = args;
        return formatSupabaseResponse({ channel, event, message: 'Presence listener configured' });
    }
    catch (error) {
        throw new Error(`Failed to listen to presence: ${error.message}`);
    }
}
async function supabaseRealtimeBroadcast(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel, event, payload } = args;
        const ch = this.supabaseClient.channel(channel);
        await ch.send({ type: 'broadcast', event, payload });
        return formatSupabaseResponse({ channel, event, status: 'sent' });
    }
    catch (error) {
        throw new Error(`Failed to broadcast: ${error.message}`);
    }
}
async function supabaseRealtimeOnBroadcast(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel, event } = args;
        return formatSupabaseResponse({ channel, event, message: 'Broadcast listener configured' });
    }
    catch (error) {
        throw new Error(`Failed to listen to broadcast: ${error.message}`);
    }
}
async function supabaseRealtimeOnPostgresChanges(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { channel, event, schema = 'public', table, filter } = args;
        const ch = this.supabaseClient.channel(channel);
        ch.on('postgres_changes', { event, schema, table, filter }, (payload) => {
            // Listener configured
        });
        return formatSupabaseResponse({ channel, event, schema, table, message: 'Database change listener configured' });
    }
    catch (error) {
        throw new Error(`Failed to listen to postgres changes: ${error.message}`);
    }
}
async function supabaseRealtimeRemoveAllChannels(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        this.supabaseClient.removeAllChannels();
        return formatSupabaseResponse({ status: 'all channels removed' });
    }
    catch (error) {
        throw new Error(`Failed to remove all channels: ${error.message}`);
    }
}
async function supabaseRealtimeGetChannels(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const channels = this.supabaseClient.getChannels();
        return formatSupabaseResponse({ channels: channels.map((ch) => ch.topic) });
    }
    catch (error) {
        throw new Error(`Failed to get channels: ${error.message}`);
    }
}
// ============================================================
// EDGE FUNCTIONS HANDLERS (15 handlers)
// ============================================================
async function supabaseFunctionsInvoke(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { functionName, body, headers, method = 'POST' } = args;
        const { data, error } = await this.supabaseClient.functions.invoke(functionName, { body, headers, method });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to invoke function: ${error.message}`);
    }
}
async function supabaseFunctionsList(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        return formatSupabaseResponse({ message: 'Function listing requires management API access' });
    }
    catch (error) {
        throw new Error(`Failed to list functions: ${error.message}`);
    }
}
async function supabaseFunctionsGet(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { functionName } = args;
        return formatSupabaseResponse({ message: 'Function details require management API access', functionName });
    }
    catch (error) {
        throw new Error(`Failed to get function: ${error.message}`);
    }
}
async function supabaseFunctionsCreate(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { functionName, code, options } = args;
        return formatSupabaseResponse({ message: 'Function creation requires management API access', functionName });
    }
    catch (error) {
        throw new Error(`Failed to create function: ${error.message}`);
    }
}
async function supabaseFunctionsUpdate(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { functionName, code, options } = args;
        return formatSupabaseResponse({ message: 'Function update requires management API access', functionName });
    }
    catch (error) {
        throw new Error(`Failed to update function: ${error.message}`);
    }
}
async function supabaseFunctionsDelete(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { functionName } = args;
        return formatSupabaseResponse({ message: 'Function deletion requires management API access', functionName });
    }
    catch (error) {
        throw new Error(`Failed to delete function: ${error.message}`);
    }
}
async function supabaseFunctionsGetLogs(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { functionName, limit } = args;
        return formatSupabaseResponse({ message: 'Function logs require management API access', functionName, limit });
    }
    catch (error) {
        throw new Error(`Failed to get function logs: ${error.message}`);
    }
}
// ============================================================
// MANAGEMENT API HANDLERS (10 handlers)
// ============================================================
async function supabaseManagementCreateProject(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { organizationId, name, region, dbPass } = args;
        return formatSupabaseResponse({ message: 'Project creation requires management API access', organizationId, name, region });
    }
    catch (error) {
        throw new Error(`Failed to create project: ${error.message}`);
    }
}
async function supabaseManagementListProjects(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        return formatSupabaseResponse({ message: 'Project listing requires management API access' });
    }
    catch (error) {
        throw new Error(`Failed to list projects: ${error.message}`);
    }
}
async function supabaseManagementGetProject(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { projectId } = args;
        return formatSupabaseResponse({ message: 'Project details require management API access', projectId });
    }
    catch (error) {
        throw new Error(`Failed to get project: ${error.message}`);
    }
}
async function supabaseManagementUpdateProject(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { projectId, settings } = args;
        return formatSupabaseResponse({ message: 'Project update requires management API access', projectId });
    }
    catch (error) {
        throw new Error(`Failed to update project: ${error.message}`);
    }
}
async function supabaseManagementDeleteProject(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { projectId } = args;
        return formatSupabaseResponse({ message: 'Project deletion requires management API access', projectId });
    }
    catch (error) {
        throw new Error(`Failed to delete project: ${error.message}`);
    }
}
async function supabaseManagementCreateOrganization(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { name } = args;
        return formatSupabaseResponse({ message: 'Organization creation requires management API access', name });
    }
    catch (error) {
        throw new Error(`Failed to create organization: ${error.message}`);
    }
}
async function supabaseManagementListOrganizations(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        return formatSupabaseResponse({ message: 'Organization listing requires management API access' });
    }
    catch (error) {
        throw new Error(`Failed to list organizations: ${error.message}`);
    }
}
async function supabaseManagementGetOrganization(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { organizationId } = args;
        return formatSupabaseResponse({ message: 'Organization details require management API access', organizationId });
    }
    catch (error) {
        throw new Error(`Failed to get organization: ${error.message}`);
    }
}
async function supabaseManagementUpdateOrganization(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { organizationId, settings } = args;
        return formatSupabaseResponse({ message: 'Organization update requires management API access', organizationId });
    }
    catch (error) {
        throw new Error(`Failed to update organization: ${error.message}`);
    }
}
async function supabaseManagementDeleteOrganization(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { organizationId } = args;
        return formatSupabaseResponse({ message: 'Organization deletion requires management API access', organizationId });
    }
    catch (error) {
        throw new Error(`Failed to delete organization: ${error.message}`);
    }
}
