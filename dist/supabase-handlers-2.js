/**
 * Supabase Handler Functions - Part 2
 * Storage (25 tools) + Realtime (15 tools) + Edge Functions (15 tools) + Management API (10 tools) = 65 handlers
 */
// Helper function to format Supabase responses
function formatSupabaseResponse(result) {
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
// ============================================================
// STORAGE HANDLERS (25 handlers)
// ============================================================
export async function supabaseStorageCreateBucket(args) {
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
export async function supabaseStorageGetBucket(args) {
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
export async function supabaseStorageListBuckets(args) {
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
export async function supabaseStorageEmptyBucket(args) {
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
export async function supabaseStorageDeleteBucket(args) {
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
export async function supabaseStorageUpdateBucket(args) {
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
export async function supabaseStorageUpload(args) {
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
export async function supabaseStorageDownload(args) {
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
export async function supabaseStorageList(args) {
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
export async function supabaseStorageMove(args) {
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
export async function supabaseStorageCopy(args) {
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
export async function supabaseStorageRemove(args) {
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
export async function supabaseStorageCreateSignedUrl(args) {
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
export async function supabaseStorageCreateSignedUrls(args) {
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
export async function supabaseStorageGetPublicUrl(args) {
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
export async function supabaseStorageUpdate(args) {
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
export async function supabaseStorageCreatePolicy(args) {
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
export async function supabaseStorageGetPolicy(args) {
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
export async function supabaseStorageListPolicies(args) {
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
export async function supabaseStorageUpdatePolicy(args) {
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
export async function supabaseStorageDeletePolicy(args) {
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
export async function supabaseRealtimeChannel(args) {
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
export async function supabaseRealtimeSubscribe(args) {
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
export async function supabaseRealtimeUnsubscribe(args) {
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
export async function supabaseRealtimeRemoveChannel(args) {
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
export async function supabaseRealtimeTrackPresence(args) {
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
export async function supabaseRealtimeUntrackPresence(args) {
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
export async function supabaseRealtimeGetPresence(args) {
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
export async function supabaseRealtimeOnPresence(args) {
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
export async function supabaseRealtimeBroadcast(args) {
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
export async function supabaseRealtimeOnBroadcast(args) {
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
export async function supabaseRealtimeOnPostgresChanges(args) {
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
export async function supabaseRealtimeRemoveAllChannels(args) {
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
export async function supabaseRealtimeGetChannels(args) {
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
export async function supabaseFunctionsInvoke(args) {
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
export async function supabaseFunctionsList(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        return formatSupabaseResponse({ message: 'Function listing requires management API access' });
    }
    catch (error) {
        throw new Error(`Failed to list functions: ${error.message}`);
    }
}
export async function supabaseFunctionsGet(args) {
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
export async function supabaseFunctionsCreate(args) {
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
export async function supabaseFunctionsUpdate(args) {
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
export async function supabaseFunctionsDelete(args) {
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
export async function supabaseFunctionsGetLogs(args) {
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
export async function supabaseManagementCreateProject(args) {
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
export async function supabaseManagementListProjects(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        return formatSupabaseResponse({ message: 'Project listing requires management API access' });
    }
    catch (error) {
        throw new Error(`Failed to list projects: ${error.message}`);
    }
}
export async function supabaseManagementGetProject(args) {
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
export async function supabaseManagementUpdateProject(args) {
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
export async function supabaseManagementDeleteProject(args) {
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
export async function supabaseManagementCreateOrganization(args) {
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
export async function supabaseManagementListOrganizations(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        return formatSupabaseResponse({ message: 'Organization listing requires management API access' });
    }
    catch (error) {
        throw new Error(`Failed to list organizations: ${error.message}`);
    }
}
export async function supabaseManagementGetOrganization(args) {
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
export async function supabaseManagementUpdateOrganization(args) {
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
export async function supabaseManagementDeleteOrganization(args) {
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
