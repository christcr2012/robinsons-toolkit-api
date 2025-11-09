/**
 * Tool Registry for Robinson's Toolkit Broker Pattern
 *
 * Maps all 714 tools by category and name for fast lookup.
 * Enables discovery and execution without loading all tool definitions into context.
 */
export interface ToolSchema {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties?: Record<string, any>;
        required?: string[];
    };
    subcategory?: string;
}
export interface CategoryInfo {
    name: string;
    displayName: string;
    description: string;
    toolCount: number;
    enabled: boolean;
    subcategories?: string[];
}
export declare class ToolRegistry {
    private toolsByCategory;
    private categories;
    private static readonly CATEGORY_METADATA;
    private static readonly GOOGLE_WORKSPACE_PREFIXES;
    constructor();
    /**
     * Auto-create category if it doesn't exist
     * Uses metadata from CATEGORY_METADATA if available, otherwise generates default metadata
     */
    private ensureCategory;
    /**
     * Register a tool in the registry
     */
    registerTool(category: string, tool: ToolSchema): void;
    /**
     * Get all categories
     */
    getCategories(): CategoryInfo[];
    /**
     * Get category info
     */
    getCategory(name: string): CategoryInfo | undefined;
    /**
     * List all tools in a category (without full schemas)
     */
    listToolsInCategory(category: string): Array<{
        name: string;
        description: string;
    }>;
    /**
     * Get full tool schema
     */
    getToolSchema(category: string, toolName: string): ToolSchema | undefined;
    /**
     * Search for tools by keyword
     */
    searchTools(query: string, limit?: number): Array<{
        category: string;
        tool: ToolSchema;
        score: number;
        matched: string[];
    }>;
    /**
     * Get tool by full name (category_toolname)
     */
    getToolByFullName(fullName: string): {
        category: string;
        tool: ToolSchema;
    } | undefined;
    /**
     * Get total tool count
     */
    getTotalToolCount(): number;
    /**
     * Check if category exists
     */
    hasCategory(category: string): boolean;
    /**
     * Check if tool exists
     */
    hasTool(category: string, toolName: string): boolean;
    /**
     * Bulk register tools from an array
     * DYNAMIC: Automatically creates categories as needed
     */
    bulkRegisterTools(tools: ToolSchema[]): void;
    /**
     * Extract category from tool name
     * DYNAMIC: Automatically detects category from tool name prefix (e.g., "github_create_repo" -> "github")
     * Special handling for Google Workspace tools which use multiple prefixes (gmail_, drive_, etc.)
     */
    private extractCategory;
    /**
     * Extract subcategory from tool name (for Google Workspace tools)
     * Examples: gmail_send_message -> "gmail", drive_create_file -> "drive"
     */
    extractSubcategory(toolName: string): string | null;
    /**
     * Get all subcategories for a category
     */
    getSubcategories(category: string): string[];
    /**
     * List tools in a category filtered by subcategory
     */
    listToolsInSubcategory(category: string, subcategory: string): Array<{
        name: string;
        description: string;
    }>;
    /**
     * Update category metadata with subcategories
     */
    updateCategorySubcategories(): void;
}
//# sourceMappingURL=tool-registry.d.ts.map