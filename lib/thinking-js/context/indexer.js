import fg from 'fast-glob';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { embedBatch } from './embedding.js';
import {
  ensureDirs, saveChunk, saveEmbedding, saveStats, saveDocs,
  loadFileMap, saveFileMap, deleteChunksForFile,
  getCachedVec, putCachedVec, sha, getStats,
  contextRootPath,
  type StoredDoc
} from './store.js';
import { Chunk, IndexStats } from './types.js';
import { extractDocRecord } from './docs/extract.js';
import { extractSymbols } from './symbols.js';
import { gitChangesSince, fsDiffFallback } from './git/changes.js';
import { loadContextConfig } from './config.js';
import { BehaviorMemory } from './memory/behavior.js';
import { ArchitectureMemory } from './memory/architecture.js';
import { StyleLearner } from './memory/style.js';

const MAXCH = parseInt(process.env.CTX_MAX_CHARS_PER_CHUNK || '1200', 10);

const CODE_ALIAS: Record = {
  '.tsx': '.ts',
  '.jsx': '.js',
  '.mjs': '.js',
  '.cjs': '.js',
  '.cts': '.ts',
  '.mts': '.ts',
  '.hpp': '.cpp',
  '.hxx': '.cpp',
  '.hh': '.cpp',
  '.ipp': '.cpp',
  '.cc': '.cpp',
  '.cxx': '.cpp',
  '.hhp': '.cpp',
  '.h': '.c',
  '.mm': '.m',
};

const CODE_EXTENSIONS = new Set([
  '.ts', '.js', '.py', '.go', '.java', '.kt', '.kts', '.rs', '.cpp', '.c', '.cs',
  '.rb', '.php', '.swift', '.scala', '.m', '.mm', '.hs', '.ps1', '.sh', '.vue', '.svelte'
]);

const BRACE_LANGS = new Set([
  '.ts', '.js', '.go', '.java', '.kt', '.kts', '.rs', '.cpp', '.c', '.cs', '.php', '.swift', '.scala', '.m', '.mm', '.vue', '.svelte'
]);

const INDENT_LANGS = new Set(['.py', '.rb', '.hs']);

;

const DOC_EXTENSIONS = new Set(['.md', '.mdx', '.rst', '.txt', '.adoc']);

/**
 * Resolve workspace root (MCP-aware)
 * In MCP environment, process.cwd() returns VS Code install dir, not workspace!
 */
function resolveWorkspaceRoot(){
  // Try environment variables first (set by MCP config)
  const envRoot = process.env.WORKSPACE_ROOT ||
                  process.env.AUGMENT_WORKSPACE_ROOT ||
                  process.env.VSCODE_WORKSPACE ||
                  process.env.INIT_CWD;

  if (envRoot && fs.existsSync(envRoot)) {
    console.log(`[indexer] Using workspace root from env: ${envRoot}`);
    return envRoot;
  }

  // Fallback to process.cwd() (works in CLI, breaks in MCP)
  const cwd = process.cwd();
  console.log(`[indexer] Using process.cwd(): ${cwd}`);
  return cwd;
}

// Don't resolve at module load time - env vars might not be set yet!
// Resolve inside indexRepo() instead

const INCLUDE = ['**/*.{ts,tsx,cts,mts,js,jsx,mjs,cjs,md,mdx,json,yml,yaml,sql,py,sh,ps1,go,java,kt,kts,rs,cpp,cc,cxx,c,h,hpp,hxx,ipp,cs,rb,php,swift,scala,m,mm,hs,vue,svelte}'];
const EXCLUDE = process.env.RCE_IGNORE
  ? process.env.RCE_IGNORE.split(',').map(s => s.trim())
  : [
      '**/node_modules/**',
      '**/.git/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/.venv*/**',
      '**/venv/**',
      '**/__pycache__/**',
      '**/.pytest_cache/**',
      '**/site-packages/**',
      '**/.augment/**',
      '**/.robinson/**',
      '**/.backups/**',
      '**/.training/**',
      '**/sandbox/**',
      '**/*.db',
      '**/*.db-shm',
      '**/*.db-wal',
      '**/.rce_index/**'
    ];

