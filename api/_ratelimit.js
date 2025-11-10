// Simple in-memory token bucket rate limiter per x-api-key
// Resets on serverless cold start (acceptable for basic protection)

const buckets = new Map();

// Configuration
const RATE_LIMIT = {
  maxTokens: 100,        // Max tokens in bucket
  refillRate: 10,        // Tokens added per second
  costPerRequest: 1      // Tokens consumed per request
};

function getOrCreateBucket(apiKey) {
  if (!buckets.has(apiKey)) {
    buckets.set(apiKey, {
      tokens: RATE_LIMIT.maxTokens,
      lastRefill: Date.now()
    });
  }
  return buckets.get(apiKey);
}

function refillBucket(bucket) {
  const now = Date.now();
  const elapsed = (now - bucket.lastRefill) / 1000; // seconds
  const tokensToAdd = elapsed * RATE_LIMIT.refillRate;
  
  bucket.tokens = Math.min(
    RATE_LIMIT.maxTokens,
    bucket.tokens + tokensToAdd
  );
  bucket.lastRefill = now;
}

function consumeToken(bucket, cost = RATE_LIMIT.costPerRequest) {
  if (bucket.tokens >= cost) {
    bucket.tokens -= cost;
    return true;
  }
  return false;
}

/**
 * Rate limit middleware
 * Returns true if request is allowed, false if rate limited
 */
module.exports.checkRateLimit = function checkRateLimit(apiKey) {
  if (!apiKey) {
    // No API key = use default bucket (more restrictive)
    apiKey = '__anonymous__';
  }
  
  const bucket = getOrCreateBucket(apiKey);
  refillBucket(bucket);
  
  return {
    allowed: consumeToken(bucket),
    remaining: Math.floor(bucket.tokens),
    limit: RATE_LIMIT.maxTokens,
    resetIn: Math.ceil((RATE_LIMIT.maxTokens - bucket.tokens) / RATE_LIMIT.refillRate)
  };
};

/**
 * Get rate limit stats for debugging
 */
module.exports.getRateLimitStats = function getRateLimitStats() {
  const stats = [];
  for (const [key, bucket] of buckets.entries()) {
    refillBucket(bucket);
    stats.push({
      apiKey: key === '__anonymous__' ? 'anonymous' : key.substring(0, 10) + '...',
      tokens: Math.floor(bucket.tokens),
      maxTokens: RATE_LIMIT.maxTokens
    });
  }
  return stats;
};

/**
 * Reset all buckets (for testing)
 */
module.exports._resetRateLimits = function _resetRateLimits() {
  buckets.clear();
};
