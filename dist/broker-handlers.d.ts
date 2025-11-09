/**
 * Broker Tool Handlers
 *
 * Implements the 5 broker meta-tools that provide access to all 714 integration tools.
 */
import { ToolRegistry } from './tool-registry.js';
export declare class BrokerHandlers {
    private registry;
    constructor(registry: ToolRegistry);
    /**
     * toolkit_list_categories
     * List all available integration categories
     */
    listCategories(): Promise<any>;
    /**
     * toolkit_list_tools
     * List all tools in a specific category (without full schemas)
     * Optionally filter by subcategory
     */
    listTools(args: {
        category: string;
        subcategory?: string;
        limit?: number;
        offset?: number;
    }): Promise<any>;
    /**
     * toolkit_list_subcategories
     * List all subcategories within a category
     */
    listSubcategories(args: {
        category: string;
    }): Promise<any>;
    /**
     * toolkit_get_tool_schema
     * Get the full schema for a specific tool
     */
    getToolSchema(args: {
        category: string;
        tool_name: string;
    }): Promise<any>;
    /**
     * toolkit_discover
     * Search for tools by keyword across all categories
     */
    discover(args: {
        query: string;
        limit?: number;
    }): Promise<any>;
    /**
     * toolkit_call
     * Execute any tool from any category (broker pattern)
     *
     * This is the main broker tool that runs tools server-side without loading
     * their definitions into context.
     */
    call(args: {
        category: string;
        tool_name: string;
        arguments: any;
    }, executeToolFn: (toolName: string, toolArgs: any) => Promise<any>): Promise<any>;
    /**
     * toolkit_health_check
     * Check MCP server health and connection status
     */
    healthCheck(): Promise<any>;
}
//# sourceMappingURL=broker-handlers.d.ts.map