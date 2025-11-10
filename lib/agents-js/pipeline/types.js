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
>;

  /** Test files to write */
  tests: Array;

  /** Naming conventions used (maps new identifiers to existing repo patterns) */
  conventions_used?: Array;

  /** Optional notes from the model about known gaps or decisions */
  notes?;

  /** Cost of this generation (from LLM API) */
  cost?;
}

/**
 * Report from the Execute (Runner) stage
 */
;
  
  /** Security violations */
  security: {
    violations;
  };
  
  /** Last 50 lines of logs (redacted) */
  logsTail;
}

/**
 * Structured verdict from the Critique (Judge) stage
 */
;
  
  /** Human-readable explanations */
  explanations: {
    /** Root cause of failures */
    root_cause;
    
    /** Minimal fix needed */
    minimal_fix;
  };
  
  /** Structured fix plan for the Refine stage */
  fix_plan: Array;

  /** Cost of this judgment (from LLM API) */
  cost?;
}

/**
 * Configuration for the pipeline
 */
;

  /** Allowed libraries/imports (security allowlist) */
  allowedLibraries?;

  /** Minimum code coverage percentage */
  minCoverage?;

  /** Model provider to use (default: 'ollama' for FREE agent, 'openai' for PAID agent) */
  provider?: 'ollama' | 'openai' | 'claude';

  /** Specific model to use (e.g., 'gpt-4o', 'claude-3-5-sonnet-20241022', 'qwen2.5-coder:7b') */
  model?;
  
  /** Timeout per test (ms) */
  testTimeout?;
  
  /** Global timeout for all tests (ms) */
  globalTimeout?;

  /** Memory limit (MB) */
  memoryLimit?;

  /** Task specification (for inferring allowed paths) */
  spec?;
}

/**
 * Final result from the pipeline
 */
>;

  /** Final weighted score */
  score;

  /** Number of refinement attempts */
  attempts;

  /** Final verdict */
  verdict?: JudgeVerdict;

  /** Execution report from final attempt */
  report?: ExecReport;

  /** Total cost from all LLM calls */
  totalCost?;

  /** Cost breakdown by stage */
  costBreakdown?: {
    synthesize;
    judge;
    refine;
  };

  /** Execution report from final attempt (for debugging) */
  execReport?: ExecReport;
}

/**
 * Input to the judge
 */
;
  };
  
  /** Model's self-report */
  modelNotes;
}

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

