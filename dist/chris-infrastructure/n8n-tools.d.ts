/**
 * N8N Tools for Chris's Infrastructure
 *
 * 12 tools for N8N workflow automation via FastAPI Gateway
 */
export declare const n8nTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            workflow_id: {
                type: string;
                description: string;
            };
            data: {
                type: string;
                description: string;
            };
            active?: undefined;
            name?: undefined;
            nodes?: undefined;
            connections?: undefined;
            execution_id?: undefined;
            status?: undefined;
            limit?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            active: {
                type: string;
                description: string;
                default?: undefined;
            };
            workflow_id?: undefined;
            data?: undefined;
            name?: undefined;
            nodes?: undefined;
            connections?: undefined;
            execution_id?: undefined;
            status?: undefined;
            limit?: undefined;
            type?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            workflow_id: {
                type: string;
                description: string;
            };
            data?: undefined;
            active?: undefined;
            name?: undefined;
            nodes?: undefined;
            connections?: undefined;
            execution_id?: undefined;
            status?: undefined;
            limit?: undefined;
            type?: undefined;
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
            nodes: {
                type: string;
                description: string;
            };
            connections: {
                type: string;
                description: string;
            };
            active: {
                type: string;
                default: boolean;
                description: string;
            };
            workflow_id?: undefined;
            data?: undefined;
            execution_id?: undefined;
            status?: undefined;
            limit?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            workflow_id: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            nodes: {
                type: string;
                description: string;
            };
            connections: {
                type: string;
                description: string;
            };
            active: {
                type: string;
                description: string;
                default?: undefined;
            };
            data?: undefined;
            execution_id?: undefined;
            status?: undefined;
            limit?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            execution_id: {
                type: string;
                description: string;
            };
            workflow_id?: undefined;
            data?: undefined;
            active?: undefined;
            name?: undefined;
            nodes?: undefined;
            connections?: undefined;
            status?: undefined;
            limit?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            workflow_id: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            limit: {
                type: string;
                default: number;
                description: string;
            };
            data?: undefined;
            active?: undefined;
            name?: undefined;
            nodes?: undefined;
            connections?: undefined;
            execution_id?: undefined;
            type?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            type: {
                type: string;
                description: string;
            };
            workflow_id?: undefined;
            data?: undefined;
            active?: undefined;
            name?: undefined;
            nodes?: undefined;
            connections?: undefined;
            execution_id?: undefined;
            status?: undefined;
            limit?: undefined;
        };
        required?: undefined;
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
            type: {
                type: string;
                description: string;
            };
            data: {
                type: string;
                description: string;
            };
            workflow_id?: undefined;
            active?: undefined;
            nodes?: undefined;
            connections?: undefined;
            execution_id?: undefined;
            status?: undefined;
            limit?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            workflow_id?: undefined;
            data?: undefined;
            active?: undefined;
            name?: undefined;
            nodes?: undefined;
            connections?: undefined;
            execution_id?: undefined;
            status?: undefined;
            limit?: undefined;
            type?: undefined;
        };
        required?: undefined;
    };
})[];
//# sourceMappingURL=n8n-tools.d.ts.map