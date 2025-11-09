/**
 * FastAPI Client for Chris's Infrastructure
 *
 * Unified client for accessing PostgreSQL, Neo4j, Qdrant, and N8N
 * via FastAPI Gateway at https://api.srv823383.hstgr.cloud/api/v1
 */
export declare class FastAPIClient {
    private baseUrl;
    private userId;
    /**
     * Make a request to the FastAPI gateway
     */
    request(endpoint: string, options?: RequestInit): Promise<any>;
    /**
     * Execute SQL query on PostgreSQL
     */
    postgresQuery(sql: string, params?: any[]): Promise<any>;
    /**
     * Execute SQL command (INSERT, UPDATE, DELETE, CREATE, etc.)
     */
    postgresExecute(sql: string, params?: any[]): Promise<any>;
    /**
     * Vector similarity search using pgvector
     */
    postgresVectorSearch(table: string, embedding: number[], limit?: number, threshold?: number): Promise<any>;
    /**
     * List all tables in PostgreSQL
     */
    postgresListTables(): Promise<any>;
    /**
     * Get database info
     */
    postgresGetInfo(): Promise<any>;
    /**
     * Execute Cypher query on Neo4j
     */
    neo4jQuery(cypher: string, params?: any): Promise<any>;
    /**
     * Get all nodes from Neo4j
     */
    neo4jGetNodes(): Promise<any>;
    /**
     * Get all relationships from Neo4j
     */
    neo4jGetRelationships(): Promise<any>;
    /**
     * Get all node labels from Neo4j
     */
    neo4jGetLabels(): Promise<any>;
    /**
     * Semantic search in Qdrant collection
     */
    qdrantSearch(collection: string, vector: number[], limit?: number, scoreThreshold?: number): Promise<any>;
    /**
     * List all Qdrant collections
     */
    qdrantListCollections(): Promise<any>;
    /**
     * Create Qdrant collection
     */
    qdrantCreateCollection(collection: string, vectorSize: number, distance?: 'Cosine' | 'Euclid' | 'Dot'): Promise<any>;
    /**
     * Add points to Qdrant collection
     */
    qdrantUpsertPoints(collection: string, points: any[]): Promise<any>;
    /**
     * Get collection info
     */
    qdrantGetCollection(collection: string): Promise<any>;
    /**
     * Delete Qdrant collection
     */
    qdrantDeleteCollection(collection: string): Promise<any>;
    /**
     * Trigger N8N workflow via webhook
     */
    n8nTriggerWorkflow(workflowId: string, data?: any): Promise<any>;
    /**
     * List all N8N workflows
     */
    n8nListWorkflows(): Promise<any>;
    /**
     * Get N8N workflow by ID
     */
    n8nGetWorkflow(workflowId: string): Promise<any>;
    /**
     * List N8N executions
     */
    n8nListExecutions(): Promise<any>;
    /**
     * Get N8N execution status
     */
    n8nGetExecutionStatus(executionId: string): Promise<any>;
}
export declare const fastAPIClient: FastAPIClient;
//# sourceMappingURL=fastapi-client.d.ts.map