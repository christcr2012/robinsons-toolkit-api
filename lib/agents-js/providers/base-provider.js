/**
 * Base Provider Interface
 * 
 * Abstract interface for LLM providers (local Ollama, Groq, Together.ai, etc.)
 * Allows seamless switching between local and cloud models.
 */

/**
 * Base provider interface that all providers must implement
 */
export abstract class BaseProvider {
  config: ProviderConfig;
  name;

  constructor(name, config: ProviderConfig = {}) {
    this.name = name;
    this.config = {
      timeout: 120000, // 2 minutes default
      maxRetries: 2,
      ...config,
    };
  }

  /**
   * Check if provider is available/configured
   */
  abstract isAvailable();

  /**
   * Discover available models from this provider
   */
  abstract discoverModels();

  /**
   * Generate text using a model
   */
  abstract generate(request);

  /**
   * Get model info
   */
  abstract getModelInfo(modelId);

  /**
   * Get provider name
   */
  getName(){
    return this.name;
  }

  /**
   * Calculate cost for a generation
   */
  calculateCost(model: ModelInfo, tokensInput, tokensOutput){
    if (!model.pricing) {
      return 0; // Free (local models)
    }

    const inputCost = (tokensInput / 1_000_000) * model.pricing.inputPerMillion;
    const outputCost = (tokensOutput / 1_000_000) * model.pricing.outputPerMillion;

    return inputCost + outputCost;
  }

  /**
   * Estimate tokens from text (rough approximation)
   */
  estimateTokens(text){
    // Rough approximation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }
}

/**
 * Provider registry for managing multiple providers
 */
export class ProviderRegistry {
  providers = new Map();
  modelCache = new Map();
  lastDiscovery= 0;
  discoveryInterval= 300000; // 5 minutes

  /**
   * Register a provider
   */
  registerProvider(provider: BaseProvider){
    this.providers.set(provider.getName(), provider);
  }

  /**
   * Get a provider by name
   */
  getProvider(name): BaseProvider | undefined {
    return this.providers.get(name);
  }

  /**
   * Get all providers
   */
  getAllProviders() {
    return Array.from(this.providers.values());
  }

  /**
   * Discover models from all providers
   */
  async discoverAllModels(force= false) {
    const now = Date.now();

    // Use cache if recent
    if (!force && this.modelCache.size > 0 && (now - this.lastDiscovery) ) {
    // Find which provider has this model
    const modelInfo = await this.getModelInfo(modelId);
    
    if (!modelInfo) {
      throw new Error(`Model ${modelId} not found in any provider`);
    }

    const provider = this.providers.get(modelInfo.provider);
    
    if (!provider) {
      throw new Error(`Provider ${modelInfo.provider} not registered`);
    }

    return provider.generate({ ...request, model: modelId });
  }

  /**
   * Select best model based on criteria
   */
  async selectBestModel(criteria: {
    task: 'code' | 'chat' | 'analysis';
    complexity: 'simple' | 'medium' | 'complex';
    preferLocal?; // Prefer local models over cloud
    maxCost?; // Max cost per request in USD
    requiredCapabilities?;
  }) {
    const models = await this.discoverAllModels();

    if (models.length === 0) {
      return null;
    }

    // Filter by required capabilities
    let candidates = models;
    if (criteria.requiredCapabilities && criteria.requiredCapabilities.length > 0) {
      candidates = models.filter(m =>
        criteria.requiredCapabilities!.every(cap => m.capabilities.includes(cap))
      );
    }

    // Filter by max cost
    if (criteria.maxCost !== undefined) {
      candidates = candidates.filter(m => {
        if (!m.pricing) return true; // Free models always pass
        // Estimate cost for typical request (1000 input, 500 output tokens)
        const estimatedCost = (1000 / 1_000_000) * m.pricing.inputPerMillion +
                             (500 / 1_000_000) * m.pricing.outputPerMillion;
        return estimatedCost  m.provider === 'ollama');
      if (localModels.length > 0) {
        candidates = localModels;
      }
    }

    // Sort by quality and speed
    candidates.sort((a, b) => {
      // Prefer local models (0 cost)
      const aCost = a.pricing ? 1 : 0;
      const bCost = b.pricing ? 1 : 0;
      if (aCost !== bCost) return aCost - bCost;

      // Match complexity to quality
      const targetQuality = criteria.complexity === 'simple' ? 'good' :
                           criteria.complexity === 'medium' ? 'better' : 'best';
      const aMatch = a.quality === targetQuality ? 0 : 1;
      const bMatch = b.quality === targetQuality ? 0 : 1;
      if (aMatch !== bMatch) return aMatch - bMatch;

      // Prefer faster models for simple tasks
      if (criteria.complexity === 'simple') {
        const speedOrder = { fast: 0, medium: 1, slow: 2 };
        return speedOrder[a.speed] - speedOrder[b.speed];
      }

      return 0;
    });

    return candidates[0]?.id || null;
  }
}

// Singleton registry
let registry: ProviderRegistry | null = null;

export function getProviderRegistry() {
  if (!registry) {
    registry = new ProviderRegistry();
  }
  return registry;
}

