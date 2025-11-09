/**
 * Cloudflare Tool Definitions Part 2
 * Zones (continued), Workers, KV, R2
 */
export declare const CLOUDFLARE_TOOLS_2: ({
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
})[];
//# sourceMappingURL=cloudflare-tools-2.d.ts.map