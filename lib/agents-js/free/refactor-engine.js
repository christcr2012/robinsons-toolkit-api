#!/usr/bin/env node
/**
 * Refactor Engine
 * 
 * Apply safe codemods using jscodeshift (TS/JS) or ruff (Python).
 * Deterministic refactoring instead of AI-generated patches.
 * Fixer emits codemod intents; runner applies them.
 */

import * from 'node:fs';
import * from 'node:path';
import { execSync } from 'node:child_process';

/**
 * Apply codemod based on intent
 */
export async function applyCodemod(
  root,
  intent: CodemodIntent
) {
  const language = detectLanguage(root, intent.target);
  
  if (language === 'typescript' || language === 'javascript') {
    return applyJSCodemod(root, intent);
  } else if (language === 'python') {
    return applyPythonCodemod(root, intent);
  }
  
  return {
    success: false,
    patches: [],
    errors: [`Unsupported language for codemod: ${language}`],
    warnings: [],
  };
}

/**
 * Detect language from file extension
 */
function detectLanguage(root, target): 'typescript' | 'javascript' | 'python' | 'unknown' {
  const ext = path.extname(target).toLowerCase();
  
  if (ext === '.ts' || ext === '.tsx') return 'typescript';
  if (ext === '.js' || ext === '.jsx') return 'javascript';
  if (ext === '.py') return 'python';
  
  // Try to find file in root
  const files = findFiles(root, target);
  if (files.length > 0) {
    const fileExt = path.extname(files[0]).toLowerCase();
    if (fileExt === '.ts' || fileExt === '.tsx') return 'typescript';
    if (fileExt === '.js' || fileExt === '.jsx') return 'javascript';
    if (fileExt === '.py') return 'python';
  }
  
  return 'unknown';
}

/**
 * Find files matching pattern
 */
function findFiles(root, pattern) {
  const files = [];
  
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.includes(pattern)) {
        files.push(fullPath);
      }
    }
  }
  
  walk(root);
  return files;
}

/**
 * Apply JavaScript/TypeScript codemod using jscodeshift
 */
async function applyJSCodemod(
  root,
  intent: CodemodIntent
) {
  const errors = [];
  const warnings = [];
  const patches = [];
  
  try {
    // Check if jscodeshift is available
    try {
      execSync('npx jscodeshift --version', { cwd: root, stdio: 'ignore' });
    } catch {
      errors.push('jscodeshift not found. Install with: npm install -D jscodeshift');
      return { success: false, patches, errors, warnings };
    }
    
    // Generate codemod script based on intent
    const codemodScript = generateJSCodemodScript(intent);
    const scriptPath = path.join(root, '.agent', 'tmp', `codemod-${Date.now()}.js`);
    
    // Ensure tmp directory exists
    fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
    fs.writeFileSync(scriptPath, codemodScript);
    
    // Run jscodeshift
    const targetFiles = intent.params?.files || [intent.target];
    const cmd = `npx jscodeshift -t ${scriptPath} ${targetFiles.join(' ')} --dry --print`;
    
    const output = execSync(cmd, { cwd: root, encoding: 'utf-8' });
    
    // Parse output to generate patches
    // jscodeshift dry run shows what would change
    // For now, we'll just run it for real if dry run succeeds
    if (!output.includes('error')) {
      execSync(`npx jscodeshift -t ${scriptPath} ${targetFiles.join(' ')}`, { cwd: root });
      
      // Generate patches from changed files
      for (const file of targetFiles) {
        const content = fs.readFileSync(path.join(root, file), 'utf-8');
        patches.push({
          kind: 'edit',
          path: file,
          find: '', // Would need to track original content
          replace: content,
        });
      }
    }
    
    // Cleanup
    fs.unlinkSync(scriptPath);
    
    return { success: true, patches, errors, warnings };
  } catch (e) {
    errors.push(`Codemod failed: ${e.message}`);
    return { success: false, patches, errors, warnings };
  }
}

/**
 * Generate jscodeshift codemod script
 */
function generateJSCodemodScript(intent: CodemodIntent){
  switch (intent.type) {
    case 'extract-function':
      return `
module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  
  // Find the target code block and extract to function
  // This is a simplified example
  return root.toSource();
};
`;
    
    case 'rename-symbol':
      return `
module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  
  // Rename symbol: ${intent.target} -> ${intent.params?.newName}
  root.find(j.Identifier, { name: '${intent.target}' })
    .replaceWith(j.identifier('${intent.params?.newName}'));
  
  return root.toSource();
};
`;
    
    case 'extract-component':
      return `
module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  
  // Extract JSX to new component
  // This is a simplified example
  return root.toSource();
};
`;
    
    default:
      return `
module.exports = function(fileInfo, api) {
  // No-op codemod
  return fileInfo.source;
};
`;
  }
}

/**
 * Apply Python codemod using ruff or rope
 */
async function applyPythonCodemod(
  root,
  intent: CodemodIntent
) {
  const errors = [];
  const warnings = [];
  const patches = [];
  
  try {
    // Check if ruff is available
    try {
      execSync('ruff --version', { cwd: root, stdio: 'ignore' });
    } catch {
      warnings.push('ruff not found. Python codemods limited. Install with: pip install ruff');
    }
    
    // For now, Python codemods are limited
    // Could integrate with rope or other refactoring tools
    warnings.push('Python codemods not fully implemented yet');
    
    return { success: false, patches, errors, warnings };
  } catch (e) {
    errors.push(`Python codemod failed: ${e.message}`);
    return { success: false, patches, errors, warnings };
  }
}

/**
 * Suggest codemods for a file
 */
export async function suggestCodemods(
  root,
  filePath) {
  const suggestions = [];
  const content = fs.readFileSync(path.join(root, filePath), 'utf-8');
  
  // Detect long functions (candidates for extraction)
  const longFunctions = detectLongFunctions(content);
  for (const func of longFunctions) {
    suggestions.push({
      type: 'extract-function',
      target: func.name,
      params: { lines: func.lines },
    });
  }
  
  // Detect duplicated code (candidates for extraction)
  const duplicates = detectDuplicates(content);
  for (const dup of duplicates) {
    suggestions.push({
      type: 'extract-function',
      target: `extracted_${dup.hash}`,
      params: { occurrences: dup.count },
    });
  }
  
  return suggestions;
}

/**
 * Detect long functions (>50 lines)
 */
function detectLongFunctions(content) {
  const functions = [];
  const lines = content.split('\n');
  
  let currentFunction = null;
  let functionStart = 0;
  let braceDepth = 0;
  
  for (let i = 0; i  50) {
        functions.push({ name: currentFunction, lines: functionLines });
      }
      currentFunction = null;
    }
  }
  
  return functions;
}

/**
 * Detect duplicated code blocks
 */
function detectDuplicates(content) {
  const duplicates = [];
  const blocks = new Map();
  
  const lines = content.split('\n');
  const blockSize = 5; // Look for 5-line duplicates
  
  for (let i = 0; i  50) { // Ignore small blocks
      const hash = simpleHash(block);
      blocks.set(hash, (blocks.get(hash) || 0) + 1);
    }
  }
  
  for (const [hash, count] of blocks) {
    if (count > 1) {
      duplicates.push({ hash, count });
    }
  }
  
  return duplicates;
}

/**
 * Simple hash function
 */
function simpleHash(str){
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

