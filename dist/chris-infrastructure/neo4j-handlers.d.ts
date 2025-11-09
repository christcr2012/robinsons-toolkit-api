/**
 * Neo4j Handlers for Chris's Infrastructure
 *
 * Handler functions for all 20 Neo4j tools
 */
export declare function handleNeo4jQueryExecute(args: any): Promise<any>;
export declare function handleNeo4jKnowledgeGraphCreateNode(args: any): Promise<any>;
export declare function handleNeo4jKnowledgeGraphCreateRelationship(args: any): Promise<any>;
export declare function handleNeo4jKnowledgeGraphQuery(args: any): Promise<any>;
export declare function handleNeo4jNodeCreate(args: any): Promise<any>;
export declare function handleNeo4jNodeGet(args: any): Promise<any>;
export declare function handleNeo4jNodeUpdate(args: any): Promise<any>;
export declare function handleNeo4jNodeDelete(args: any): Promise<any>;
export declare function handleNeo4jNodeSearch(args: any): Promise<any>;
export declare function handleNeo4jRelationshipCreate(args: any): Promise<any>;
export declare function handleNeo4jRelationshipGet(args: any): Promise<any>;
export declare function handleNeo4jRelationshipDelete(args: any): Promise<any>;
export declare function handleNeo4jRelationshipSearch(args: any): Promise<any>;
export declare function handleNeo4jPatternMatch(args: any): Promise<any>;
export declare function handleNeo4jPathFind(args: any): Promise<any>;
export declare function handleNeo4jSchemaGet(args: any): Promise<any>;
export declare function handleNeo4jStatsGet(args: any): Promise<any>;
export declare function handleNeo4jConnectionTest(args: any): Promise<{
    success: boolean;
    message: string;
    labels: any;
} | {
    success: boolean;
    message: string;
    labels?: undefined;
}>;
export declare function handleNeo4jDatabaseList(args: any): Promise<any>;
export declare function handleNeo4jConstraintCreate(args: any): Promise<any>;
//# sourceMappingURL=neo4j-handlers.d.ts.map