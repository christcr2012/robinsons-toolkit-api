export type ToolDef = {
    name: string;
    description?: string;
    inputSchema?: Record<string, any> | null;
    [k: string]: any;
};
export declare function validateTools(tools: any[]): ToolDef[];
//# sourceMappingURL=sanitizeTool.d.ts.map