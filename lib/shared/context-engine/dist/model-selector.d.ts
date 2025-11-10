/**
 * Intelligent Task-Based Model Selector
 *
 * Dynamically selects the best model for each task based on:
 * - Task type (code, docs, general)
 * - Task complexity (simple, medium, complex)
 * - Quality requirements
 * - Cost constraints
 * - Available providers
 *
 * Can switch between:
 * - OpenAI (text-embedding-3-small, text-embedding-3-large)
 * - Voyage AI (voyage-code-2, voyage-3)
 * - Ollama (nomic-embed-text, mxbai-embed-large)
 */
export type TaskType = 'code' | 'documentation' | 'general' | 'search';
export type TaskComplexity = 'simple' | 'medium' | 'complex';
export interface TaskContext {
    type: TaskType;
    complexity: TaskComplexity;
    fileExtensions?: string[];
    estimatedTokens?: number;
    preferQuality?: boolean;
    maxCostPer1M?: number;
}
export interface ModelRecommendation {
    provider: 'openai' | 'voyage' | 'ollama';
    model: string;
    costPer1M: number;
    dimensions: number;
    reasoning: string;
    qualityScore: number;
    speedScore: number;
    valueScore: number;
}
/**
 * Select the best model for a given task
 */
export declare function selectModelForTask(task: TaskContext): ModelRecommendation | null;
/**
 * Detect task type from file extensions
 */
export declare function detectTaskType(fileExtensions: string[]): TaskType;
/**
 * Estimate task complexity from file count and size
 */
export declare function estimateComplexity(fileCount: number, avgFileSize: number): TaskComplexity;
/**
 * Get all available models with their capabilities
 */
export declare function listAvailableModels(): ModelRecommendation[];
//# sourceMappingURL=model-selector.d.ts.map