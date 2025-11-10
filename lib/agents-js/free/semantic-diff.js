#!/usr/bin/env node
/**
 * Semantic Diff
 * 
 * Diff by symbols (add/remove/rename) instead of lines.
 * Color risky ops (API, schema, concurrency).
 * Show in PR Quality Pack.
 */

import * from 'node:fs';

/**
 * Generate semantic diff between two versions of code
 */
export async function semanticDiff(
  oldContent,
  newContent,
  filePath) {
  // Parse both versions
  const oldSymbols = await parseSymbols(oldContent, filePath);
  const newSymbols = await parseSymbols(newContent, filePath);

  // Compare symbol tables
  const added = [];
  const removed = [];
  const modified = [];
  const renamed = [];

  // Find added symbols
  for (const newSym of newSymbols) {
    const oldSym = oldSymbols.find(s => s.name === newSym.name && s.type === newSym.type);
    if (!oldSym) {
      added.push(newSym);
    } else if (oldSym.signature !== newSym.signature) {
      modified.push(newSym);
    }
  }

  // Find removed symbols
  for (const oldSym of oldSymbols) {
    const newSym = newSymbols.find(s => s.name === oldSym.name && s.type === oldSym.type);
    if (!newSym) {
      removed.push(oldSym);
    }
  }

  // Detect renames (removed + added with similar signatures)
  for (const rem of removed) {
    for (const add of added) {
      if (rem.type === add.type && areSimilarSignatures(rem.signature, add.signature)) {
        renamed.push({
          from: rem.name,
          to: add.name,
          type: rem.type,
          file: filePath,
          confidence: calculateSignatureSimilarity(rem.signature, add.signature),
        });
      }
    }
  }

  // Remove detected renames from added/removed
  for (const rename of renamed) {
    const remIdx = removed.findIndex(s => s.name === rename.from);
    const addIdx = added.findIndex(s => s.name === rename.to);
    if (remIdx >= 0) removed.splice(remIdx, 1);
    if (addIdx >= 0) added.splice(addIdx, 1);
  }

  // Assess risk
  const { risk, riskFactors } = assessRisk(added, removed, renamed, modified);

  return {
    added,
    removed,
    renamed,
    modified,
    risk,
    riskFactors,
  };
}

/**
 * Parse symbols from code content
 */
