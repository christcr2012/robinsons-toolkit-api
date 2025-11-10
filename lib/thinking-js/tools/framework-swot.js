/**
 * SWOT Analysis Framework
 * Stateful framework that guides the primary agent through analyze strengths, weaknesses, opportunities, and threats
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class SwotFramework extends CognitiveFramework {
  protected frameworkName = 'framework_swot';
  protected frameworkDescription = 'Analyze Strengths, Weaknesses, Opportunities, and Threats';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# SWOT Analysis Framework - Session Initialized

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
1. **Strengths** - What advantages do you have?
2. **Weaknesses** - What areas need improvement?
3. **Opportunities** - What external factors can you leverage?
4. **Threats** - What external risks should you prepare for?

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new SwotFramework();

// Use camelCase for exports to match import convention
const camelName = 'swot'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const swotDescriptor = {
  name: 'framework_swot',
  description: 'Analyze Strengths, Weaknesses, Opportunities, and Threats. Stateful framework that guides you through systematic analysis.',
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

export async function swotTool(args, ctx){
  return framework.handle(args, ctx);
}
