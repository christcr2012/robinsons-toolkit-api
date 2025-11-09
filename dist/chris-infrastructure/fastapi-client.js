/**
 * FastAPI Client for Chris's Infrastructure
 *
 * Unified client for accessing PostgreSQL, Neo4j, Qdrant, and N8N
 * via FastAPI Gateway at https://api.srv823383.hstgr.cloud/api/v1
 */
export class FastAPIClient {
    baseUrl = 'https://api.srv823383.hstgr.cloud/api/v1';
    userId = 'chris';
    /**
     * Make a request to the FastAPI gateway
     */
    async request(endpoint, options = {}) {
        const headers = {
            'X-User': this.userId,
            'Content-Type': 'application/json',
            ...options.headers,
        };
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response = await fetch(url, { ...options, headers });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`FastAPI error (${response.status}): ${errorText}`);
            }
            return await response.json();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`FastAPI request failed: ${error.message}`);
            }
            throw error;
        }
    }
    // ============================================================================
    // PostgreSQL Methods
    // ============================================================================
    /**
     * Execute SQL query on PostgreSQL
     */
    async postgresQuery(sql, params) {
        return await this.request('/postgres/query', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    /**
     * Execute SQL command (INSERT, UPDATE, DELETE, CREATE, etc.)
     */
    async postgresExecute(sql, params) {
        return await this.request('/postgres/execute', {
            method: 'POST',
            body: JSON.stringify({ sql, params }),
        });
    }
    /**
     * Vector similarity search using pgvector
     */
    async postgresVectorSearch(table, embedding, limit = 5, threshold) {
        return await this.request('/postgres/vector_search', {
            method: 'POST',
            body: JSON.stringify({ table, vector: embedding, limit, threshold }),
        });
    }
    /**
     * List all tables in PostgreSQL
     */
    async postgresListTables() {
        return await this.request('/postgres/tables', {
            method: 'GET',
        });
    }
    /**
     * Get database info
     */
    async postgresGetInfo() {
        return await this.request('/postgres/info', {
            method: 'GET',
        });
    }
    // ============================================================================
    // Neo4j Methods
    // ============================================================================
    /**
     * Execute Cypher query on Neo4j
     */
    async neo4jQuery(cypher, params) {
        return await this.request('/neo4j/execute', {
            method: 'POST',
            body: JSON.stringify({ cypher, parameters: params }),
        });
    }
    /**
     * Get all nodes from Neo4j
     */
    async neo4jGetNodes() {
        return await this.request('/neo4j/nodes', {
            method: 'GET',
        });
    }
    /**
     * Get all relationships from Neo4j
     */
    async neo4jGetRelationships() {
        return await this.request('/neo4j/relationships', {
            method: 'GET',
        });
    }
    /**
     * Get all node labels from Neo4j
     */
    async neo4jGetLabels() {
        return await this.request('/neo4j/labels', {
            method: 'GET',
        });
    }
    // ============================================================================
    // Qdrant Methods
    // ============================================================================
    /**
     * Semantic search in Qdrant collection
     */
    async qdrantSearch(collection, vector, limit = 5, scoreThreshold) {
        return await this.request(`/qdrant/collections/${collection}/search`, {
            method: 'POST',
            body: JSON.stringify({
                vector,
                limit,
                score_threshold: scoreThreshold,
            }),
        });
    }
    /**
     * List all Qdrant collections
     */
    async qdrantListCollections() {
        return await this.request('/qdrant/collections', {
            method: 'GET',
        });
    }
    /**
     * Create Qdrant collection
     */
    async qdrantCreateCollection(collection, vectorSize, distance = 'Cosine') {
        return await this.request(`/qdrant/collections/${collection}`, {
            method: 'PUT',
            body: JSON.stringify({
                vectors: {
                    size: vectorSize,
                    distance,
                },
            }),
        });
    }
    /**
     * Add points to Qdrant collection
     */
    async qdrantUpsertPoints(collection, points) {
        return await this.request(`/qdrant/collections/${collection}/points`, {
            method: 'POST',
            body: JSON.stringify(points),
        });
    }
    /**
     * Get collection info
     */
    async qdrantGetCollection(collection) {
        return await this.request(`/qdrant/collections/${collection}`, {
            method: 'GET',
        });
    }
    /**
     * Delete Qdrant collection
     */
    async qdrantDeleteCollection(collection) {
        return await this.request(`/qdrant/collections/${collection}`, {
            method: 'DELETE',
        });
    }
    // ============================================================================
    // N8N Methods
    // ============================================================================
    /**
     * Trigger N8N workflow via webhook
     */
    async n8nTriggerWorkflow(workflowId, data) {
        return await this.request(`/gateway/n8n/webhook/${workflowId}`, {
            method: 'POST',
            body: JSON.stringify(data || {}),
        });
    }
    /**
     * List all N8N workflows
     */
    async n8nListWorkflows() {
        return await this.request('/gateway/n8n/api/v1/workflows', {
            method: 'GET',
        });
    }
    /**
     * Get N8N workflow by ID
     */
    async n8nGetWorkflow(workflowId) {
        return await this.request(`/gateway/n8n/api/v1/workflows/${workflowId}`, {
            method: 'GET',
        });
    }
    /**
     * List N8N executions
     */
    async n8nListExecutions() {
        return await this.request('/gateway/n8n/api/v1/executions', {
            method: 'GET',
        });
    }
    /**
     * Get N8N execution status
     */
    async n8nGetExecutionStatus(executionId) {
        return await this.request(`/gateway/n8n/api/v1/executions/${executionId}`, {
            method: 'GET',
        });
    }
}
// Export singleton instance
export const fastAPIClient = new FastAPIClient();
