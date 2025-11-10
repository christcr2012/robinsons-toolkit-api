/**
 * OODA Loop Framework
 * Stateful framework that guides the primary agent through observe, orient, decide, act decision cycle
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class OodaLoopFramework extends CognitiveFramework {
  protected frameworkName = 'framework_ooda_loop';
  protected frameworkDescription = 'Observe, Orient, Decide, Act decision cycle';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# OODA Loop Framework - Session Initialized

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
1. **Observe** - What is happening? Gather information.
2. **Orient** - What does it mean? Analyze and synthesize.
3. **Decide** - What should you do? Choose a course of action.
4. **Act** - Execute the decision and return to Observe.

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new OodaLoopFramework();

// Use camelCase for exports to match import convention
const camelName = 'ooda_loop'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const oodaLoopDescriptor = {
  name: 'framework_ooda_loop',
  description: 'Observe, Orient, Decide, Act decision cycle. Stateful framework that guides you through systematic analysis.',
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

export async function oodaLoopTool(args, ctx){
  return framework.handle(args, ctx);
}
