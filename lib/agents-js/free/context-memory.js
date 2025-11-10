#!/usr/bin/env node
/**
 * Context Memory
 * 
 * Cache "Design Cards → accepted patches → judge rationales".
 * When new task is similar, pre-load "what worked last time".
 * Learn from past successes.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';






/**
 * Context Memory - Learn from past successes
 */
export class ContextMemory {
  private cacheDir;
  private index: Map = new Map();

  constructor(root) {
    this.cacheDir = path.join(root, '.agent', 'memory');
    this.ensureCacheDir();
    this.loadIndex();
  }

  /**
   * Remember a successful patch
   */
  remember(
    card: DesignCard,
    patch: Patch,
    verdict: JudgeVerdict,
    rationale,
    model,
    iterations){
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const hash = this.hashCard(card);

    const accepted: AcceptedPatch = {
      id,
      timestamp,
      card,
      patch,
      verdict,
      rationale,
      model,
      iterations,
      hash,
    };

    // Save to disk
    const filePath = path.join(this.cacheDir, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(accepted, null, 2));

    // Update index
    this.index.set(id, accepted);

    return id;
  }

  /**
   * Recall similar past tasks
   */
  recall(query: MemoryQuery): MemoryMatch[] {
    const limit = query.limit || 3;
    const minSimilarity = query.minSimilarity || 0.5;
    const queryHash = this.hashCard(query.card);

    const matches: MemoryMatch[] = [];

    for (const [id, patch] of this.index) {
      const similarity = this.calculateSimilarity(query.card, patch.card, queryHash, patch.hash);
      
      if (similarity >= minSimilarity) {
        matches.push({
          patch,
          similarity,
          reason: this.explainSimilarity(query.card, patch.card),
        });
      }
    }

    // Sort by similarity (descending)
    matches.sort((a, b) => b.similarity - a.similarity);

    return matches.slice(0, limit);
  }

  /**
   * Get all memories
   */
  getAll(): AcceptedPatch[] {
    return Array.from(this.index.values());
  }

  /**
   * Get memory by ID
   */
  get(id): AcceptedPatch | undefined {
    return this.index.get(id);
  }

  /**
   * Delete memory by ID
   */
  forget(id){
    const filePath = path.join(this.cacheDir, `${id}.json`);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      this.index.delete(id);
      return true;
    }
    
