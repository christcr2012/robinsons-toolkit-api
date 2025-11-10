/**
 * Import Graph Tracking
 *
 * Builds and maintains import/dependency graph for the codebase.
 * Enables "find all files that use X" queries.
 */
export interface ImportGraph {
    imports: Map<string, Set<string>>;
    importedBy: Map<string, Set<string>>;
    exports: Map<string, Set<string>>;
}
/**
 * Build import graph from files
 */
export declare function buildImportGraph(files: string[], root: string): Promise<ImportGraph>;
/**
 * Find all files that import a given file
 */
export declare function getImporters(file: string, graph: ImportGraph): string[];
/**
 * Find all files imported by a given file
 */
export declare function getImports(file: string, graph: ImportGraph): string[];
/**
 * Find all files in the dependency chain of a given file
 */
export declare function getDependencyChain(file: string, graph: ImportGraph, maxDepth?: number): Set<string>;
/**
 * Find all files that depend on a given file (reverse dependency chain)
 */
export declare function getDependents(file: string, graph: ImportGraph, maxDepth?: number): Set<string>;
/**
 * Find circular dependencies
 */
export declare function findCircularDependencies(graph: ImportGraph): string[][];
/**
 * Get graph statistics
 */
export declare function getGraphStats(graph: ImportGraph): {
    files: number;
    imports: number;
    exports: number;
    avgImportsPerFile: number;
    avgExportsPerFile: number;
    mostImported: Array<{
        file: string;
        count: number;
    }>;
    mostImports: Array<{
        file: string;
        count: number;
    }>;
};
//# sourceMappingURL=import-graph.d.ts.map