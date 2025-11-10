/**
 * Query Cache for Context Engine
 * LRU cache for recent queries to avoid re-computing embeddings and search
 */

import { Hit } from './types.js';



/**
 * LRU Cache for query results
 */
export class QueryCache {
  private cache = new Map();
  private maxSize;
  private ttl; // Time to live in milliseconds

  constructor(maxSize= 100, ttlMinutes= 30) {
    this.maxSize = maxSize;
    this.ttl = ttlMinutes * 60 * 1000;
  }

  /**
   * Generate cache key from query and topK
   */
  private getCacheKey(query, topK){
    return `${query.toLowerCase().trim()}:${topK}`;
  }

  /**
   * Get cached results
   */
  get(query, topK): Hit[] | null {
    const key = this.getCacheKey(query, topK);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if entry has expired
    const now = Date.now();
    if (now - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Update access stats
    entry.accessCount++;
    entry.lastAccess = now;

    return entry.results;
  }

  /**
   * Set cached results
   */
  set(query, topK, results: Hit[]){
    const key = this.getCacheKey(query, topK);
    const now = Date.now();

    // If cache is full, evict least recently used entry
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }

    this.cache.set(key, {
      results,
      timestamp: now,
      accessCount: 1,
      lastAccess: now,
    });
  }

  /**
   * Evict least recently used entry
   */
  private evictLRU(){
    let lruKey: string | null = null;
    let lruTime = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccess  this.ttl) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.cache.delete(key);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size;
    maxSize;
    hitRate;
    totalAccesses;
    avgAccessCount;
  } {
    let totalAccesses = 0;
    let totalHits = 0;

    for (const entry of this.cache.values()) {
      totalAccesses += entry.accessCount;
      if (entry.accessCount > 1) {
        totalHits += entry.accessCount - 1; // First access is a miss
      }
    }

    const hitRate = totalAccesses > 0 ? totalHits / totalAccesses : 0;
    const avgAccessCount = this.cache.size > 0 ? totalAccesses / this.cache.size : 0;

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate,
      totalAccesses,
      avgAccessCount,
    };
  }

  /**
   * Invalidate cache (call when index is updated)
   */
  invalidate(){
    console.log('[QueryCache] Invalidating cache due to index update');
    this.clear();
  }
}

// Global cache instance
let globalCache: QueryCache | null = null;

/**
 * Get or create global cache instance
 */
export function getQueryCache(): QueryCache {
  if (!globalCache) {
    const maxSize = parseInt(process.env.CTX_CACHE_SIZE ?? '100', 10);
    const ttlMinutes = parseInt(process.env.CTX_CACHE_TTL_MINUTES ?? '30', 10);
    globalCache = new QueryCache(maxSize, ttlMinutes);

    // Clear expired entries every 5 minutes
    setInterval(() => {
      globalCache?.clearExpired();
    }, 5 * 60 * 1000);
  }

  return globalCache;
}

