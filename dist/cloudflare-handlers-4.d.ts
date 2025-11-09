/**
 * Cloudflare Handler Functions Part 4
 * Pages (15 tools) + D1 (15 tools) + Queues (10 tools) + Durable Objects (10 tools) + Stream (15 tools)
 * Total: 65 handlers
 */
export declare function cloudflareListPagesProjects(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetPagesProject(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreatePagesProject(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeletePagesProject(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListPagesDeployments(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetPagesDeployment(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreatePagesDeployment(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeletePagesDeployment(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareRetryPagesDeployment(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareRollbackPagesDeployment(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetPagesDeploymentLogs(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListPagesDomains(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreatePagesDomain(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeletePagesDomain(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareVerifyPagesDomain(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListD1Databases(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateD1Database(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetD1Database(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteD1Database(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareQueryD1Database(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareExecuteD1Statement(this: any, args: any): Promise<any>;
export declare function cloudflareListD1Tables(this: any, args: any): Promise<any>;
export declare function cloudflareCreateD1Table(this: any, args: any): Promise<any>;
export declare function cloudflareDropD1Table(this: any, args: any): Promise<any>;
export declare function cloudflareInsertD1Row(this: any, args: any): Promise<any>;
export declare function cloudflareUpdateD1Row(this: any, args: any): Promise<any>;
export declare function cloudflareDeleteD1Row(this: any, args: any): Promise<any>;
export declare function cloudflareGetD1DatabaseSize(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareExportD1Database(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareImportD1Database(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListQueues(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateQueue(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetQueue(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteQueue(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareSendQueueMessage(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetQueueConsumers(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateQueueConsumer(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteQueueConsumer(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetQueueSettings(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUpdateQueueSettings(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListDurableObjects(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetDurableObject(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListDurableObjectInstances(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetDurableObjectInstance(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateDurableObjectInstance(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteDurableObjectInstance(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetDurableObjectAlarms(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareSetDurableObjectAlarm(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetDurableObjectStorage(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetDurableObjectMetrics(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListStreamVideos(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetStreamVideo(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUploadStreamVideo(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteStreamVideo(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetStreamVideoEmbedCode(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetStreamVideoPlaybackUrl(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetStreamVideoThumbnail(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUpdateStreamVideoMetadata(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetStreamVideoAnalytics(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListStreamLiveInputs(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateStreamLiveInput(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteStreamLiveInput(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetStreamWebhooks(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateStreamWebhook(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteStreamWebhook(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=cloudflare-handlers-4.d.ts.map