    return false;
  }

  /**
   * Clear all memories
   */
  clear(){
    for (const id of this.index.keys()) {
      this.forget(id);
    }
  }

  /**
   * Get statistics
   */
  getStats(): {
    total;
    byModel: Record;
    avgIterations;
    avgScore;
  } {
    const patches = Array.from(this.index.values());
    const total = patches.length;

    const byModel: Record = {};
    let totalIterations = 0;
    let totalScore = 0;

    for (const patch of patches) {
      byModel[patch.model] = (byModel[patch.model] || 0) + 1;
      totalIterations += patch.iterations;
      // Calculate overall score from verdict scores
      const scores = patch.verdict.scores;
      const overall = (
        scores.compilation +
        scores.tests_functional +
        scores.tests_edge +
        scores.types +
        scores.style +
        scores.security +
        (scores.boundaries || 0) +
        (scores.schema || 0)
      ) / 8;
      totalScore += overall;
    }

    return {
      total,
      byModel,
      avgIterations: total > 0 ? totalIterations / total : 0,
      avgScore: total > 0 ? totalScore / total : 0,
    };
  }

  /**
   * Ensure cache directory exists
   */
  private ensureCacheDir(){
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  /**
   * Load index from disk
   */
  private loadIndex(){
    if (!fs.existsSync(this.cacheDir)) {
      return;
    }

    const files = fs.readdirSync(this.cacheDir);

    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const filePath = path.join(this.cacheDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      try {
        const patch = JSON.parse(content) as AcceptedPatch;
        this.index.set(patch.id, patch);
      } catch (e) {
        console.warn(`Failed to load memory ${file}:`, e);
      }
    }
  }

  /**
   * Hash a design card for similarity matching
   */
  private hashCard(card: DesignCard){
    // Create a normalized representation
    const normalized = {
      goals: card.goals.map(g => g.toLowerCase().trim()).sort(),
      acceptance: card.acceptance.map(a => a.toLowerCase().trim()).sort(),
      constraints: card.constraints?.map(c => c.toLowerCase().trim()).sort() || [],
      interfaces: card.interfaces?.map(i => `${i.style}:${i.method || ''}:${i.path || ''}`).sort() || [],
    };

    const str = JSON.stringify(normalized);
    return crypto.createHash('sha256').update(str).digest('hex');
  }

  /**
   * Calculate similarity between two design cards
   */
  private calculateSimilarity(
    card1: DesignCard,
    card2: DesignCard,
    hash1,
    hash2){
    // Exact match
    if (hash1 === hash2) return 1.0;

    // Calculate Jaccard similarity on goals + acceptance
    const set1 = new Set([
      ...card1.goals.map(g => g.toLowerCase()),
      ...card1.acceptance.map(a => a.toLowerCase()),
    ]);

    const set2 = new Set([
      ...card2.goals.map(g => g.toLowerCase()),
      ...card2.acceptance.map(a => a.toLowerCase()),
    ]);

    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    const jaccardSimilarity = intersection.size / union.size;

    // Boost similarity if same interfaces
    let interfaceBoost = 0;
    if (card1.interfaces && card2.interfaces) {
      const iface1 = new Set(card1.interfaces.map(i => `${i.style}:${i.method || ''}:${i.path || ''}`));
      const iface2 = new Set(card2.interfaces.map(i => `${i.style}:${i.method || ''}:${i.path || ''}`));
      const ifaceIntersection = new Set([...iface1].filter(x => iface2.has(x)));
      interfaceBoost = ifaceIntersection.size > 0 ? 0.2 : 0;
    }

    return Math.min(1.0, jaccardSimilarity + interfaceBoost);
  }

  /**
   * Explain why two cards are similar
   */
  private explainSimilarity(card1: DesignCard, card2: DesignCard){
    const reasons = [];

    // Check goals overlap
    const goals1 = new Set(card1.goals.map(g => g.toLowerCase()));
    const goals2 = new Set(card2.goals.map(g => g.toLowerCase()));
    const goalsOverlap = [...goals1].filter(g => goals2.has(g));
    
    if (goalsOverlap.length > 0) {
      reasons.push(`Similar goals: ${goalsOverlap.slice(0, 2).join(', ')}`);
    }

    // Check acceptance overlap
    const acc1 = new Set(card1.acceptance.map(a => a.toLowerCase()));
    const acc2 = new Set(card2.acceptance.map(a => a.toLowerCase()));
    const accOverlap = [...acc1].filter(a => acc2.has(a));
    
    if (accOverlap.length > 0) {
      reasons.push(`Similar acceptance criteria: ${accOverlap.slice(0, 2).join(', ')}`);
    }

    // Check interfaces overlap
    if (card1.interfaces && card2.interfaces) {
      const iface1 = new Set(card1.interfaces.map(i => `${i.style}:${i.path || ''}`));
      const iface2 = new Set(card2.interfaces.map(i => `${i.style}:${i.path || ''}`));
      const ifaceOverlap = [...iface1].filter(i => iface2.has(i));

      if (ifaceOverlap.length > 0) {
        reasons.push(`Same interfaces: ${ifaceOverlap.join(', ')}`);
      }
    }

    return reasons.length > 0 ? reasons.join('; ') : 'General similarity';
  }
}

/**
 * Format memory matches for inclusion in prompt
 */
export function formatMemoryMatches(matches: MemoryMatch[]){
  if (matches.length === 0) {
    return 'No similar past tasks found.';
  }

  let formatted = `## Similar Past Tasks (${matches.length})\n\n`;
  formatted += `These tasks were successfully completed in the past. Use them as examples:\n\n`;

  for (let i = 0; i  0) {
      formatted += `**Example changes:**\n`;
      const exampleOps = patch.patch.ops.slice(0, 3);
      for (const op of exampleOps) {
        formatted += `- ${op.kind} in ${op.path}\n`;
      }
      if (patch.patch.ops.length > 3) {
        formatted += `- ... and ${patch.patch.ops.length - 3} more\n`;
      }
      formatted += `\n`;
    }
  }

  return formatted;
}

