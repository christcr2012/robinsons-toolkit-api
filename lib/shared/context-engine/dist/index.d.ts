/**
 * Robinson's Context Engine (RCE)
 *
 * Production-grade context engine with:
 * - Hybrid search (vector + lexical BM25)
 * - Symbol-aware search (boosts code symbols)
 * - Import graph tracking (dependency analysis)
 * - Incremental indexing (fast re-indexing)
 * - Multiple embedding providers (OpenAI, Claude/Voyage, Ollama)
 * - Intelligent model selection (best quality for best price)
 * - Graceful degradation (works without API keys)
 * - Cost tracking and optimization
 *
 * @author Robinson AI Systems
 */
export * from './embeddings.js';
export * from './store.js';
export * from './symbol-aware.js';
export * from './import-graph.js';
export * from './incremental.js';
import { type EmbedderConfig } from './embeddings.js';
import { getFileNeighborhood, findSymbolDefinition, findCallers, type SymbolAwareSearchOptions } from './symbol-aware.js';
import { type IncrementalIndexResult } from './incremental.js';
import type { RetrievalResult } from '@robinson_ai_systems/free-agent-mcp/dist/utils/code-retrieval';
export type RCEStats = {
    sources: number;
    chunks: number;
    vectors: number;
    mode: string;
    model?: string;
    dimensions?: number;
    totalCost?: number;
    indexedAt?: string;
};
export type RCESearchHit = {
    uri: string;
    title: string;
    snippet: string;
    score?: number;
    _provider?: string;
    _method?: 'vector' | 'lexical' | 'hybrid';
};
export declare class RobinsonsContextEngine {
    private root;
    private indexed;
    private docs;
    private store;
    private embedderConfig;
    private symbolIndex;
    private importGraph;
    constructor(root: string, embedderConfig?: EmbedderConfig);
    /**
     * Ensure repository is indexed
     */
    ensureIndexed(): Promise<void>;
    /**
     * Index repository with intelligent embedding provider selection
     */
    indexRepo(root: string, exts?: string[]): Promise<{
        files: number;
        chunks: number;
        vectors: number;
        cost: number;
    }>;
    /**
     * Hybrid search: Vector similarity + Lexical BM25 + Symbol-aware boosting
     * Always returns results (graceful degradation to lexical if no vectors)
     */
    search(q: string, k?: number, options?: SymbolAwareSearchOptions): Promise<RCESearchHit[]>;
    /**
     * Get index statistics
     */
    stats(): Promise<RCEStats>;
    /**
     * Reset index (clear all data)
     */
    reset(): Promise<void>;
    /**
     * Build symbol index (enables symbol-aware search)
     */
    buildSymbolIndex(): Promise<void>;
    /**
     * Build import graph (enables dependency tracking)
     */
    buildImportGraph(files: string[]): Promise<void>;
    /**
     * Get file neighborhood (imports + importers + symbols)
     */
    getNeighborhood(file: string): ReturnType<typeof getFileNeighborhood> | null;
    /**
     * Find symbol definition
     */
    findSymbol(symbolName: string): ReturnType<typeof findSymbolDefinition>;
    /**
     * Find all callers of a function
     */
    findCallersOf(functionName: string): ReturnType<typeof findCallers>;
    /**
     * Retrieve code context (delegates to FREE Agent's code-aware retrieval)
     */
    retrieveCodeContext(query: {
        targetFile?: string;
        targetFunction?: string;
        targetClass?: string;
        targetInterface?: string;
        keywords?: string[];
    }): Promise<RetrievalResult>;
    /**
     * Get files that import a given file
     */
    getImporters(file: string): string[];
    /**
     * Get files imported by a given file
     */
    getImports(file: string): string[];
    /**
     * Get dependency chain for a file
     */
    getDependencyChain(file: string, maxDepth?: number): Set<string>;
    /**
     * Get dependents of a file (reverse dependency chain)
     */
    getDependents(file: string, maxDepth?: number): Set<string>;
    /**
     * Perform incremental indexing (only re-index changed files)
     */
    incrementalIndex(files: string[]): Promise<IncrementalIndexResult>;
    /**
     * Check if re-indexing is needed
     */
    needsReindexing(files: string[]): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map