async function parseSymbols(content, filePath) {
  const symbols = [];
  const lines = content.split('\n');

  // Simple regex-based symbol extraction (since lightweightSymbolIndexer expects a directory)
  // Extract function/class/interface/type declarations
  const patterns = [
    /(:export\s+)?(:async\s+)?function\s+(\w+)/g,
    /(:export\s+)?class\s+(\w+)/g,
    /(:export\s+)?interface\s+(\w+)/g,
    /(:export\s+)?type\s+(\w+)/g,
    /(:export\s+)?const\s+(\w+)/g,
  ];

  for (let lineNum = 0; lineNum  sig.replace(/\w+/g, '').replace(/\s+/g, '');
  
  const norm1 = normalize(sig1);
  const norm2 = normalize(sig2);
  
  return norm1 === norm2;
}

/**
 * Calculate signature similarity (0-1)
 */
function calculateSignatureSimilarity(sig1?, sig2?){
  if (!sig1 || !sig2) return 0;
  
  // Simple Levenshtein distance
  const distance = levenshteinDistance(sig1, sig2);
  const maxLen = Math.max(sig1.length, sig2.length);
  
  return 1 - (distance / maxLen);
}

/**
 * Levenshtein distance between two strings
 */
function levenshteinDistance(a, b){
  const matrix[] = [];

  for (let i = 0; i  s.visibility === 'public');
  const publicModified = modified.filter(s => s.visibility === 'public');
  
  if (publicRemoved.length > 0) {
    riskFactors.push(`Removed ${publicRemoved.length} API(s): ${publicRemoved.map(s => s.name).join(', ')}`);
    riskScore += publicRemoved.length * 3;
  }
  
  if (publicModified.length > 0) {
    riskFactors.push(`Modified ${publicModified.length} API(s): ${publicModified.map(s => s.name).join(', ')}`);
    riskScore += publicModified.length * 2;
  }

  // Schema changes are risky
  const schemaChanges = [...added, ...removed, ...modified].filter(s =>
    s.name.toLowerCase().includes('schema') ||
    s.name.toLowerCase().includes('migration') ||
    s.type === 'interface' ||
    s.type === 'type'
  );
  
  if (schemaChanges.length > 0) {
    riskFactors.push(`Schema/type changes: ${schemaChanges.length} symbols`);
    riskScore += schemaChanges.length;
  }

  // Concurrency changes are risky
  const concurrencyChanges = [...added, ...removed, ...modified].filter(s =>
    s.name.toLowerCase().includes('lock') ||
    s.name.toLowerCase().includes('mutex') ||
    s.name.toLowerCase().includes('async') ||
    s.name.toLowerCase().includes('promise')
  );
  
  if (concurrencyChanges.length > 0) {
    riskFactors.push(`Concurrency changes: ${concurrencyChanges.length} symbols`);
    riskScore += concurrencyChanges.length * 2;
  }

  // Renames are medium risk
  if (renamed.length > 0) {
    riskFactors.push(`Renamed ${renamed.length} symbol(s): ${renamed.map(r => `${r.from} → ${r.to}`).join(', ')}`);
    riskScore += renamed.length;
  }

  // Large number of changes is risky
  const totalChanges = added.length + removed.length + modified.length;
  if (totalChanges > 20) {
    riskFactors.push(`Large changeset: ${totalChanges} symbols changed`);
    riskScore += Math.floor(totalChanges / 10);
  }

  // Determine risk level
  let risk: 'low' | 'medium' | 'high';
  if (riskScore >= 10) {
    risk = 'high';
  } else if (riskScore >= 5) {
    risk = 'medium';
  } else {
    risk = 'low';
  }

  return { risk, riskFactors };
}

/**
 * Render semantic diff
 */
export function renderSemanticDiff(diff: SemanticDiff){
  let md = `## Semantic Diff\n\n`;
  md += `**Risk Level:** ${diff.risk.toUpperCase()}\n\n`;

  if (diff.riskFactors.length > 0) {
    md += `**Risk Factors:**\n`;
    for (const factor of diff.riskFactors) {
      md += `- ⚠️ ${factor}\n`;
    }
    md += `\n`;
  }

  if (diff.added.length > 0) {
    md += `### ✅ Added (${diff.added.length})\n\n`;
    for (const sym of diff.added) {
      md += `- \`${sym.name}\` (${sym.type}, ${sym.visibility}) at ${sym.file}:${sym.line}\n`;
    }
    md += `\n`;
  }

  if (diff.removed.length > 0) {
    md += `### ❌ Removed (${diff.removed.length})\n\n`;
    for (const sym of diff.removed) {
      md += `- \`${sym.name}\` (${sym.type}, ${sym.visibility}) at ${sym.file}:${sym.line}\n`;
    }
    md += `\n`;
  }

  if (diff.renamed.length > 0) {
    md += `### 🔄 Renamed (${diff.renamed.length})\n\n`;
    for (const rename of diff.renamed) {
      md += `- \`${rename.from}\` → \`${rename.to}\` (${rename.type}, confidence: ${(rename.confidence * 100).toFixed(0)}%)\n`;
    }
    md += `\n`;
  }

  if (diff.modified.length > 0) {
    md += `### 📝 Modified (${diff.modified.length})\n\n`;
    for (const sym of diff.modified) {
      md += `- \`${sym.name}\` (${sym.type}, ${sym.visibility}) at ${sym.file}:${sym.line}\n`;
    }
    md += `\n`;
  }

  return md;
}

/**
 * Generate semantic diff for multiple files
 */
export async function semanticDiffMultiFile(
  oldFiles,
  newFiles
) {
  const allDiffs = [];

  // Diff each file
  for (const [filePath, newContent] of newFiles) {
    const oldContent = oldFiles.get(filePath) || '';
    const diff = await semanticDiff(oldContent, newContent, filePath);
    allDiffs.push(diff);
  }

  // Merge all diffs
  return mergeDiffs(allDiffs);
}

/**
 * Merge multiple semantic diffs
 */
function mergeDiffs(diffs) {
  const merged: SemanticDiff = {
    added: [],
    removed: [],
    renamed: [],
    modified: [],
    risk: 'low',
    riskFactors: [],
  };

  for (const diff of diffs) {
    merged.added.push(...diff.added);
    merged.removed.push(...diff.removed);
    merged.renamed.push(...diff.renamed);
    merged.modified.push(...diff.modified);
    merged.riskFactors.push(...diff.riskFactors);
  }

  // Recalculate risk
  const { risk } = assessRisk(merged.added, merged.removed, merged.renamed, merged.modified);
  merged.risk = risk;

  return merged;
}

