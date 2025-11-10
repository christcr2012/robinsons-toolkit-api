/**
 * Socratic Questioning Framework
 * Stateful framework that guides the primary agent through deep inquiry through probing questions
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class SocraticFramework extends CognitiveFramework {
  protected frameworkName = 'framework_socratic';
  protected frameworkDescription = 'Deep inquiry through probing questions';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# Socratic Questioning Framework - Session Initialized

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
1. **Clarify Concepts** - What do you mean by that?
2. **Probe Assumptions** - What are you assuming?
3. **Probe Reasons** - Why do you think that?
4. **Consider Implications** - What follows from that?
5. **Question the Question** - Why is this question important?

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new SocraticFramework();

// Use camelCase for exports to match import convention
const camelName = 'socratic'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const socraticDescriptor = {
  name: 'framework_socratic',
  description: 'Deep inquiry through probing questions. Stateful framework that guides you through systematic analysis.',
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

export async function socraticTool(args, ctx){
  return framework.handle(args, ctx);
}
