/**
 * Cloudflare Handler Functions Part 3
 * KV (20 tools) + R2 (20 tools)
 */
export declare function cloudflareListKVNamespaces(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateKVNamespace(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetKVNamespace(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareRenameKVNamespace(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteKVNamespace(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListKVKeys(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareReadKVValue(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareWriteKVValue(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteKVValue(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareWriteKVBulk(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteKVBulk(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetKVMetadata(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListKVByPrefix(this: any, args: any): Promise<any>;
export declare function cloudflareGetKVWithMetadata(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareSetKVExpiration(this: any, args: any): Promise<any>;
export declare function cloudflareGetKVUsage(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareExportKVNamespace(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareImportKVNamespace(this: any, args: any): Promise<any>;
export declare function cloudflareSearchKVKeys(this: any, args: any): Promise<any>;
export declare function cloudflareGetKVStats(this: any, args: any): Promise<any>;
export declare function cloudflareListR2Buckets(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateR2Bucket(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetR2Bucket(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteR2Bucket(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListR2Objects(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUploadR2Object(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDownloadR2Object(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteR2Object(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetR2ObjectMetadata(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCopyR2Object(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareMoveR2Object(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListR2MultipartUploads(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateR2MultipartUpload(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUploadR2Part(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCompleteR2MultipartUpload(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareAbortR2MultipartUpload(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetR2BucketCors(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareSetR2BucketCors(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetR2BucketLifecycle(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareSetR2BucketLifecycle(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=cloudflare-handlers-3.d.ts.map