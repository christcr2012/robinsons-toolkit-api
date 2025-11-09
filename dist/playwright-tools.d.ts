/**
 * Playwright Tool Definitions (50 tools)
 *
 * Resource Groups:
 * - Browser Management: 10 tools
 * - Page Navigation: 10 tools
 * - Element Interaction: 15 tools
 * - Assertions & Waits: 10 tools
 * - Screenshots & Videos: 5 tools
 */
export declare const PLAYWRIGHT_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            browserType: {
                type: string;
                description: string;
                enum: string[];
            };
            headless: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            browserType?: undefined;
            headless?: undefined;
            options?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            width: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            options?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            userAgent: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            options?: undefined;
            width?: undefined;
            height?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            headers: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            options?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            url: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            html: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            state: {
                type: string;
                description: string;
                enum: string[];
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            selector: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            selector: {
                type: string;
                description: string;
            };
            value: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            selector: {
                type: string;
                description: string;
            };
            text: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            value?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            selector: {
                type: string;
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            value?: undefined;
            text?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            selector: {
                type: string;
                description: string;
            };
            values: {
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            selector: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            options?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            selector: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            options?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            timeout: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            options?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            script?: undefined;
            args?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            script: {
                type: string;
                description: string;
            };
            args: {
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            options?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            path?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            path: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            selector?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            selector: {
                type: string;
                description: string;
            };
            path: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                description: string;
            };
            browserType?: undefined;
            headless?: undefined;
            width?: undefined;
            height?: undefined;
            userAgent?: undefined;
            headers?: undefined;
            url?: undefined;
            html?: undefined;
            state?: undefined;
            value?: undefined;
            text?: undefined;
            key?: undefined;
            values?: undefined;
            name?: undefined;
            timeout?: undefined;
            script?: undefined;
            args?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=playwright-tools.d.ts.map