/**
 * Systems Thinking Framework
 * Stateful framework that guides the primary agent through understand interconnections and feedback loops
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class SystemsThinkingFramework extends CognitiveFramework {
  protected frameworkName = 'framework_systems_thinking';
  protected frameworkDescription = 'Understand interconnections and feedback loops';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# Systems Thinking Framework - Session Initialized

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
1. **Identify Components** - What are the parts of the system?
2. **Map Connections** - How do the parts interact?
3. **Find Feedback Loops** - What reinforces or balances?
4. **Identify Leverage Points** - Where can small changes have big impact?
5. **Predict Behavior** - How will the system evolve?

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new SystemsThinkingFramework();

// Use camelCase for exports to match import convention
const camelName = 'systems_thinking'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const systemsThinkingDescriptor = {
  name: 'framework_systems_thinking',
  description: 'Understand interconnections and feedback loops. Stateful framework that guides you through systematic analysis.',
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

export async function systemsThinkingTool(args, ctx){
  return framework.handle(args, ctx);
}
