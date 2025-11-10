#!/usr/bin/env node
/**
 * Merge-Conflict Resolver
 * 
 * Auto-rebase when changes drift.
 * Use Fixer to produce conflict-only patch.
 * Validate with lints/types/tests.
 */

import * from 'node:fs';
import * from 'node:path';
import { execSync } from 'node:child_process';

/**
 * Resolve merge conflicts automatically
 */
export async function resolveConflicts(
  root,
  baseBranch= 'main'
) {
  const errors = [];
  const warnings = [];
  const conflicts = [];
  
  try {
    // Check if we're in a git repo
    try {
      execSync('git rev-parse --git-dir', { cwd: root, stdio: 'ignore' });
    } catch {
      errors.push('Not a git repository');
      return { success: false, conflicts, errors, warnings };
    }
    
    // Try to rebase
    try {
      execSync(`git rebase origin/${baseBranch}`, { cwd: root, stdio: 'pipe' });
      // No conflicts!
      return { success: true, conflicts, errors, warnings };
    } catch (e) {
      // Rebase failed, likely due to conflicts
      warnings.push('Rebase failed, attempting to resolve conflicts');
    }
    
    // Extract conflict markers
    const conflictFiles = getConflictFiles(root);
    
    for (const file of conflictFiles) {
      const fileConflicts = extractConflictMarkers(root, file);
      conflicts.push(...fileConflicts);
    }
    
    if (conflicts.length === 0) {
      errors.push('Rebase failed but no conflict markers found');
      return { success: false, conflicts, errors, warnings };
    }
    
    // Generate resolution patch
    const patch = await generateResolutionPatch(root, conflicts);
    
    return { success: true, patch, conflicts, errors, warnings };
  } catch (e) {
    errors.push(`Conflict resolution failed: ${e.message}`);
    return { success: false, conflicts, errors, warnings };
  }
}

/**
 * Get list of files with conflicts
 */
