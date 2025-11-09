/**
 * Qdrant Handlers for Chris's Infrastructure
 *
 * Handler functions for all 15 Qdrant tools
 */
export declare function handleQdrantCollectionCreate(args: any): Promise<any>;
export declare function handleQdrantCollectionList(args: any): Promise<any>;
export declare function handleQdrantCollectionGet(args: any): Promise<any>;
export declare function handleQdrantCollectionDelete(args: any): Promise<any>;
export declare function handleQdrantCollectionUpdate(args: any): Promise<any>;
export declare function handleQdrantSearchSemantic(args: any): Promise<any>;
export declare function handleQdrantSearchBatch(args: any): Promise<any>;
export declare function handleQdrantPointUpsert(args: any): Promise<any>;
export declare function handleQdrantPointGet(args: any): Promise<any>;
export declare function handleQdrantPointDelete(args: any): Promise<any>;
export declare function handleQdrantPointSearch(args: any): Promise<any>;
export declare function handleQdrantPointsBatchUpsert(args: any): Promise<any>;
export declare function handleQdrantSnapshotCreate(args: any): Promise<any>;
export declare function handleQdrantSnapshotList(args: any): Promise<any>;
export declare function handleQdrantConnectionTest(args: any): Promise<{
    success: boolean;
    message: string;
    collections: any;
} | {
    success: boolean;
    message: string;
    collections?: undefined;
}>;
//# sourceMappingURL=qdrant-handlers.d.ts.map