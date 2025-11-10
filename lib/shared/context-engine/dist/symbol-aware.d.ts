/**
 * Symbol-Aware Search Features
 *
 * Integrates with FREE Agent's symbol indexer to provide code-aware search.
 * Boosts results that match symbol names, types, and function signatures.
 */
import { type SymbolIndex, type Symbol } from '@robinson_ai_systems/free-agent-mcp/dist/utils/symbol-indexer';
import { type RetrievalResult } from '@robinson_ai_systems/free-agent-mcp/dist/utils/code-retrieval';
import type { StoredChunk } from './store.js';
export interface SymbolAwareSearchOptions {
    boostSymbolMatches?: boolean;
    boostSameFile?: boolean;
    symbolMatchWeight?: number;
    sameFileWeight?: number;
}
/**
 * Build symbol index for repository
 */
export declare function buildSymbolIndexForRepo(root: string, options?: {
    exts?: string[];
    maxFiles?: number;
    exclude?: string[];
}): Promise<SymbolIndex>;
/**
 * Find symbols matching query
 */
export declare function findMatchingSymbols(query: string, index: SymbolIndex): Symbol[];
/**
 * Apply symbol-aware boosting to search results
 */
export declare function applySymbolBoosting(chunks: Array<{
    c: StoredChunk;
    s: number;
}>, query: string, index: SymbolIndex, options?: SymbolAwareSearchOptions): Array<{
    c: StoredChunk;
    s: number;
}>;
/**
 * Retrieve code context for a query (delegates to FREE Agent's code-aware retrieval)
 */
export declare function retrieveCodeContextForQuery(root: string, query: {
    targetFile?: string;
    targetFunction?: string;
    targetClass?: string;
    targetInterface?: string;
    keywords?: string[];
}): Promise<RetrievalResult>;
/**
 * Extract symbols from chunks (for symbol-aware snippet generation)
 */
export declare function extractSymbolsFromChunks(chunks: StoredChunk[], index: SymbolIndex): Map<string, Symbol[]>;
/**
 * Find all files that import a given file (import graph)
 */
export declare function findImporters(targetFile: string, index: SymbolIndex): string[];
/**
 * Find all files imported by a given file (import graph)
 */
export declare function findImports(sourceFile: string, index: SymbolIndex): string[];
/**
 * Get neighborhood of a file (imports + importers)
 */
export declare function getFileNeighborhood(file: string, index: SymbolIndex): {
    imports: string[];
    importedBy: string[];
    symbols: Symbol[];
};
/**
 * Find symbol definition
 */
export declare function findSymbolDefinition(symbolName: string, index: SymbolIndex): Symbol | null;
/**
 * Find all callers of a function (simple heuristic)
 */
export declare function findCallers(functionName: string, index: SymbolIndex): Array<{
    file: string;
    line: number;
    context: string;
}>;
//# sourceMappingURL=symbol-aware.d.ts.map