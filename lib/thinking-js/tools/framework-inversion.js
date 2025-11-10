/**
 * Inversion Framework
 * Stateful framework that guides the primary agent through think backwards from failure to find solutions
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class InversionFramework extends CognitiveFramework {
  protected frameworkName = 'framework_inversion';
  protected frameworkDescription = 'Think backwards from failure to find solutions';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# Inversion Framework - Session Initialized

**Problem:** ${problem}
**Context:** ${context || 'None provided'}
**Total Steps:** ${totalSteps}
**Evidence Gathered:** ${evidence.length} items

## Evidence from Codebase

${evidence.slice(0, 5).map((e, i) => `${i + 1}. **${e.path}** (relevance: ${e.score.toFixed(2)})
   \`\`\`
   ${e.snippet.slice(0, 200)}...
   \`\`\``).join('\n\n')}

${evidence.length > 5 ? `\n*...and ${evidence.length - 5} more items*` : ''}

## Framework Guide

Use this framework to systematically analyze through ${totalSteps} steps:

**Suggested Approach:**
1. **Define Success** - What does success look like?
2. **Invert to Failure** - What would guarantee failure?
3. **Identify Anti-Patterns** - What behaviors/decisions lead to failure?
4. **Avoid Failure Modes** - How can you prevent each failure mode?

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new InversionFramework();

// Use camelCase for exports to match import convention
const camelName = 'inversion'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const inversionDescriptor = {
  name: 'framework_inversion',
  description: 'Think backwards from failure to find solutions. Stateful framework that guides you through systematic analysis.',
  inputSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      problem: { type: 'string', description: 'The problem or question to analyze' },
      context: { type: 'string', description: 'Additional context' },
      totalSteps: { type: 'number', description: 'Expected number of steps (default: 4)' },
      stepNumber: { type: 'number', description: 'Current step number (for recording steps)' },
      content: { type: 'string', description: 'Your analysis for this step' },
      nextStepNeeded: { type: 'boolean', description: 'Whether another step is needed' },
      metadata: { type: 'object', description: 'Optional metadata', additionalProperties: true }
    }
  }
};

export async function inversionTool(args, ctx){
  return framework.handle(args, ctx);
}
