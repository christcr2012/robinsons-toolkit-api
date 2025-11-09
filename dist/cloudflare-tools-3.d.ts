/**
 * Cloudflare Tool Definitions Part 3
 * Workers (continued), KV, R2, Pages, D1, Queues, Durable Objects, Stream
 */
export declare const CLOUDFLARE_TOOLS_3: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            scriptName: {
                type: string;
                description: string;
            };
            title?: undefined;
            namespaceId?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            namespaceId?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            title: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            namespaceId?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            namespaceId: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            namespaceId: {
                type: string;
                description: string;
            };
            title: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            namespaceId: {
                type: string;
                description: string;
            };
            prefix: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            namespaceId: {
                type: string;
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            prefix?: undefined;
            limit?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            namespaceId: {
                type: string;
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            value: {
                type: string;
                description: string;
            };
            expirationTtl: {
                type: string;
                description: string;
            };
            metadata: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            prefix?: undefined;
            limit?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            namespaceId: {
                type: string;
                description: string;
            };
            pairs: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            namespaceId: {
                type: string;
                description: string;
            };
            keys: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            namespaceId: {
                type: string;
                description: string;
            };
            cursor: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            name?: undefined;
            locationHint?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            locationHint: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            namespaceId?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            bucketName?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            bucketName: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            namespaceId?: undefined;
            prefix?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            bucketName: {
                type: string;
                description: string;
            };
            prefix: {
                type: string;
                description: string;
            };
            delimiter: {
                type: string;
                description: string;
            };
            maxKeys: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            namespaceId?: undefined;
            limit?: undefined;
            key?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            bucketName: {
                type: string;
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            namespaceId?: undefined;
            prefix?: undefined;
            limit?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            metadata?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
            body?: undefined;
            contentType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            accountId: {
                type: string;
                description: string;
            };
            bucketName: {
                type: string;
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            body: {
                type: string;
                description: string;
            };
            contentType: {
                type: string;
                description: string;
            };
            metadata: {
                type: string;
                description: string;
            };
            scriptName?: undefined;
            title?: undefined;
            namespaceId?: undefined;
            prefix?: undefined;
            limit?: undefined;
            value?: undefined;
            expirationTtl?: undefined;
            pairs?: undefined;
            keys?: undefined;
            cursor?: undefined;
            name?: undefined;
            locationHint?: undefined;
            delimiter?: undefined;
            maxKeys?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=cloudflare-tools-3.d.ts.map