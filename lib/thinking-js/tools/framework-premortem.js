/**
 * Premortem Analysis Framework
 * Stateful framework that guides the primary agent through imagine project failure and work backward
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class PremortemFramework extends CognitiveFramework {
  protected frameworkName = 'framework_premortem';
  protected frameworkDescription = 'Imagine project failure and work backward';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# Premortem Analysis Framework - Session Initialized

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
1. **Imagine Failure** - The project has failed. What happened?
2. **Identify Failure Modes** - What were the specific ways it failed?
3. **Trace Causes** - What led to each failure mode?
4. **Assess Likelihood** - How likely is each failure mode?
5. **Plan Mitigations** - How can you prevent each failure?

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new PremortemFramework();

// Use camelCase for exports to match import convention
const camelName = 'premortem'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const premortemDescriptor = {
  name: 'framework_premortem',
  description: 'Imagine project failure and work backward. Stateful framework that guides you through systematic analysis.',
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

export async function premortemTool(args, ctx){
  return framework.handle(args, ctx);
}
