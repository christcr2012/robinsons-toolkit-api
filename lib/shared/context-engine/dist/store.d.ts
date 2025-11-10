/**
 * Robinson's Context Engine - Storage Layer
 *
 * Simple JSONL-based storage for chunks and embeddings
 * Designed for portability and easy debugging
 */
export type StoredChunk = {
    hash: string;
    uri: string;
    title: string;
    text: string;
    vec?: number[];
    metadata?: {
        start?: number;
        end?: number;
        language?: string;
        size?: number;
    };
};
export type IndexMeta = {
    sources: number;
    chunks: number;
    vectors: number;
    provider: string;
    model?: string;
    dimensions?: number;
    indexedAt: string;
    totalCost?: number;
    fileHashes?: {
        [path: string]: {
            hash: string;
            mtime: number;
            size: number;
        };
    };
};
export declare class RCEStore {
    private root;
    private dir;
    private chunksPath;
    private metaPath;
    constructor(root: string);
    /**
     * Initialize storage directory
     */
    init(): Promise<void>;
    /**
     * Write chunks to JSONL file (append mode)
     */
    writeChunks(chunks: StoredChunk[]): Promise<void>;
    /**
     * Load all chunks from JSONL file
     */
    loadAll(): Promise<StoredChunk[]>;
    /**
     * Load chunks in streaming fashion (for large indexes)
     */
    loadStream(): AsyncGenerator<StoredChunk>;
    /**
     * Save index metadata
     */
    saveMeta(meta: IndexMeta): Promise<void>;
    /**
     * Read index metadata
     */
    readMeta(): Promise<IndexMeta | null>;
    /**
     * Clear all stored data (reset index)
     */
    clear(): Promise<void>;
    /**
     * Get storage statistics
     */
    getStats(): Promise<{
        sizeBytes: number;
        chunkCount: number;
    }>;
    /**
     * Remove chunks for specific files (for incremental indexing)
     */
    removeChunksForFiles(files: string[]): Promise<void>;
    /**
     * Compact index (remove duplicates, optimize storage)
     */
    compact(): Promise<void>;
}
//# sourceMappingURL=store.d.ts.map