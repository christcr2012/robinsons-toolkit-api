/*
  impacted-tests.ts – Impacted Test Selection
  --------------------------------------------
  Run only tests that touch changed symbols first; run full suite after acceptance.
  
  Strategy:
  1. Build import graph (file → dependencies)
  2. For each changed file, find tests that import it (directly or transitively)
  3. Run impacted tests first (2-10× faster)
  4. Run full suite after acceptance
*/

import * from 'fs';
import * from 'path';

/**
 * Build import graph from code graph
 */
export function buildImportGraph(graph: CodeGraph) {
  const importGraph: ImportGraph = {};
  
  for (const [file, imports] of graph.imports.entries()) {
    importGraph[file] = imports;
  }
  
  return importGraph;
}

/**
 * Find tests impacted by changed files
 */
export function findImpactedTests(
  changedFiles,
  graph: ImportGraph,
  opts: { testPattern: RegExp } = {}
) {
  const testPattern = opts.testPattern || /\.(test|spec)\.(ts|js|tsx|jsx|py)$/;
  
  const queue = [...changedFiles];
  const seen = new Set(queue);
  const impacted = new Set();
  
  // BFS to find all files that depend on changed files
  while (queue.length > 0) {
    const file = queue.shift()!;
    
    // Check all files in the graph
    for (const [testFile, imports] of Object.entries(graph)) {
      // Skip if already processed
      if (seen.has(testFile)) continue;
      
      // Check if this file imports the changed file
      const importsChanged = imports.some(imp => {
        // Handle relative imports
        if (imp.startsWith('.')) {
          const resolved = path.normalize(path.join(path.dirname(testFile), imp));
          return resolved === file || resolved.startsWith(file);
        }
        // Handle absolute imports
        return imp.includes(file) || file.includes(imp);
      });
      
      if (importsChanged) {
        seen.add(testFile);
        
        // If it's a test file, add to impacted
        if (testPattern.test(testFile)) {
          impacted.add(testFile);
        } else {
          // Otherwise, continue traversing
          queue.push(testFile);
        }
      }
    }
  }
  
  return Array.from(impacted);
}

/**
 * Find tests by symbol name (grep-based fallback)
 */
export function findTestsBySymbol(
  root,
  symbols,
  opts: { testDirs? } = {}
) {
  const testDirs = opts.testDirs || ['tests', 'test', '__tests__', 'src'];
  const impacted = new Set();
  
  for (const dir of testDirs) {
    const dirPath = path.join(root, dir);
    if (!fs.existsSync(dirPath)) continue;
    
    // Walk directory
    const files = walkDirectory(dirPath, /\.(test|spec)\.(ts|js|tsx|jsx|py)$/);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check if any symbol appears in the test file
      for (const sym of symbols) {
        if (content.includes(sym)) {
          impacted.add(path.relative(root, file));
          break;
        }
      }
    }
  }
  
  return Array.from(impacted);
}

/**
 * Combine import-based and symbol-based test selection
 */
export function selectImpactedTests(
  root,
  changedFiles,
  graph: ImportGraph,
  symbols
): {
  impacted;
  method: 'import-graph' | 'symbol-grep' | 'combined';
} {
  // Try import graph first
  const importBased = findImpactedTests(changedFiles, graph);
  
  // Fallback to symbol grep if no tests found
  const symbolBased = importBased.length === 0 
    ? findTestsBySymbol(root, symbols)
    : [];
  
  const combined = new Set([...importBased, ...symbolBased]);
  
  return {
    impacted: Array.from(combined),
    method: importBased.length > 0 && symbolBased.length > 0 
      ? 'combined'
      : importBased.length > 0 
        ? 'import-graph'
        : 'symbol-grep',
  };
}

/**
 * Walk directory and collect files matching pattern
 */
function walkDirectory(dir, pattern: RegExp) {
  const results = [];
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules, .git, etc.
      if (!/^(node_modules|\.git|\.next|dist|build|coverage)$/.test(entry.name)) {
        results.push(...walkDirectory(fullPath, pattern));
      }
    } else if (entry.isFile() && pattern.test(entry.name)) {
      results.push(fullPath);
    }
  }
  
  return results;
}

/**
 * Estimate speedup from running impacted tests only
 */
export function estimateSpeedup(
  totalTests,
  impactedTests): {
  speedup;
  percentage;
  recommendation: 'run-impacted' | 'run-all';
} {
  const percentage = totalTests > 0 ? (impactedTests / totalTests) * 100 : 100;
  const speedup = totalTests > 0 ? totalTests / Math.max(impactedTests, 1) : 1;
  
  // If impacted tests are  './' + path.dirname(t)));
    return `${baseCommand} ${Array.from(packages).join(' ')}`;
  } else if (baseCommand.includes('cargo test')) {
    // Rust: cargo test test_name1 test_name2
    const testNames = impactedTests.map(t => path.basename(t, path.extname(t)));
    return `${baseCommand} ${testNames.join(' ')}`;
  }
  
  // Unknown framework - return base command
  return baseCommand;
}