function getConflictFiles(root) {
  try {
    const output = execSync('git diff --name-only --diff-filter=U', { cwd: root, encoding: 'utf-8' });
    return output.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Extract conflict markers from a file
 */
function extractConflictMarkers(root, file) {
  const markers = [];
  const filePath = path.join(root, file);
  
  if (!fs.existsSync(filePath)) {
    return markers;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  let inConflict = false;
  let conflictStart = 0;
  let separatorLine = 0;
  let oursLines = [];
  let theirsLines = [];
  
  for (let i = 0; i >>>>>>') && inConflict) {
      // End of conflict
      markers.push({
        file,
        startLine: conflictStart + 1,
        endLine: i + 1,
        ours: oursLines.join('\n'),
        theirs: theirsLines.join('\n'),
      });
      inConflict = false;
    } else if (inConflict) {
      if (separatorLine === 0) {
        oursLines.push(line);
      } else {
        theirsLines.push(line);
      }
    }
  }
  
  return markers;
}

/**
 * Generate resolution patch for conflicts
 */
async function generateResolutionPatch(
  root,
  conflicts
) {
  const ops = [];
  
  for (const conflict of conflicts) {
    // Simple resolution strategy: prefer ours, but merge if possible
    const resolution = resolveConflict(conflict);
    
    ops.push({
      kind: 'edit',
      path: conflict.file,
      find: `>>>>>> ${conflict.file}`,
      replace: resolution,
    });
  }
  
  return { ops };
}

/**
 * Resolve a single conflict
 */
function resolveConflict(conflict: ConflictMarker){
  // Strategy 1: If one side is empty, use the other
  if (!conflict.ours.trim()) {
    return conflict.theirs;
  }
  if (!conflict.theirs.trim()) {
    return conflict.ours;
  }
  
  // Strategy 2: If both sides are identical, use either
  if (conflict.ours === conflict.theirs) {
    return conflict.ours;
  }
  
  // Strategy 3: If one side is a superset of the other, use the superset
  if (conflict.ours.includes(conflict.theirs)) {
    return conflict.ours;
  }
  if (conflict.theirs.includes(conflict.ours)) {
    return conflict.theirs;
  }
  
  // Strategy 4: Try to merge line by line
  const oursLines = conflict.ours.split('\n');
  const theirsLines = conflict.theirs.split('\n');
  
  // Simple line-based merge
  const merged = mergeLinesSimple(oursLines, theirsLines);
  
  return merged.join('\n');
}

/**
 * Simple line-based merge
 */
function mergeLinesSimple(ours, theirs) {
  const merged = [];
  const oursSet = new Set(ours);
  const theirsSet = new Set(theirs);
  
  // Add lines that appear in both (common lines)
  for (const line of ours) {
    if (theirsSet.has(line)) {
      merged.push(line);
    }
  }
  
  // Add lines unique to ours
  for (const line of ours) {
    if (!theirsSet.has(line) && !merged.includes(line)) {
      merged.push(line);
    }
  }
  
  // Add lines unique to theirs
  for (const line of theirs) {
    if (!oursSet.has(line) && !merged.includes(line)) {
      merged.push(line);
    }
  }
  
  return merged;
}

/**
 * Abort rebase and return to original state
 */
export function abortRebase(root){
  try {
    execSync('git rebase --abort', { cwd: root, stdio: 'ignore' });
  } catch {
    // Already aborted or not in rebase
  }
}

/**
 * Continue rebase after resolving conflicts
 */
export function continueRebase(root){
  try {
    execSync('git rebase --continue', { cwd: root, stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if currently in a rebase
 */
export function isInRebase(root){
  try {
    const gitDir = execSync('git rev-parse --git-dir', { cwd: root, encoding: 'utf-8' }).trim();
    const rebaseMergeDir = path.join(root, gitDir, 'rebase-merge');
    const rebaseApplyDir = path.join(root, gitDir, 'rebase-apply');
    
    return fs.existsSync(rebaseMergeDir) || fs.existsSync(rebaseApplyDir);
  } catch {
    return false;
  }
}

/**
 * Get rebase status
 */
export function getRebaseStatus(root): {
  inRebase;
  currentCommit?;
  totalCommits?;
  conflictFiles?;
} {
  const inRebase = isInRebase(root);
  
  if (!inRebase) {
    return { inRebase: false };
  }
  
  try {
    const gitDir = execSync('git rev-parse --git-dir', { cwd: root, encoding: 'utf-8' }).trim();
    const rebaseMergeDir = path.join(root, gitDir, 'rebase-merge');
    
    let currentCommit;
    let totalCommits: number | undefined;
    
    if (fs.existsSync(rebaseMergeDir)) {
      const msgNumPath = path.join(rebaseMergeDir, 'msgnum');
      const endPath = path.join(rebaseMergeDir, 'end');
      
      if (fs.existsSync(msgNumPath)) {
        currentCommit = fs.readFileSync(msgNumPath, 'utf-8').trim();
      }
      if (fs.existsSync(endPath)) {
        totalCommits = parseInt(fs.readFileSync(endPath, 'utf-8').trim(), 10);
      }
    }
    
    const conflictFiles = getConflictFiles(root);
    
    return {
      inRebase: true,
      currentCommit,
      totalCommits,
      conflictFiles,
    };
  } catch {
    return { inRebase: true };
  }
}

/**
 * Render conflict resolution report
 */
export function renderConflictReport(resolution: ConflictResolution){
  let report = `## Merge Conflict Resolution\n\n`;
  
  if (resolution.success) {
    report += `✅ **Status:** Resolved successfully\n\n`;
  } else {
    report += `❌ **Status:** Failed to resolve\n\n`;
  }
  
  if (resolution.conflicts.length > 0) {
    report += `**Conflicts Found:** ${resolution.conflicts.length}\n\n`;
    
    for (const conflict of resolution.conflicts) {
      report += `### ${conflict.file} (lines ${conflict.startLine}-${conflict.endLine})\n\n`;
      report += `**Ours:**\n\`\`\`\n${conflict.ours}\n\`\`\`\n\n`;
      report += `**Theirs:**\n\`\`\`\n${conflict.theirs}\n\`\`\`\n\n`;
    }
  }
  
  if (resolution.errors.length > 0) {
    report += `**Errors:**\n`;
    for (const error of resolution.errors) {
      report += `- ❌ ${error}\n`;
    }
    report += `\n`;
  }
  
  if (resolution.warnings.length > 0) {
    report += `**Warnings:**\n`;
    for (const warning of resolution.warnings) {
      report += `- ⚠️ ${warning}\n`;
    }
    report += `\n`;
  }
  
  return report;
}

