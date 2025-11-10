/**
 * Root Cause Analysis Framework
 * Stateful framework that guides the primary agent through use 5 whys technique to find underlying causes
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class RootCauseFramework extends CognitiveFramework {
  protected frameworkName = 'framework_root_cause';
  protected frameworkDescription = 'Use 5 Whys technique to find underlying causes';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# Root Cause Analysis Framework - Session Initialized

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
1. **Why #1** - Why did this problem occur?
2. **Why #2** - Why did that cause happen?
3. **Why #3** - Why did that deeper cause happen?
4. **Why #4** - Why did that even deeper cause happen?
5. **Why #5** - What is the root cause?

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new RootCauseFramework();

// Use camelCase for exports to match import convention
const camelName = 'root_cause'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const rootCauseDescriptor = {
  name: 'framework_root_cause',
  description: 'Use 5 Whys technique to find underlying causes. Stateful framework that guides you through systematic analysis.',
  inputSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      problem: { type: 'string', description: 'The problem or question to analyze' },
      context: { type: 'string', description: 'Additional context' },
      totalSteps: { type: 'number', description: 'Expected number of steps (default: 5)' },
      stepNumber: { type: 'number', description: 'Current step number (for recording steps)' },
      content: { type: 'string', description: 'Your analysis for this step' },
      nextStepNeeded: { type: 'boolean', description: 'Whether another step is needed' },
      metadata: { type: 'object', description: 'Optional metadata', additionalProperties: true }
    }
  }
};

export async function rootCauseTool(args, ctx){
  return framework.handle(args, ctx);
}
