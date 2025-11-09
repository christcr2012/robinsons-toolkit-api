/**
 * N8N Handlers for Chris's Infrastructure
 *
 * Handler functions for all 12 N8N tools
 */
export declare function handleN8nWorkflowTrigger(args: any): Promise<any>;
export declare function handleN8nWorkflowList(args: any): Promise<any>;
export declare function handleN8nWorkflowGet(args: any): Promise<any>;
export declare function handleN8nWorkflowCreate(args: any): Promise<any>;
export declare function handleN8nWorkflowUpdate(args: any): Promise<any>;
export declare function handleN8nWorkflowDelete(args: any): Promise<any>;
export declare function handleN8nExecutionGetStatus(args: any): Promise<any>;
export declare function handleN8nExecutionList(args: any): Promise<any>;
export declare function handleN8nExecutionDelete(args: any): Promise<any>;
export declare function handleN8nCredentialList(args: any): Promise<any>;
export declare function handleN8nCredentialCreate(args: any): Promise<any>;
export declare function handleN8nConnectionTest(args: any): Promise<{
    success: boolean;
    message: string;
    workflows: any;
} | {
    success: boolean;
    message: string;
    workflows?: undefined;
}>;
//# sourceMappingURL=n8n-handlers.d.ts.map