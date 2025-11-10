/**
 * Context Query Tool
 * Query indexed code semantically with fallback to blended search
 */

const MAX_RESULTS = 50;

export const contextQueryDescriptor = {
  name: 'context_query',
  description: 'Query indexed code semantically. Returns ranked search results.',
  inputSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      query: { type: 'string', description: 'Search query' },
      top_k: { type: 'number', description: 'Number of results to return (default: 12, max: 50)' },
    },
    required: ['query'],
  },
};

export async function contextQueryTool(args, ctx) {
  const query = typeof args?.query === 'string' ? args.query.trim() : '';
  if (!query) {
    return { hits: [], error: 'Query is required' };
  }

  const topK = clamp(Math.floor(Number(args?.top_k) || 12), 1, MAX_RESULTS);
  let hits = [];
  let usedFallback = false;

  try {
    const primary = await ctx.ctx.search(query, topK);
    if (Array.isArray(primary)) {
      hits = primary;
    }
  } catch (error) {
    console.error('[ThinkingTools] context_query primary search failed:', (error)?.message ?? error);
  }

  if (!hits.length) {
    try {
      const blended = await ctx.blendedSearch(query, topK);
      if (Array.isArray(blended) && blended.length) {
        hits = blended;
        usedFallback = true;
      }
    } catch (error) {
      console.error('[ThinkingTools] context_query blended search failed:', (error)?.message ?? error);
    }
  }

  if (!hits.length) {
    return {
      query,
      hits: [],
      rankingMode: ctx.rankingMode(),
      error: 'Search returned no results',
    };
  }

  const normalized = normalizeHits(hits, query);

  return {
    query,
    rankingMode: ctx.rankingMode(),
    usedFallback,
    totalResults: normalized.length,
    summary: buildSummary(normalized, query, usedFallback, ctx.rankingMode()),
    hits: normalized,
  };
}

function normalizeHits(rawHits, query) {
  const tokens = tokenize(query);
  const rawScores = rawHits.map((hit) => toNumber(hit?.score));
  const normalizedScores = normalizeScores(rawScores, rawHits.length);

  return rawHits.map((hit, index) => {
    const score = normalizedScores[index];
    const path = hit?.uri ?? hit?.path ?? hit?.file ?? '';
    const title = hit?.title ?? (path ? extractFilename(path) : 'Context match');
    const snippet = buildSnippet(hit?.snippet ?? hit?.text ?? '', tokens);
    const provider = hit?._provider ?? hit?.provider ?? hit?.meta?.type ?? 'local';
    const method = hit?._method ?? hit?.method ?? hit?.meta?.method;

    return {
      rank: index + 1,
      score,
      path,
      title,
      snippet,
      provider,
      method,
      highlights: tokens.filter((token) => snippet.toLowerCase().includes(token)).slice(0, 6),
      metadata: {
        source: provider,
        method,
        length: snippet.length,
        rawScore: toNumber(hit?.score),
        extra: hit?.meta ?? null,
      },
    };
  });
}

function normalizeScores(scores: Array, total) {
  const valid = scores.filter((score): score is number => typeof score === 'number' && Number.isFinite(score));
  if (!valid.length) {
    return scores.map((_, index) => Number(clamp(1 - index / Math.max(1, total), 0.05, 1).toFixed(4)));
  }

  const max = Math.max(...valid);
  const min = Math.min(...valid);

  if (Math.abs(max - min)  {
      if (typeof score === 'number' && Number.isFinite(score)) {
        return Number((score > 0 ? 1 : 0).toFixed(4));
      }
      return Number(clamp(1 - index / Math.max(1, total), 0.05, 1).toFixed(4));
    });
  }

  return scores.map((score, index) => {
    if (typeof score === 'number' && Number.isFinite(score)) {
      const normalized = (score - min) / (max - min);
      return Number(clamp(normalized, 0, 1).toFixed(4));
    }
    return Number(clamp(1 - index / Math.max(1, total), 0.05, 1).toFixed(4));
  });
}

function buildSnippet(raw, tokens){
  const cleaned = raw
    .toString()
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return '';

  if (cleaned.length = 0 && (bestScore === -1 || idx  0 ? `…${snippet}` : snippet;
}

function buildSummary(hits, query, usedFallback, rankingMode) {
  if (!hits.length) {
    return `No matches found for "${query}".`;
  }

  const top = hits[0];
  const providers = Array.from(new Set(hits.map((hit) => hit.provider))).slice(0, 3);
  const origin = usedFallback ? 'blended search (local + imported evidence)' : 'local context index';

  return `Found ${hits.length} relevant chunk${hits.length === 1 ? '' : 's'} for "${query}" via ${origin} ` +
    `(ranking: ${rankingMode}). Top match: ${top.title || top.path || 'untitled'} (${providers.join(', ')}).`;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function toNumber(value): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function clamp(value, min, max){
  return Math.min(max, Math.max(min, value));
}

function extractFilename(path){
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1] || path;
}


