/**
 * Cynefin Framework Framework
 * Stateful framework that guides the primary agent through categorize problems by complexity
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class CynefinFrameworkFramework extends CognitiveFramework {
  protected frameworkName = 'framework_cynefin_framework';
  protected frameworkDescription = 'Categorize problems by complexity';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# Cynefin Framework Framework - Session Initialized

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
1. **Assess Domain** - Is this Clear, Complicated, Complex, Chaotic, or Confused?
2. **Clear Domain** - Best practices apply (sense-categorize-respond)
3. **Complicated Domain** - Expert analysis needed (sense-analyze-respond)
4. **Complex Domain** - Probe and adapt (probe-sense-respond)
5. **Chaotic Domain** - Act immediately (act-sense-respond)

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new CynefinFrameworkFramework();

// Use camelCase for exports to match import convention
const camelName = 'cynefin_framework'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const cynefinFrameworkDescriptor = {
  name: 'framework_cynefin_framework',
  description: 'Categorize problems by complexity. Stateful framework that guides you through systematic analysis.',
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

export async function cynefinFrameworkTool(args, ctx){
  return framework.handle(args, ctx);
}
