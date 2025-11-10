/**
 * Robinson's Context Engine - Embedding Providers
 *
 * Supports multiple embedding providers with intelligent model selection:
 * - OpenAI (text-embedding-3-small, text-embedding-3-large)
 * - Claude/Anthropic (via Voyage AI - voyage-code-2, voyage-3)
 * - Ollama (nomic-embed-text, mxbai-embed-large) - FREE
 * - None (lexical search only)
 *
 * Graceful degradation: If no API keys, falls back to Ollama or lexical-only
 */
export interface Embedder {
    name: string;
    model: string;
    dimensions: number;
    costPer1M: number;
    embed(texts: string[]): Promise<number[][]>;
}
export interface EmbedderConfig {
    provider?: 'openai' | 'claude' | 'voyage' | 'ollama' | 'none' | 'auto';
    model?: string;
    preferQuality?: boolean;
    maxCostPer1M?: number;
}
/**
 * Smart embedder factory with cost-aware model selection
 */
export declare function makeEmbedder(config?: EmbedderConfig): Embedder | null;
/**
 * Estimate cost for embedding N tokens
 */
export declare function estimateEmbeddingCost(tokens: number, embedder: Embedder | null): number;
/**
 * Get recommended embedder for user's configuration
 */
export declare function getRecommendedEmbedder(): string;
//# sourceMappingURL=embeddings.d.ts.map