// sha() is now imported from store.js

/**
 * Code-aware chunking that keeps method/function bodies intact
 * "Stickier" version - tries harder to keep implementations together
 */
function normalizeExt(ext){
  const lower = ext.toLowerCase();
  return CODE_ALIAS[lower] ?? lower;
}

function isDeclarationLineNormalized(ext, line){
  const matchers = DECLARATION_MATCHERS[ext];
  if (!matchers) return false;
  return matchers.some(matcher => {
    try {
      return matcher(line);
    } catch {
      return false;
    }
  });
}

function estimateIndent(line){
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function chunkByHeuristics(filePath, text): { start; end; text: string }[] {
  const ext = path.extname(filePath).toLowerCase();
  const normalizedExt = normalizeExt(ext);
  const isCode = CODE_EXTENSIONS.has(normalizedExt);

  if (isCode) {
    const out: { start; end; text: string }[] = [];
    const lines = text.split(/\r?\n/);
    let buf = [];
    let bufStart = 1;
    let depth = 0;
    let hard = 0;
    const usesBraces = BRACE_LANGS.has(normalizedExt);
    const usesIndentation = INDENT_LANGS.has(normalizedExt);
    const softLimit = usesIndentation ? 100 : 140;
    const hardLimit = usesIndentation ? 200 : 220;

    const flush = () => {
      if (buf.length) {
        out.push({
          start: bufStart,
          end: bufStart + buf.length - 1,
          text: buf.join('\n')
        });
        buf = [];
        hard = 0;
      }
    };

    for (let i = 0; i = 20) || hard >= hardLimit || (depth === 0 && hard >= softLimit)) {
          flush();
        }
      } else if (usesIndentation) {
        if ((decl && buf.length >= 10) || (blank && buf.length >= 24) || hard >= hardLimit || indent === 0 && buf.length >= softLimit) {
          flush();
        }
      } else {
        if ((decl && buf.length >= 16) || (blank && buf.length >= 32) || hard >= hardLimit) {
          flush();
        }
      }
    }

    flush();
    return out.filter(s => s.text.trim().length > 0);
  }

  // docs: paragraph/windowed
  const paragraphs = text.split(/\n{2,}/);
  const out: { start; end; text: string }[] = [];
  let lineNum = 1;
  const chunkSize = Math.max(200, Math.min(MAXCH, 1600));

  for (const para of paragraphs) {
    const paraLines = para.split(/\r?\n/).length;
    if (para.length > chunkSize) {
      for (let offset = 0; offset  0) {
      out.push({ start: lineNum, end: lineNum + paraLines - 1, text: para });
      lineNum += paraLines;
    }
    lineNum += 2;
  }
  return out.filter(chunk => chunk.text.trim().length > 0);
}

function directorySize(p){
  try {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      return fs.readdirSync(p).reduce((total, entry) => total + directorySize(path.join(p, entry)), 0);
    }
    return stat.size;
  } catch {
    return 0;
  }
}

function enforceStorageBudget(root, storage: ContextConfig['storage']){
  const sizeBytes = directorySize(root);
  const sizeMb = sizeBytes / (1024 * 1024);

  if (storage.maxDiskUsageMb > 0 && sizeMb > storage.maxDiskUsageMb) {
    if (storage.autoCleanup) {
      const embedCache = path.join(root, 'embed-cache');
      console.warn(`⚠️ [indexRepo] Context store is ${sizeMb.toFixed(1)}MB (limit ${storage.maxDiskUsageMb}MB). Pruning embed cache...`);
      try {
        fs.rmSync(embedCache, { recursive: true, force: true });
        fs.mkdirSync(embedCache, { recursive: true });
      } catch (error) {
        console.warn(`⚠️ [indexRepo] Failed to prune embed cache: ${error?.message ?? error}`);
      }
      const postCleanup = directorySize(root) / (1024 * 1024);
      return postCleanup;
    }

    console.warn(`⚠️ [indexRepo] Context store is ${sizeMb.toFixed(1)}MB. Set RCE_STORAGE_AUTOCLEAN=1 or raise RCE_STORAGE_LIMIT_MB to suppress.`);
  }

  return sizeMb;
}

