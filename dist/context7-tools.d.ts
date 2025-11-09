/**
 * Context7 Tool Definitions
 * Documentation search and library information API
 *
 * Categories:
 * - Library Search: 3 tools
 * - Documentation: 4 tools
 * - Version Management: 3 tools
 * - Examples: 2 tools
 *
 * Total: 12 tools
 */
export declare const CONTEXT7_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            library: {
                type: string;
                description: string;
            };
            query?: undefined;
            limit?: undefined;
            page?: undefined;
            perPage?: undefined;
            version?: undefined;
            from?: undefined;
            to?: undefined;
            topic?: undefined;
            libraries?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            query: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            library?: undefined;
            page?: undefined;
            perPage?: undefined;
            version?: undefined;
            from?: undefined;
            to?: undefined;
            topic?: undefined;
            libraries?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            page: {
                type: string;
                description: string;
            };
            perPage: {
                type: string;
                description: string;
            };
            library?: undefined;
            query?: undefined;
            limit?: undefined;
            version?: undefined;
            from?: undefined;
            to?: undefined;
            topic?: undefined;
            libraries?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            library: {
                type: string;
                description: string;
            };
            version: {
                type: string;
                description: string;
            };
            query?: undefined;
            limit?: undefined;
            page?: undefined;
            perPage?: undefined;
            from?: undefined;
            to?: undefined;
            topic?: undefined;
            libraries?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            library: {
                type: string;
                description: string;
            };
            query: {
                type: string;
                description: string;
            };
            version: {
                type: string;
                description: string;
            };
            limit?: undefined;
            page?: undefined;
            perPage?: undefined;
            from?: undefined;
            to?: undefined;
            topic?: undefined;
            libraries?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            library: {
                type: string;
                description: string;
            };
            from: {
                type: string;
                description: string;
            };
            to: {
                type: string;
                description: string;
            };
            query?: undefined;
            limit?: undefined;
            page?: undefined;
            perPage?: undefined;
            version?: undefined;
            topic?: undefined;
            libraries?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            library: {
                type: string;
                description: string;
            };
            topic: {
                type: string;
                description: string;
            };
            version: {
                type: string;
                description: string;
            };
            query?: undefined;
            limit?: undefined;
            page?: undefined;
            perPage?: undefined;
            from?: undefined;
            to?: undefined;
            libraries?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            query: {
                type: string;
                description: string;
            };
            libraries: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            library?: undefined;
            page?: undefined;
            perPage?: undefined;
            version?: undefined;
            from?: undefined;
            to?: undefined;
            topic?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=context7-tools.d.ts.map