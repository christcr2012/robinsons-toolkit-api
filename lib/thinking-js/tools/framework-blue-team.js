/**
 * Blue Team Framework
 * Stateful framework that guides the primary agent through defend against attacks and strengthen the plan
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class BlueTeamFramework extends CognitiveFramework {
  protected frameworkName = 'framework_blue_team';
  protected frameworkDescription = 'Defend against attacks and strengthen the plan';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# Blue Team Framework - Session Initialized

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
1. **Review Threats** - What attacks are possible?
2. **Design Defenses** - How can you prevent each attack?
3. **Implement Controls** - What specific controls are needed?
4. **Test Defenses** - How will you verify they work?
5. **Monitor & Respond** - How will you detect and respond to attacks?

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new BlueTeamFramework();

// Use camelCase for exports to match import convention
const camelName = 'blue_team'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const blueTeamDescriptor = {
  name: 'framework_blue_team',
  description: 'Defend against attacks and strengthen the plan. Stateful framework that guides you through systematic analysis.',
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

export async function blueTeamTool(args, ctx){
  return framework.handle(args, ctx);
}
