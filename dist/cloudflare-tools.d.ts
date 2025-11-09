/**
 * Cloudflare Tool Definitions Part 1
 * Edge computing and CDN platform
 *
 * Categories:
 * - Zones (DNS & Domain Management): 30 tools
 * - Workers (Serverless Functions): 25 tools
 * - KV (Key-Value Storage): 15 tools
 * - R2 (Object Storage): 20 tools
 * - Pages (Static Sites): 20 tools
 * - D1 (SQL Database): 15 tools
 * - Queues (Message Queues): 10 tools
 * - Durable Objects: 10 tools
 * - Stream (Video): 15 tools
 *
 * Total: 160 tools
 */
export declare const CLOUDFLARE_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            since: {
                type: string;
                description: string;
            };
            until: {
                type: string;
                description: string;
            };
            continuous: {
                type: string;
                description: string;
            };
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            accountId?: undefined;
            scriptName?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            accountId?: undefined;
            scriptName?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            threshold: {
                type: string;
                description: string;
            };
            period: {
                type: string;
                description: string;
            };
            action: {
                type: string;
                description: string;
            };
            match: {
                type: string;
                description: string;
            };
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            accountId?: undefined;
            scriptName?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            ruleId: {
                type: string;
                description: string;
            };
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            accountId?: undefined;
            scriptName?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            defaultPools: {
                type: string;
                description: string;
            };
            fallbackPool: {
                type: string;
                description: string;
            };
            ttl: {
                type: string;
                description: string;
            };
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            loadBalancerId?: undefined;
            accountId?: undefined;
            scriptName?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            loadBalancerId: {
                type: string;
                description: string;
            };
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            accountId?: undefined;
            scriptName?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
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
            zoneId?: undefined;
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            scriptName?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
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
            scriptName: {
                type: string;
                description: string;
            };
            zoneId?: undefined;
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
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
            scriptName: {
                type: string;
                description: string;
            };
            script: {
                type: string;
                description: string;
            };
            bindings: {
                type: string;
                description: string;
            };
            zoneId?: undefined;
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            pattern: {
                type: string;
                description: string;
            };
            script: {
                type: string;
                description: string;
            };
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            accountId?: undefined;
            scriptName?: undefined;
            bindings?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            routeId: {
                type: string;
                description: string;
            };
            pattern: {
                type: string;
                description: string;
            };
            script: {
                type: string;
                description: string;
            };
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            accountId?: undefined;
            scriptName?: undefined;
            bindings?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            routeId: {
                type: string;
                description: string;
            };
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            accountId?: undefined;
            scriptName?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
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
            scriptName: {
                type: string;
                description: string;
            };
            cron: {
                type: string;
                description: string;
            };
            zoneId?: undefined;
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
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
            scriptName: {
                type: string;
                description: string;
            };
            triggerId: {
                type: string;
                description: string;
            };
            zoneId?: undefined;
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
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
            scriptName: {
                type: string;
                description: string;
            };
            logpush: {
                type: string;
                description: string;
            };
            bindings: {
                type: string;
                description: string;
            };
            zoneId?: undefined;
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            script?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            subdomain?: undefined;
            text?: undefined;
            secretName?: undefined;
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
            subdomain: {
                type: string;
                description: string;
            };
            zoneId?: undefined;
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            scriptName?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            text?: undefined;
            secretName?: undefined;
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
            scriptName: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            text: {
                type: string;
                description: string;
            };
            zoneId?: undefined;
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            secretName?: undefined;
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
            scriptName: {
                type: string;
                description: string;
            };
            secretName: {
                type: string;
                description: string;
            };
            zoneId?: undefined;
            since?: undefined;
            until?: undefined;
            continuous?: undefined;
            threshold?: undefined;
            period?: undefined;
            action?: undefined;
            match?: undefined;
            ruleId?: undefined;
            name?: undefined;
            defaultPools?: undefined;
            fallbackPool?: undefined;
            ttl?: undefined;
            loadBalancerId?: undefined;
            script?: undefined;
            bindings?: undefined;
            pattern?: undefined;
            routeId?: undefined;
            cron?: undefined;
            triggerId?: undefined;
            logpush?: undefined;
            subdomain?: undefined;
            text?: undefined;
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
            sourceKey: {
                type: string;
                description: string;
            };
            destinationKey: {
                type: string;
                description: string;
            };
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            sourceKey?: undefined;
            destinationKey?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            metadata: {
                type: string;
                description: string;
            };
            sourceKey?: undefined;
            destinationKey?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            uploadId: {
                type: string;
                description: string;
            };
            partNumber: {
                type: string;
                description: string;
            };
            body: {
                type: string;
                description: string;
            };
            sourceKey?: undefined;
            destinationKey?: undefined;
            metadata?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            uploadId: {
                type: string;
                description: string;
            };
            parts: {
                type: string;
                description: string;
            };
            sourceKey?: undefined;
            destinationKey?: undefined;
            metadata?: undefined;
            partNumber?: undefined;
            body?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            uploadId: {
                type: string;
                description: string;
            };
            sourceKey?: undefined;
            destinationKey?: undefined;
            metadata?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            corsRules: {
                type: string;
                description: string;
            };
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            expiresIn: {
                type: string;
                description: string;
            };
            sourceKey?: undefined;
            destinationKey?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            projectName: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            productionBranch: {
                type: string;
                description: string;
            };
            source: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            projectName: {
                type: string;
                description: string;
            };
            deploymentId: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            projectName: {
                type: string;
                description: string;
            };
            branch: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            projectName: {
                type: string;
                description: string;
            };
            domain: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            projectName: {
                type: string;
                description: string;
            };
            buildCommand: {
                type: string;
                description: string;
            };
            buildOutputDirectory: {
                type: string;
                description: string;
            };
            rootDirectory: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            projectName: {
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
            environment: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            projectName: {
                type: string;
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            databaseId?: undefined;
            sql?: undefined;
            params?: undefined;
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
            databaseId: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
            sql?: undefined;
            params?: undefined;
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
            databaseId: {
                type: string;
                description: string;
            };
            sql: {
                type: string;
                description: string;
            };
            params: {
                type: string;
                description: string;
            };
            bucketName?: undefined;
            sourceKey?: undefined;
            destinationKey?: undefined;
            key?: undefined;
            metadata?: undefined;
            uploadId?: undefined;
            partNumber?: undefined;
            body?: undefined;
            parts?: undefined;
            corsRules?: undefined;
            expiresIn?: undefined;
            projectName?: undefined;
            name?: undefined;
            productionBranch?: undefined;
            source?: undefined;
            deploymentId?: undefined;
            branch?: undefined;
            domain?: undefined;
            buildCommand?: undefined;
            buildOutputDirectory?: undefined;
            rootDirectory?: undefined;
            value?: undefined;
            environment?: undefined;
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
            databaseId: {
                type: string;
                description: string;
            };
            format: {
                type: string;
                description: string;
            };
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            databaseId: {
                type: string;
                description: string;
            };
            data: {
                type: string;
                description: string;
            };
            format: {
                type: string;
                description: string;
            };
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            databaseId: {
                type: string;
                description: string;
            };
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            databaseId: {
                type: string;
                description: string;
            };
            tableName: {
                type: string;
                description: string;
            };
            format?: undefined;
            data?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            databaseId: {
                type: string;
                description: string;
            };
            backupId: {
                type: string;
                description: string;
            };
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            queueId: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            queueId: {
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
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            queueId: {
                type: string;
                description: string;
            };
            maxMessages: {
                type: string;
                description: string;
            };
            visibilityTimeout: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            body?: undefined;
            contentType?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            queueId: {
                type: string;
                description: string;
            };
            receiptHandle: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            queueId: {
                type: string;
                description: string;
            };
            settings: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            scriptName: {
                type: string;
                description: string;
            };
            className: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            objectId: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            newClassName: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            objectId?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            search: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            videoId: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            file: {
                type: string;
                description: string;
            };
            meta: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            videoId: {
                type: string;
                description: string;
            };
            meta: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            file?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            meta: {
                type: string;
                description: string;
            };
            recording: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            liveInputId: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            videoId: {
                type: string;
                description: string;
            };
            since: {
                type: string;
                description: string;
            };
            until: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            notificationUrl?: undefined;
            webhookId?: undefined;
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
            notificationUrl: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            webhookId?: undefined;
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
            webhookId: {
                type: string;
                description: string;
            };
            databaseId?: undefined;
            format?: undefined;
            data?: undefined;
            tableName?: undefined;
            backupId?: undefined;
            name?: undefined;
            queueId?: undefined;
            body?: undefined;
            contentType?: undefined;
            maxMessages?: undefined;
            visibilityTimeout?: undefined;
            receiptHandle?: undefined;
            settings?: undefined;
            scriptName?: undefined;
            className?: undefined;
            namespaceId?: undefined;
            objectId?: undefined;
            newClassName?: undefined;
            search?: undefined;
            status?: undefined;
            videoId?: undefined;
            file?: undefined;
            meta?: undefined;
            recording?: undefined;
            liveInputId?: undefined;
            since?: undefined;
            until?: undefined;
            notificationUrl?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                description: string;
            };
            page: {
                type: string;
                description: string;
            };
            perPage: {
                type: string;
                description: string;
            };
            zoneId?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            name?: undefined;
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            account: {
                type: string;
                description: string;
            };
            jumpStart: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            zoneId?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            purgeEverything: {
                type: string;
                description: string;
            };
            files: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            tags: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            hosts: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            name?: undefined;
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            content: {
                type: string;
                description: string;
            };
            page: {
                type: string;
                description: string;
            };
            perPage: {
                type: string;
                description: string;
            };
            status?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            recordId: {
                type: string;
                description: string;
            };
            name?: undefined;
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            content: {
                type: string;
                description: string;
            };
            ttl: {
                type: string;
                description: string;
            };
            priority: {
                type: string;
                description: string;
            };
            proxied: {
                type: string;
                description: string;
            };
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            recordId?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            recordId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            content: {
                type: string;
                description: string;
            };
            ttl: {
                type: string;
                description: string;
            };
            proxied: {
                type: string;
                description: string;
            };
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            priority?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            setting: {
                type: string;
                description: string;
            };
            value: {
                type: string;
                description: string;
            };
            name?: undefined;
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            value: {
                type: string;
                description: string;
            };
            name?: undefined;
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            page: {
                type: string;
                description: string;
            };
            perPage: {
                type: string;
                description: string;
            };
            name?: undefined;
            status?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            filter: {
                type: string;
                description: string;
            };
            action: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            priority: {
                type: string;
                description: string;
            };
            name?: undefined;
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            ruleId?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            ruleId: {
                type: string;
                description: string;
            };
            filter: {
                type: string;
                description: string;
            };
            action: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            name?: undefined;
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            ruleId: {
                type: string;
                description: string;
            };
            name?: undefined;
            status?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            targets?: undefined;
            actions?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            targets: {
                type: string;
                description: string;
            };
            actions: {
                type: string;
                description: string;
            };
            priority: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                description: string;
            };
            name?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
            ruleId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            zoneId: {
                type: string;
                description: string;
            };
            ruleId: {
                type: string;
                description: string;
            };
            targets: {
                type: string;
                description: string;
            };
            actions: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                description: string;
            };
            name?: undefined;
            page?: undefined;
            perPage?: undefined;
            account?: undefined;
            jumpStart?: undefined;
            type?: undefined;
            purgeEverything?: undefined;
            files?: undefined;
            tags?: undefined;
            hosts?: undefined;
            content?: undefined;
            recordId?: undefined;
            ttl?: undefined;
            priority?: undefined;
            proxied?: undefined;
            setting?: undefined;
            value?: undefined;
            filter?: undefined;
            action?: undefined;
            description?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=cloudflare-tools.d.ts.map