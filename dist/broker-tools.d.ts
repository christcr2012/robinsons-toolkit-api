/**
 * Broker Tool Definitions
 *
 * The 8 meta-tools that provide access to all integration tools
 * without loading them into Augment's context window.
 *
 * DYNAMIC: Category enums are generated at runtime from the registry
 */
import { Tool } from '@modelcontextprotocol/sdk/types.js';
/**
 * Generate broker tools with dynamic category enums
 * @param categories - Array of category names from the registry
 */
export declare function generateBrokerTools(categories: string[]): Tool[];
/**
 * Static broker tools (for backward compatibility)
 * Use generateBrokerTools() for dynamic category support
 */
export declare const BROKER_TOOLS: Tool[];
//# sourceMappingURL=broker-tools.d.ts.map