export async function indexRepo(
  repoRoot?,
  opts: { quick?; force?; include? } = {}
){
  try {
    // Resolve workspace root NOW (not at module load time) so env vars are available
    if (!repoRoot) {
      repoRoot = resolveWorkspaceRoot();
    }

    const start = Date.now();
    const config = await loadContextConfig();
    const targets = opts.include?.map(rel => rel.trim()).filter(Boolean) ?? null;
    const quickMode = opts.quick !== false && !targets;
    const TTL_MIN = config.indexing.ttlMinutes;
    const maxChanged = config.indexing.maxChangedFiles;
    const embedModel = config.embedding.model;
    const embedProvider = config.embedding.provider;
    const compressChunks = config.storage.compressionEnabled;
    const quickBudget = config.indexing.quickFileLimit;

    console.log(`[indexRepo] Starting ${targets ? 'targeted' : quickMode ? 'incremental' : 'full'} indexing for: ${repoRoot}`);
    ensureDirs();

    // DEBUG: Write workspace root to file for inspection (async to avoid blocking)
    const debugDir = path.join(repoRoot, '.robinson', 'context');
    await fsPromises.mkdir(debugDir, { recursive: true });
    await fsPromises.writeFile(path.join(debugDir, 'debug-workspace-root.txt'),
      `repoRoot: ${repoRoot}\nprocess.cwd(): ${process.cwd()}\nWORKSPACE_ROOT: ${process.env.WORKSPACE_ROOT}\nAUGMENT_WORKSPACE_ROOT: ${process.env.AUGMENT_WORKSPACE_ROOT}\n`);

    const meta = getStats();
    const filesMap = loadFileMap();

    // TTL gate (skip if index is fresh and quick mode)
    if (!targets && quickMode && !opts.force && meta?.updatedAt && TTL_MIN > 0) {
      const age = Date.now() - new Date(meta.updatedAt).getTime();
      if (age  t.replace(/\\/g, '/'))));
      added = [];
      modified = [];
      removed = [];
      changed = [];

      for (const rel of normalizedTargets) {
        const abs = path.join(repoRoot, rel);
        if (fs.existsSync(abs)) {
          changed.push(rel);
          if (filesMap[rel]) {
            modified.push(rel);
          } else {
            added.push(rel);
          }
        } else {
          removed.push(rel);
        }
      }

      ch = await gitChangesSince(repoRoot, (meta)?.head);
    } else if (opts.force) {
      console.log(`🔄 Force flag set - processing ALL ${allFiles.length} files`);
      changed = allFiles;
      removed = [];
      added = [];
      modified = allFiles; // Treat all as modified for force reindex
      ch = { head: null };
    } else {
      // Detect changes via git
      ch = await gitChangesSince(repoRoot, (meta)?.head);
      added = ch.added.concat(ch.untracked);
      modified = ch.modified;
      let deleted = ch.deleted;

      // Fallback to mtime if git didn't detect changes
      if (!ch.head || (!added.length && !modified.length && !deleted.length)) {
        console.log(`📊 Using mtime fallback for change detection`);
        const diff = await fsDiffFallback(repoRoot, allFiles, filesMap);
        added = diff.added;
        modified = diff.modified;
        deleted = diff.deleted;
      }

      // Cap changed files to keep responses snappy
      const combined = Array.from(new Set([...added, ...modified]));
      changed = maxChanged > 0 ? combined.slice(0, maxChanged) : combined;
      removed = deleted;
    }

    let deferred = [];
    if (!targets && quickMode && quickBudget > 0 && changed.length > quickBudget) {
      deferred = changed.slice(quickBudget);
      changed = changed.slice(0, quickBudget);
      const processedSet = new Set(changed);
      added = added.filter(f => processedSet.has(f));
      modified = modified.filter(f => processedSet.has(f));
      console.log(`⚡ Quick mode limited to ${changed.length} files (${deferred.length} deferred for background indexing)`);
    }

    console.log(`🔄 Changes: +${added.length} ~${modified.length} -${removed.length} (processing ${changed.length})`);

    // Apply deletions
    for (const f of removed) {
      delete filesMap[f];
      deleteChunksForFile(f);
    }

    let n = 0, e = 0;
    let errors = 0;
    const docsBatch: StoredDoc[] = [];

    // PHASE 1: Collect all chunks that need embedding (BATCHING FIX)
    interface ChunkToEmbed {
      fileIdx;
      rel;
      partIdx;
      text;
      contentSha;
    }

    const chunksToEmbed: ChunkToEmbed[] = [];
    const fileChunks: Map = new Map();

    console.log(`\n🔄 PHASE 1: Scanning ${changed.length} files for chunks...`);
    for (let fileIdx = 0; fileIdx  = new Map();

    if (chunksToEmbed.length > 0) {
      const BATCH_SIZE = 128; // Voyage AI max batch size
      const batches = Math.ceil(chunksToEmbed.length / BATCH_SIZE);

      for (let batchIdx = 0; batchIdx  c.text);
          const batchVecs = await embedBatch(batchTexts, {
            filePath: batchChunks[0].rel, // Use first file for content type detection
            inputType: 'document'
          });

          // Map embeddings back to chunks
          for (let i = 0; i  0) {
      saveDocs(docsBatch);
      console.log(`📄 Extracted ${docsBatch.length} documentation records`);
    }

    // Save updated file map
    saveFileMap(filesMap);

    // Update stats
    // For full reindex (force=true or no previous index), update indexedAt
    // For incremental updates, preserve indexedAt but update updatedAt
    const isFullReindex = opts.force || !meta?.indexedAt;
    const now = new Date().toISOString();

    const stats: IndexStats = {
      chunks: n,
      embeddings: e,
      vectors: e,
      sources: { repo: Object.keys(filesMap).length },
      mode: embedProvider,
      model: embedModel,
      dimensions: 768,
      totalCost: 0,
      indexedAt: isFullReindex ? now : meta.indexedAt,
      updatedAt: now
    };

    // Add git head to stats
    if (ch.head) {
      (stats).head = ch.head;
    }

    const storageMb = enforceStorageBudget(contextRootPath(), config.storage);
    (stats).storageMb = Number(storageMb.toFixed(2));
    (stats).compression = compressChunks ? 'gzip' : 'none';

    saveStats(stats);

    // Initialize memory systems if enabled
    try {
      const behavior = BehaviorMemory.forRoot(repoRoot);

      if (config.architectureLearning?.enabled) {
        console.log('🧠 Detecting architectural patterns...');
        const archMem = new ArchitectureMemory(repoRoot, behavior);
        const patterns = archMem.analyze(null, null);
        console.log(`✅ Detected ${patterns.length} architectural patterns`);
      }

      if (config.styleLearning?.enabled) {
        console.log('🎨 Analyzing code style patterns...');
        const styleLearner = new StyleLearner(behavior);
        const allFiles = Object.keys(filesMap);
        const style = await styleLearner.analyze(allFiles);
        if (style) {
          console.log(`✅ Analyzed code style: ${style.namingPreference} naming, ${style.quoteStyle} quotes, ${style.indentStyle} indentation`);
        }
      }

      if (config.behaviorLearning?.enabled) {
        console.log('📊 Behavior tracking initialized');
      }
    } catch (memError) {
      console.warn(`⚠️  Memory system initialization failed: ${memError.message}`);
    }

    const tookMs = Date.now() - start;
    console.log(`✅ Incremental index complete: ${n} chunks, ${e} embeddings, ${docsBatch.length} docs (${changed.length} processed, ${removed.length} removed, ${errors} errors) in ${tookMs}ms`);

    return {
      ok: true,
      chunks: n,
      embeddings: e,
      files: Object.keys(filesMap).length,
      changed: changed.length,
      removed: removed.length,
      tookMs,
      storageMb: Number(storageMb.toFixed(2)),
      pending: deferred,
      partial: deferred.length > 0
    };
  } catch (error) {
    console.error(`❌ Fatal indexing error:`, error.message);
    console.error(error.stack);
    return { ok: false, chunks: 0, embeddings: 0, files: 0, error: error.message, pending: [], partial: false };
  }
}

// CLI support
if (process.argv[1] && import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  indexRepo()
    .then(() => console.log('Indexed repo'))
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
}

