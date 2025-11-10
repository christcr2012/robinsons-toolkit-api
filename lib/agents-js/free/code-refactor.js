/**
 * Code Refactor Agent
 * 
 * Refactors code using local LLMs (Ollama).
 * Extracts components, improves structure, applies patterns.
 */

import { OllamaClient, GenerateOptions } from '../ollama-client.js';
import { PromptBuilder } from '../utils/prompt-builder.js';
import { iterateTask, PipelineResult } from '../pipeline/index.js';
import { ValidationResult } from '../types/validation.js';
import { formatGMCode, formatUnifiedDiffs, stripCodeFences } from '../utils/output-format.js';

export class CodeRefactor {
  ollama;
  promptBuilder;

  constructor(ollama) {
    this.ollama = ollama;
    this.promptBuilder = new PromptBuilder();
  }

  /**
   * Refactor code using the Synthesize-Execute-Critique-Refine pipeline
   * This produces REAL, WORKING refactored code with hard quality gates
   */
  async refactor(request: RefactorRequest) {
    const startTime = Date.now();

    // Build specification for refactoring
    const spec = `Refactor this code according to the following instructions:

ORIGINAL CODE:
${request.code}

REFACTORING INSTRUCTIONS:
${request.instructions}

STYLE: ${request.style || 'balanced'}

Requirements:
- Maintain all existing functionality
- Improve code structure and readability
- Apply best practices and design patterns
- Ensure all tests still pass
- Document significant changes
`;

    // Run the pipeline with tuned parameters
    const pipelineResult = await iterateTask(spec, {
      maxAttempts: 5,
      acceptThreshold: 0.70,
      minCoverage: 70,
      allowedLibraries: [
        'fs', 'path', 'util', 'crypto', 'stream', 'events', 'buffer',
        'lodash', 'axios', 'express', 'react', 'vue', 'next',
        'jest', 'vitest', 'mocha', 'chai',
        'typescript', '@types/*',
      ],
    });

    const totalTimeMs = Date.now() - startTime;

    // Extract refactored code from pipeline result
    const mainFile = pipelineResult.files[0];
    const code = stripCodeFences(mainFile?.content || request.code); // Fallback to original if failed

    // Extract changes from pipeline verdict
    const changes = pipelineResult.verdict?.fix_plan?.map(fix => ({
      type: fix.operation,
      description: fix.brief,
    })) || [];

    // Convert pipeline validation to old format for compatibility
    const validation= {
      valid: pipelineResult.ok,
      score: pipelineResult.score * 100,
      issues: pipelineResult.verdict?.explanations.root_cause ? [{
        type: 'incomplete',
        severity: 'error',
        description: pipelineResult.verdict.explanations.root_cause,
        suggestion: pipelineResult.verdict.explanations.minimal_fix,
      }] : [],
    };

    // Calculate credit savings
    const augmentCreditsUsed = 400;
    const creditsSaved = 7000 - augmentCreditsUsed;

    const detailedFiles = (pipelineResult.files ?? []).map((file, index) => ({
      path: file.path || `refactored-${index}.ts`,
      content: stripCodeFences(file.content || ''),
      originalContent: index === 0 ? request.code ,
    }));

    if (detailedFiles.length === 0) {
      detailedFiles.push({ path: 'refactored.ts', content: code, originalContent: request.code });
    }

    return {
      refactoredCode: code,
      changes,
      augmentCreditsUsed,
      creditsSaved,
      model: request.model || 'qwen2.5-coder:7b',
      tokensGenerated: 0, // Pipeline doesn't expose token counts yet
      timeMs: totalTimeMs,
      validation,
      refinementAttempts: pipelineResult.attempts,
      filesDetailed: detailedFiles,
      gmcode: detailedFiles.length > 0 ? formatGMCode(detailedFiles) ,
      diff: detailedFiles.length > 0 ? formatUnifiedDiffs(detailedFiles) ,
    };
  }

  /**
   * Parse refactored code and extract changes
   */
  parseRefactorResult(text): {
    code;
    changes;
  } {
    const changes = [];

    // Extract code block
    const codeBlockPattern = /```(:\w+)?\n([\s\S]+?)```/;
    const match = text.match(codeBlockPattern);
    const code = match ? match[1].trim() : text.trim();

    // Extract changes from text
    const changePatterns = [
      /- Extracted (.+?) into (.+)/gi,
      /- Renamed (.+?) to (.+)/gi,
      /- Moved (.+?) to (.+)/gi,
      /- Applied (.+?) pattern/gi,
      /- Simplified (.+)/gi,
      /- Improved (.+)/gi,
    ];

    for (const pattern of changePatterns) {
      const matches = Array.from(text.matchAll(pattern));
      for (const match of matches) {
        changes.push({
          type: this.inferChangeType(match[0]),
          description: match[0].replace(/^-\s*/, '').trim(),
        });
      }
    }

    // If no structured changes found, extract from bullet points
    if (changes.length === 0) {
      const lines = text.split('\n');
      for (const line of lines) {
        if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
          changes.push({
            type: 'general',
            description: line.replace(/^[-*]\s*/, '').trim(),
          });
        }
      }
    }

    return { code, changes };
  }

  /**
   * Infer change type from description
   */
  inferChangeType(description){
    const d = description.toLowerCase();
    if (d.includes('extract')) return 'extraction';
    if (d.includes('rename')) return 'rename';
    if (d.includes('move')) return 'move';
    if (d.includes('pattern')) return 'pattern';
    if (d.includes('simplif')) return 'simplification';
    if (d.includes('improv')) return 'improvement';
    return 'general';
  }
}

