/**
 * Incremental Indexing
 *
 * Tracks file changes and only re-indexes modified files.
 * Dramatically faster than full re-indexing for large repositories.
 */
import type { RCEStore } from './store.js';
import type { Embedder } from './embeddings.js';
export interface FileHash {
    path: string;
    hash: string;
    mtime: number;
    size: number;
}
export interface IncrementalIndexResult {
    added: number;
    updated: number;
    removed: number;
    unchanged: number;
    totalChunks: number;
    totalVectors: number;
}
/**
 * Compute file hashes for all files in directory
 */
export declare function computeFileHashes(files: string[], root: string): Promise<Map<string, FileHash>>;
/**
 * Detect file changes by comparing hashes
 */
export declare function detectChanges(currentHashes: Map<string, FileHash>, previousHashes: Map<string, FileHash>): {
    added: string[];
    updated: string[];
    removed: string[];
    unchanged: string[];
};
/**
 * Perform incremental indexing
 */
export declare function incrementalIndex(root: string, files: string[], store: RCEStore, embedder: Embedder | null, chunkSize?: number): Promise<IncrementalIndexResult>;
/**
 * Check if incremental indexing is needed
 */
export declare function needsReindexing(files: string[], root: string, store: RCEStore): Promise<boolean>;
//# sourceMappingURL=incremental.d.ts.map