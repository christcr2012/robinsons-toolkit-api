/**
 * Toolkit Health Check
 *
 * Validates that all tools in the toolkit have valid names and schemas.
 * Helps diagnose "NULL tools" and "invalid name" errors.
 */
export interface HealthCheckResult {
    total: number;
    valid: number;
    invalid_count: number;
    sample_invalid: Array<{
        index: number;
        name?: string;
        reason: string;
    }>;
    categories: Record<string, number>;
}
/**
 * Validate all tools and return health report
 */
export declare function toolkit_health(tools: any[]): Promise<HealthCheckResult>;
//# sourceMappingURL=health.d.ts.map