/**
 * Workflow Planner
 * 
 * Produces dry-run plans before execution with safety rails
 */

export class WorkflowPlanner {
  /**
   * Create a plan for autonomous workflow
   */
  async createPlan(
    workflowName,
    steps,
    limits
  ) {
    const planSteps = steps.map((step, index) => ({
      stepNumber: index + 1,
      action: step.action || 'unknown',
      description: step.description || '',
      filesChanged: this.estimateFilesChanged(step),
      estimatedCredits: this.estimateCredits(step),
      estimatedTime: this.estimateTime(step),
      dependencies: step.dependencies || []
    }));

    const filesAffected = [...new Set(planSteps.flatMap(s => s.filesChanged))];
    const totalCredits = planSteps.reduce((sum, s) => sum + s.estimatedCredits, 0);
    const totalTime = planSteps.reduce((sum, s) => sum + s.estimatedTime, 0);

    const safetyChecks = this.runSafetyChecks(filesAffected, totalCredits, totalTime, limits);
    const risks = this.identifyRisks(planSteps, filesAffected, limits);

    return {
      id: `plan_${Date.now()}`,
      name: workflowName,
      steps: planSteps,
      estimatedCredits: totalCredits,
      estimatedTime: totalTime,
      filesAffected,
      safetyChecks,
      risks
    };
  }

  /**
   * Estimate files changed by a step
   */
  estimateFilesChanged(step) {
    if (step.files) return step.files;
    if (step.pattern) {
      // Estimate based on pattern (would use glob in real implementation)
      return [`${step.pattern} (estimated: 5-10 files)`];
    }
    return ['unknown'];
  }

  /**
   * Estimate credits for a step
   */
  estimateCredits(step){
    const action = step.action || '';
    
    // Credit estimates based on action type
    if (action.includes('generate')) return 1000;
    if (action.includes('analyze')) return 500;
    if (action.includes('refactor')) return 800;
    if (action.includes('test')) return 600;
    if (action.includes('template')) return 100; // Templates are cheap!
    
    return 500; // Default
  }

  /**
   * Estimate time for a step (seconds)
   */
  estimateTime(step){
    const action = step.action || '';
    
    if (action.includes('generate')) return 30;
    if (action.includes('analyze')) return 20;
    if (action.includes('refactor')) return 25;
    if (action.includes('test')) return 40;
    if (action.includes('template')) return 5; // Templates are fast!
    
    return 20; // Default
  }

  /**
   * Run safety checks
   */
  runSafetyChecks(
    filesAffected,
    totalCredits,
    totalTime,
    limits
  ) {
    const checks = [];

    // Check file count
    if (limits?.maxFilesChanged) {
      const fileCount = filesAffected.length;
      checks.push({
        name: 'File Count Limit',
        status: fileCount  
      f.includes('package.json') || 
      f.includes('tsconfig.json') ||
      f.includes('.env')
    );
    
    if (criticalFiles.length > 0) {
      checks.push({
        name: 'Critical Files',
        status: 'warn',
        message: `Modifying critical files: ${criticalFiles.join(', ')}`
      });
    }

    return checks;
  }

  /**
   * Identify risks
   */
  identifyRisks(
    steps,
    filesAffected,
    limits
  ) {
    const risks = [];

    // Large file count
    if (filesAffected.length > 20) {
      risks.push(`Large number of files affected (${filesAffected.length})`);
    }

    // Long execution time
    const totalTime = steps.reduce((sum, s) => sum + s.estimatedTime, 0);
    if (totalTime > 300) { // 5 minutes
      risks.push(`Long execution time (${Math.round(totalTime / 60)} minutes)`);
    }

    // High credit usage
    const totalCredits = steps.reduce((sum, s) => sum + s.estimatedCredits, 0);
    if (totalCredits > 10000) {
      risks.push(`High credit usage (${totalCredits} credits)`);
    }

    // Complex dependencies
    const maxDeps = Math.max(...steps.map(s => s.dependencies.length));
    if (maxDeps > 3) {
      risks.push('Complex step dependencies may cause issues');
    }

    return risks;
  }

  /**
   * Format plan for display
   */
  formatPlan(plan){
    let output = `\n📋 Workflow Plan: ${plan.name}\n`;
    output += `ID: ${plan.id}\n\n`;

    output += `📊 Summary:\n`;
    output += `  • Steps: ${plan.steps.length}\n`;
    output += `  • Files Affected: ${plan.filesAffected.length}\n`;
    output += `  • Estimated Credits: ${plan.estimatedCredits}\n`;
    output += `  • Estimated Time: ${Math.round(plan.estimatedTime / 60)} min ${plan.estimatedTime % 60} sec\n\n`;

    output += `🔍 Safety Checks:\n`;
    plan.safetyChecks.forEach(check => {
      const icon = check.status === 'pass' ? '✅' : check.status === 'warn' ? '⚠️' : '❌';
      output += `  ${icon} ${check.name}: ${check.message}\n`;
    });
    output += '\n';

    if (plan.risks.length > 0) {
      output += `⚠️  Risks:\n`;
      plan.risks.forEach(risk => {
        output += `  • ${risk}\n`;
      });
      output += '\n';
    }

    output += `📝 Steps:\n`;
    plan.steps.forEach(step => {
      output += `  ${step.stepNumber}. ${step.action}\n`;
      output += `     ${step.description}\n`;
      output += `     Files: ${step.filesChanged.join(', ')}\n`;
      output += `     Credits: ${step.estimatedCredits} | Time: ${step.estimatedTime}s\n`;
      if (step.dependencies.length > 0) {
        output += `     Depends on: ${step.dependencies.join(', ')}\n`;
      }
      output += '\n';
    });

    return output;
  }

  /**
   * Check if plan is safe to execute
   */
  canExecute(plan: WorkflowPlan, limits): {
    canExecute;
    reason?;
  } {
    // Check for failed safety checks
    const failedChecks = plan.safetyChecks.filter(c => c.status === 'fail');
    if (failedChecks.length > 0) {
      return {
        canExecute: false,
        reason: `Failed safety checks: ${failedChecks.map(c => c.name).join(', ')}`
      };
    }

    // Check if dry-run only
    if (limits?.dryRunOnly) {
      return {
        canExecute: false,
        reason: 'Dry-run mode enabled'
      };
    }

    // Check if approval required
    if (limits?.requireApproval) {
      return {
        canExecute: false,
        reason: 'Manual approval required'
      };
    }

    return { canExecute: true };
  }
}

