/**
 * Bayesian Updating Framework
 * Stateful framework that guides the primary agent through update beliefs with new evidence
 * Based on Sequential Thinking pattern
 */

import { CognitiveFramework, type FrameworkInit, type FrameworkStepInput } from '../lib/framework-base.js';
class BayesianUpdatingFramework extends CognitiveFramework {
  protected frameworkName = 'framework_bayesian_updating';
  protected frameworkDescription = 'Update beliefs with new evidence';
  
  protected formatInitResponse(
    problem,
    context,
    totalSteps,
    evidence
  ){
    return `# Bayesian Updating Framework - Session Initialized

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
1. **Prior Belief** - What did you believe before?
2. **New Evidence** - What new information do you have?
3. **Likelihood** - How likely is this evidence given your belief?
4. **Update** - Apply Bayes' theorem to update your belief
5. **Posterior Belief** - What do you believe now?

For each step, provide:
- Step number
- Your analysis for this step
- Whether another step is needed

The framework will track your progress and maintain context.
`;
  }
}

const framework = new BayesianUpdatingFramework();

// Use camelCase for exports to match import convention
const camelName = 'bayesian_updating'.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const bayesianUpdatingDescriptor = {
  name: 'framework_bayesian_updating',
  description: 'Update beliefs with new evidence. Stateful framework that guides you through systematic analysis.',
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

export async function bayesianUpdatingTool(args, ctx){
  return framework.handle(args, ctx);
}
