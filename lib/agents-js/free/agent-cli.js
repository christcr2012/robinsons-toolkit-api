#!/usr/bin/env node
/*
  agent-cli.ts – Orchestration-light CLI for Builder agent
  --------------------------------------------------------
  Thin wrapper that reads Design Cards and executes the Builder agent
  with hard quality gates.

  Usage:
    agent run --task                     # Run task from .agent/tasks/.yaml
    agent run --task                     # Run task from specific file
    agent fix --task                     # Re-run fix step only
    agent run --task  --dry-run          # Preview without writing
    agent run --task  --contracts-first  # Require schema changes first
    agent run --task  --explain          # Include rationale in artifacts

  Environment:
    OPENAI_API_KEY, ANTHROPIC_API_KEY, OLLAMA_HOST
*/

import * as path from 'path';
import * as fs from 'fs';
import { parseDesignCard, findDesignCard, designCardToTaskSpec } from './design-card.js';
import { buildProjectBrief } from '../utils/repo-portable-tools.js';
import { runPortablePipeline } from '../utils/repo-portable-runner.js';
import { applyPatch, evaluateCandidates } from '../utils/convention-score-patch.js';
import { makeJudgeInput, validateJudgeVerdict, validateFixerPatch, JUDGE_PROMPT, FIXER_PROMPT } from '../utils/judge-fixer-prompts.js';
// Model adapter (user must wire this)
async function callModel(opts: { system; input; model?: string }){
  // TODO: Wire to your model provider (OpenAI, Anthropic, Ollama)
  // Example:
  // const { OpenAIAdapter } = require('./model-adapters');
  // const adapter = new OpenAIAdapter();
  // return await adapter.generateJSON(opts);
  
  throw new Error('callModel() not implemented. Wire this to your model provider (see model-adapters.ts)');
}

type RunOptions = {
  task;
  budget?;
  dryRun?;
  contractsFirst?;
  explain?;
  models?;
};

async function runTask(root, opts: RunOptions) {
  console.log('[agent] Starting Builder agent...');
  console.log(`[agent] Root: ${root}`);
  console.log(`[agent] Task: ${opts.task}`);
  
  // 1. Load Design Card
  console.log('[agent] Loading Design Card...');
  const cardPath = opts.task.includes('/') ? opts.task : findDesignCard(opts.task, root);
  const card = parseDesignCard(cardPath);
  console.log(`[agent] Loaded: ${card.name}`);
  
  // 2. Build Project Brief
  console.log('[agent] Building project brief...');
  const brief = await buildProjectBrief(root);
  console.log(`[agent] Detected: ${brief.capabilities.langs.join(', ')}`);
  console.log(`[agent] Naming: var=${brief.naming.var}, type=${brief.naming.type}, const=${brief.naming.const}`);
  
  // 3. Convert Design Card to task spec
  const spec = designCardToTaskSpec(card, brief);
  
  if (opts.dryRun) {
    console.log('\n[agent] DRY RUN - Task Specification:');
    console.log('─'.repeat(80));
    console.log(spec);
    console.log('─'.repeat(80));
    console.log('\n[agent] Dry run complete - no code generated');
    return;
  }
  
  // 4. Generate candidates (TODO: implement N candidates)
  console.log('[agent] Generating candidate...');
  const candidate: GeneratedCandidate = await callModel({
    system: 'You are a code generator. Generate working code based on the specification.',
    input: { spec, brief }
  });
  
  // 5. Write to sandbox
  const sandboxDir = path.join(root, '.agent', 'sandbox', path.basename(cardPath, path.extname(cardPath)));
  fs.mkdirSync(sandboxDir, { recursive: true });
  
  for (const file of candidate.files || []) {
    const filePath = path.join(sandboxDir, file.path);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, file.content, 'utf-8');
  }
  
  for (const test of candidate.tests || []) {
    const testPath = path.join(sandboxDir, test.path);
    fs.mkdirSync(path.dirname(testPath), { recursive: true });
    fs.writeFileSync(testPath, test.content, 'utf-8');
  }
  
  // 6. Run quality gates
  console.log('[agent] Running quality gates...');
  let exec = await runPortablePipeline(sandboxDir);
  
  // 7. Judge
  console.log('[agent] Judging candidate...');
  const judgeInput = makeJudgeInput({ spec, brief, exec, modelNotes: candidate.notes });
  let judgeRaw = await callModel({ system: JUDGE_PROMPT, input: judgeInput });
  let judge = validateJudgeVerdict(judgeRaw);
  
  if (!judge.ok) {
    throw new Error(`Invalid judge verdict:\n${judge.errors?.join('\n')}`);
  }
  
  const verdict = judgeRaw as JudgeVerdict;
  console.log(`[agent] Verdict: ${verdict.verdict}`);
  
  // 8. Fix loop
  const maxIterations = opts.budget || 4;
  let iteration = 0;
  
  while (verdict.verdict === 'revise' && iteration  {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage:
  agent run --task                     # Run task from .agent/tasks/.yaml
  agent run --task                     # Run task from specific file
  agent fix --task                     # Re-run fix step only
  agent run --task  --dry-run          # Preview without writing
  agent run --task  --contracts-first  # Require schema changes first
  agent run --task  --explain          # Include rationale in artifacts
  agent run --task  --budget 4         # Max fix iterations (default: 4)

Environment:
  OPENAI_API_KEY, ANTHROPIC_API_KEY, OLLAMA_HOST
    `);
    process.exit(0);
  }
  
  const command = args[0];
  const taskIndex = args.indexOf('--task');
  
  if (taskIndex === -1 || !args[taskIndex + 1]) {
    console.error('Error: --task  required');
    process.exit(1);
  }
  
  const opts: RunOptions = {
    task: args[taskIndex + 1],
    budget: args.includes('--budget') ? parseInt(args[args.indexOf('--budget') + 1], 10) : 4,
    dryRun: args.includes('--dry-run'),
    contractsFirst: args.includes('--contracts-first'),
    explain: args.includes('--explain'),
  };
  
  const root = process.cwd();
  
  try {
    if (command === 'run') {
      await runTask(root, opts);
    } else if (command === 'fix') {
      await fixTask(root, opts);
    } else {
      console.error(`Unknown command: ${command}`);
      process.exit(1);
    }
  } catch (e) {
    console.error('[agent] Error:', e);
    process.exit(1);
  }
})();

