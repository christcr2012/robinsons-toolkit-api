/**
 * Core types for the Synthesize-Execute-Critique-Refine pipeline
 * 
 * This implements a battle-tested framework for generating real, working code:
 * 1. Synthesize: Generate code + tests together
 * 2. Execute: Build in sandbox with hard quality gates
 * 3. Critique: Judge with structured verdict
 * 4. Refine: Apply fixes and repeat
 */

/**
 * Result from the Synthesize (Coder) stage
 */

/**
 * Report from the Execute (Runner) stage
 */

/**
 * Structured verdict from the Critique (Judge) stage
 */

/**
 * Configuration for the pipeline
 */

/**
 * Final result from the pipeline
 */

/**
 * Input to the judge
 */

/**
 * Default pipeline configuration
 */
export const DEFAULT_PIPELINE_CONFIG: Required = {
  maxAttempts: 5,
  acceptThreshold: 0.9,
  weights: {
    compilation: 0.15,
    tests_functional: 0.25,
    tests_edge: 0.15,
    types: 0.1,
    security: 0.1,
    style: 0.05,
    conventions: 0.2,
  },
  allowedLibraries: [
    // Node.js built-ins
    'fs', 'path', 'util', 'crypto', 'stream', 'events', 'buffer',
    // Common safe libraries
    'lodash', 'axios', 'express', 'react', 'vue', 'next',
    // Testing
    'jest', '@jest/globals', 'vitest', 'mocha', 'chai',
    // TypeScript
    'typescript', '@types/*',
  ],
  minCoverage: 80,
  testTimeout: 5000,
  globalTimeout: 30000,
  memoryLimit: 512,
  spec: '',
  provider: 'ollama',
  model: 'qwen2.5-coder:7b',
};

/**
 * Calculate weighted score from judge scores
 */
export function calculateWeightedScore(
  scores: JudgeVerdict['scores'],
  weights: PipelineConfig['weights'] = DEFAULT_PIPELINE_CONFIG.weights
){
  const w = weights!;
  return (
    scores.compilation * w.compilation +
    scores.tests_functional * w.tests_functional +
    scores.tests_edge * w.tests_edge +
    scores.types * w.types +
    scores.style * w.style +
    scores.security * w.security +
    (scores.conventions || 0) * (w.conventions || 0)
  );
}

/**
 * Check if verdict meets acceptance criteria
 */
export function meetsAcceptanceCriteria(
  verdict: JudgeVerdict,
  config: PipelineConfig = DEFAULT_PIPELINE_CONFIG
){
  const score = calculateWeightedScore(verdict.scores, config.weights);
  
  // Must meet threshold
  if (score < (config.acceptThreshold ?? DEFAULT_PIPELINE_CONFIG.acceptThreshold)) {
    return false;
  }
  
  // Must have no zeros on critical gates
  if (verdict.scores.compilation === 0) return false;
  if (verdict.scores.security === 0) return false;
  
  return true;
}

