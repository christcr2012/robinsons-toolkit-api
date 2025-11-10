/**
 * Main Synthesize-Execute-Critique-Refine Pipeline
 * 
 * This implements the battle-tested framework:
 * 1. Synthesize: Generate code + tests together (constrained to JSON schema)
 * 2. Execute: Build in sandbox with hard quality gates
 * 3. Critique: Judge with structured verdict
 * 4. Refine: Apply fixes and repeat until quality gates pass
 */

import {
  DEFAULT_PIPELINE_CONFIG,
  calculateWeightedScore,
  meetsAcceptanceCriteria,
} from './types.js';
import { runSandboxPipeline } from './sandbox.js';
import { judgeCode } from './judge.js';
import { generateCodeAndTests } from './synthesize.js';
import { applyFixPlan } from './refine.js';
import { isDockerAvailable, runDockerSandboxPipeline } from './docker-sandbox.js';

/**
 * Run the full pipeline for a task
 */
export async function iterateTask(
  spec,
  config: PipelineConfig = DEFAULT_PIPELINE_CONFIG
) {
  const maxAttempts = config.maxAttempts ?? DEFAULT_PIPELINE_CONFIG.maxAttempts;
  let attempt = 0;
  let best: { score; files: GenResult['files']; verdict: JudgeVerdict } | null = null;

  let currentSpec = spec;
  let previousVerdict: JudgeVerdict | undefined;

  // Track costs
  let totalCost = 0;
  const costBreakdown = { synthesize: 0, judge: 0, refine: 0 };

  // Check if Docker is available once at the start
  const dockerAvailable = await isDockerAvailable();
  if (dockerAvailable) {
    console.log('🐳 Docker sandbox available - using hermetic isolation');
  } else {
    console.log('⚠️  Docker not available - using local sandbox (less secure)');
  }

  while (attempt++  f.path),
        diffStats: {
          additions: genResult.files.reduce((sum, f) => sum + f.content.split('\n').length, 0),
          deletions: 0,
        },
      },
      modelNotes: genResult.notes ?? '',
    };

    const verdict = await judgeCode(judgeInput, genResult, config);

    // Track cost
    if (verdict.cost) {
      totalCost += verdict.cost;
      costBreakdown.judge += verdict.cost;
    }

    const score = calculateWeightedScore(verdict.scores, config.weights);
    
    console.log(`  📊 Score: ${(score * 100).toFixed(1)}% (threshold: ${(config.acceptThreshold ?? DEFAULT_PIPELINE_CONFIG.acceptThreshold) * 100}%)`);
    console.log(`  📋 Verdict: ${verdict.verdict}`);
    
    // Track best attempt
    if (!best || score > best.score) {
      best = { score, files: genResult.files, verdict };
    }
    
    // Check if we meet acceptance criteria
    if (meetsAcceptanceCriteria(verdict, config)) {
      console.log('  ✅ Accepted!');
      console.log(`  💰 Total cost: $${totalCost.toFixed(4)}`);
      return {
        ok: true,
        files: genResult.files,
        score,
        attempts: attempt,
        verdict,
        execReport: report,
        totalCost,
        costBreakdown,
      };
    }
    
    // 4. REFINE: Apply fixes for next iteration
    if (attempt  0) {
      issues.push(`Type errors:\n${report.typeErrors.slice(0, 5).join('\n')}`);
    }
  }
  
  // Test issues
  if (verdict.scores.tests_functional  0) {
      issues.push(`Test failures:\n${report.test.details.slice(0, 3).join('\n')}`);
    }
  }
  
  // Security issues
  if (verdict.scores.security === 0) {
    issues.push('CRITICAL: Security violations detected');
    if (report.security.violations.length > 0) {
      issues.push(`Violations:\n${report.security.violations.slice(0, 3).join('\n')}`);
    }
  }
  
  // Style issues
  if (verdict.scores.style  `${i + 1}. ${f.operation} ${f.file}: ${f.brief}`).join('\n')}

Generate CORRECTED code that fixes ALL these issues. Focus on:
1. Making the code compile and pass type checking
2. Ensuring all tests pass
3. Fixing security violations
4. Following the specification exactly

DO NOT repeat the same mistakes. Use REAL APIs only.
`;
  
  return feedback;
}

/**
 * Export all pipeline components
 */
export * from './types.js';
export * from './sandbox.js';
export * from './judge.js';
export * from './synthesize.js';
export * from './refine.js';

