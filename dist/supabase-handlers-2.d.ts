/**
 * Supabase Handler Functions - Part 2
 * Storage (25 tools) + Realtime (15 tools) + Edge Functions (15 tools) + Management API (10 tools) = 65 handlers
 */
export declare function supabaseStorageCreateBucket(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageGetBucket(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageListBuckets(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageEmptyBucket(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageDeleteBucket(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageUpdateBucket(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageUpload(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageDownload(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageList(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageMove(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageCopy(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageRemove(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageCreateSignedUrl(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageCreateSignedUrls(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageGetPublicUrl(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageUpdate(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageCreatePolicy(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageGetPolicy(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageListPolicies(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageUpdatePolicy(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseStorageDeletePolicy(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeChannel(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeSubscribe(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeUnsubscribe(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeRemoveChannel(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeTrackPresence(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeUntrackPresence(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeGetPresence(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeOnPresence(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeBroadcast(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeOnBroadcast(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeOnPostgresChanges(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeRemoveAllChannels(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseRealtimeGetChannels(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseFunctionsInvoke(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseFunctionsList(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseFunctionsGet(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseFunctionsCreate(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseFunctionsUpdate(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseFunctionsDelete(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseFunctionsGetLogs(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementCreateProject(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementListProjects(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementGetProject(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementUpdateProject(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementDeleteProject(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementCreateOrganization(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementListOrganizations(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementGetOrganization(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementUpdateOrganization(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseManagementDeleteOrganization(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=supabase-handlers-2.d.ts.map