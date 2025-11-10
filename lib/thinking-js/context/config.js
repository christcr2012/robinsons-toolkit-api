import { request } from 'undici';
import { resolveWorkspaceRoot } from '../lib/workspace.js';

;
  indexing: {
    ttlMinutes;
    maxChangedFiles;
    lazyIndexing;
    backgroundIndexing;
    quickFileLimit;
  };
  storage: {
    compressionEnabled;
    maxDiskUsageMb;
    autoCleanup;
  };
  styleLearning: {
    enabled;
  };
  architectureLearning: {
    enabled;
  };
  behaviorLearning: {
    enabled;
  };
}

let cachedConfig: ContextConfig | null = null;
let loadPromise: Promise | null = null;

async function detectOllama(baseUrl){
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 700).unref?.();

  try {
    const url = baseUrl.replace(/\/?$/, '') + '/api/tags';
    const response = await request(url, {
      method: 'GET',
      signal: controller.signal,
      headers: { 'accept': 'application/json' }
    });

    if (response.statusCode >= 200 && response.statusCode  {
    const workspaceRoot = resolveWorkspaceRoot();
    const contextRoot = process.env.CTX_ROOT
      ? (process.env.CTX_ROOT.startsWith('.')
          ? new URL(process.env.CTX_ROOT, `file://${workspaceRoot.replace(/\\/g, '/')}/`).pathname
          : process.env.CTX_ROOT)
      : `${workspaceRoot}/.robinson/context`;

    const provider = await resolveEmbeddingProvider();
    const fallbackDimensions = envInt('CTX_FALLBACK_EMBED_DIMS', 384);

    const config: ContextConfig = {
      workspaceRoot,
      contextRoot,
      embedding: {
        provider,
        model: process.env.RCE_EMBED_MODEL || process.env.EMBED_MODEL || process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text',
        fallbackDimensions,
      },
      indexing: {
        ttlMinutes: envInt('RCE_INDEX_TTL_MINUTES', 20),
        maxChangedFiles: envInt('RCE_MAX_CHANGED_PER_RUN', 1000),
        lazyIndexing: envToggle('RCE_LAZY_INDEXING', true),
        backgroundIndexing: envToggle('RCE_BACKGROUND_INDEXING', true),
        quickFileLimit: envInt('RCE_QUICK_FILE_LIMIT', 240),
      },
      storage: {
        compressionEnabled: envToggle('RCE_STORAGE_COMPRESS', true),
        maxDiskUsageMb: envInt('RCE_STORAGE_LIMIT_MB', 2048),
        autoCleanup: envToggle('RCE_STORAGE_AUTOCLEAN', true),
      },
      styleLearning: {
        enabled: envToggle('RCE_STYLE_LEARNING', true),
      },
      architectureLearning: {
        enabled: envToggle('RCE_ARCH_LEARNING', true),
      },
      behaviorLearning: {
        enabled: envToggle('RCE_BEHAVIOR_LEARNING', true),
      },
    };

    cachedConfig = config;

    // Surface provider back to embedding module via env for backward compatibility
    process.env.CTX_EMBED_PROVIDER = provider;
    process.env.EMBED_PROVIDER = provider;

    return config;
  })();

  const resolved = await loadPromise;
  loadPromise = null;
  return resolved;
}

export function invalidateContextConfig(){
  cachedConfig = null;
  loadPromise = null;
}

/**
 * Backward-compatible alias used by older tests/utilities.
 */
export function clearCachedContextConfig(){
  invalidateContextConfig();
}
