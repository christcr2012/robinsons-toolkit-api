/**
 * Import Graph Tracking
 *
 * Builds and maintains import/dependency graph for the codebase.
 * Enables "find all files that use X" queries.
 */
import fs from 'node:fs/promises';
import * as fsSync from 'node:fs';
import path from 'node:path';
/**
 * Build import graph from files
 */
export async function buildImportGraph(files, root) {
    console.log(`[ImportGraph] Building import graph for ${files.length} files...`);
    const graph = {
        imports: new Map(),
        importedBy: new Map(),
        exports: new Map(),
    };
    for (const file of files) {
        try {
            const content = await fs.readFile(file, 'utf8');
            const relPath = path.relative(root, file);
            // Extract imports
            const imports = extractImports(content, file, root);
            graph.imports.set(relPath, new Set(imports));
            // Update importedBy map
            for (const imp of imports) {
                if (!graph.importedBy.has(imp)) {
                    graph.importedBy.set(imp, new Set());
                }
                graph.importedBy.get(imp).add(relPath);
            }
            // Extract exports
            const exports = extractExports(content);
            graph.exports.set(relPath, new Set(exports));
        }
        catch (error) {
            console.warn(`[ImportGraph] Failed to process ${file}:`, error.message);
        }
    }
    console.log(`[ImportGraph] Built graph: ${graph.imports.size} files, ${Array.from(graph.imports.values()).reduce((sum, set) => sum + set.size, 0)} import edges`);
    return graph;
}
/**
 * Extract import statements from file content
 */
function extractImports(content, file, root) {
    const imports = [];
    const fileDir = path.dirname(file);
    // Match ES6 imports: import ... from '...'
    const es6ImportRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([^'"]+)['"]/g;
    let match;
    while ((match = es6ImportRegex.exec(content)) !== null) {
        const importPath = match[1];
        const resolved = resolveImportPath(importPath, fileDir, root);
        if (resolved) {
            imports.push(resolved);
        }
    }
    // Match CommonJS requires: require('...')
    const cjsRequireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    while ((match = cjsRequireRegex.exec(content)) !== null) {
        const importPath = match[1];
        const resolved = resolveImportPath(importPath, fileDir, root);
        if (resolved) {
            imports.push(resolved);
        }
    }
    return imports;
}
/**
 * Resolve import path to actual file path
 */
function resolveImportPath(importPath, fileDir, root) {
    // Skip node_modules and external packages
    if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
        return null;
    }
    // Resolve relative path
    let resolved = path.resolve(fileDir, importPath);
    // Try adding extensions if file doesn't exist
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];
    // Check if file exists as-is
    try {
        if (fsSync.statSync(resolved).isFile()) {
            return path.relative(root, resolved);
        }
    }
    catch {
        // File doesn't exist, try with extensions
    }
    // Try with extensions
    for (const ext of extensions) {
        const withExt = resolved + ext;
        try {
            if (fsSync.statSync(withExt).isFile()) {
                return path.relative(root, withExt);
            }
        }
        catch {
            // Continue trying
        }
    }
    // Try as directory with index file
    for (const ext of extensions) {
        const indexPath = path.join(resolved, `index${ext}`);
        try {
            if (fsSync.statSync(indexPath).isFile()) {
                return path.relative(root, indexPath);
            }
        }
        catch {
            // Continue trying
        }
    }
    return null;
}
/**
 * Extract export statements from file content
 */
function extractExports(content) {
    const exports = [];
    // Match named exports: export { foo, bar }
    const namedExportRegex = /export\s+\{([^}]+)\}/g;
    let match;
    while ((match = namedExportRegex.exec(content)) !== null) {
        const names = match[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0].trim());
        exports.push(...names);
    }
    // Match export declarations: export function foo, export const bar, etc.
    const declExportRegex = /export\s+(?:async\s+)?(?:function|const|let|var|class|interface|type|enum)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    while ((match = declExportRegex.exec(content)) !== null) {
        exports.push(match[1]);
    }
    // Match default export
    if (content.includes('export default')) {
        exports.push('default');
    }
    return exports;
}
/**
 * Find all files that import a given file
 */
export function getImporters(file, graph) {
    return Array.from(graph.importedBy.get(file) || []);
}
/**
 * Find all files imported by a given file
 */
export function getImports(file, graph) {
    return Array.from(graph.imports.get(file) || []);
}
/**
 * Find all files in the dependency chain of a given file
 */
export function getDependencyChain(file, graph, maxDepth = 3) {
    const visited = new Set();
    const queue = [{ file, depth: 0 }];
    while (queue.length > 0) {
        const { file: current, depth } = queue.shift();
        if (visited.has(current) || depth > maxDepth) {
            continue;
        }
        visited.add(current);
        // Add imports
        const imports = graph.imports.get(current);
        if (imports) {
            for (const imp of imports) {
                if (!visited.has(imp)) {
                    queue.push({ file: imp, depth: depth + 1 });
                }
            }
        }
    }
    visited.delete(file); // Remove the starting file
    return visited;
}
/**
 * Find all files that depend on a given file (reverse dependency chain)
 */
export function getDependents(file, graph, maxDepth = 3) {
    const visited = new Set();
    const queue = [{ file, depth: 0 }];
    while (queue.length > 0) {
        const { file: current, depth } = queue.shift();
        if (visited.has(current) || depth > maxDepth) {
            continue;
        }
        visited.add(current);
        // Add importers
        const importers = graph.importedBy.get(current);
        if (importers) {
            for (const importer of importers) {
                if (!visited.has(importer)) {
                    queue.push({ file: importer, depth: depth + 1 });
                }
            }
        }
    }
    visited.delete(file); // Remove the starting file
    return visited;
}
/**
 * Find circular dependencies
 */
export function findCircularDependencies(graph) {
    const cycles = [];
    const visited = new Set();
    const recursionStack = new Set();
    function dfs(file, path) {
        visited.add(file);
        recursionStack.add(file);
        path.push(file);
        const imports = graph.imports.get(file);
        if (imports) {
            for (const imp of imports) {
                if (!visited.has(imp)) {
                    dfs(imp, [...path]);
                }
                else if (recursionStack.has(imp)) {
                    // Found a cycle
                    const cycleStart = path.indexOf(imp);
                    if (cycleStart >= 0) {
                        cycles.push(path.slice(cycleStart));
                    }
                }
            }
        }
        recursionStack.delete(file);
    }
    for (const file of graph.imports.keys()) {
        if (!visited.has(file)) {
            dfs(file, []);
        }
    }
    return cycles;
}
/**
 * Get graph statistics
 */
export function getGraphStats(graph) {
    const files = graph.imports.size;
    const totalImports = Array.from(graph.imports.values()).reduce((sum, set) => sum + set.size, 0);
    const totalExports = Array.from(graph.exports.values()).reduce((sum, set) => sum + set.size, 0);
    // Find most imported files
    const importCounts = Array.from(graph.importedBy.entries())
        .map(([file, importers]) => ({ file, count: importers.size }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    // Find files with most imports
    const importingCounts = Array.from(graph.imports.entries())
        .map(([file, imports]) => ({ file, count: imports.size }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    return {
        files,
        imports: totalImports,
        exports: totalExports,
        avgImportsPerFile: files > 0 ? totalImports / files : 0,
        avgExportsPerFile: files > 0 ? totalExports / files : 0,
        mostImported: importCounts,
        mostImports: importingCounts,
    };
}
//# sourceMappingURL=import-graph.js.map