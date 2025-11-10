/**
 * Lateral Thinking Framework
 * Stateful framework that guides the primary agent through generate creative, non-obvious solutions
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class LateralThinkingFramework extends CognitiveFramework {
  protected frameworkName = 'framework_lateral_thinking';
  protected frameworkDescription = 'Generate creative, non-obvious solutions';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# Lateral Thinking Framework - Session Initialized

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
1. **Reframe the Problem** - How else could you look at this?
2. **Challenge Assumptions** - What if the opposite were true?
3. **Random Input** - What unrelated concepts could apply?
4. **Provocation** - What impossible ideas spark new thinking?
5. **Harvest Ideas** - What practical solutions emerged?

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new LateralThinkingFramework();

// Use camelCase for exports to match import convention
const camelName = 'lateral_thinking'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const lateralThinkingDescriptor = {
  name: 'framework_lateral_thinking',
  description: 'Generate creative, non-obvious solutions. Stateful framework that guides you through systematic analysis.',
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

export async function lateralThinkingTool(args, ctx){
  return framework.handle(args, ctx);
}
