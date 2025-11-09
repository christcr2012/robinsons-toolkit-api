/**
 * PostgreSQL Handlers for Chris's Infrastructure
 *
 * Handler functions for all 25 PostgreSQL tools
 */
export declare function handlePostgresQueryExecute(args: any): Promise<any>;
export declare function handlePostgresVectorSearch(args: any): Promise<any>;
export declare function handlePostgresChatHistoryStore(args: any): Promise<any>;
export declare function handlePostgresChatHistoryRetrieve(args: any): Promise<any>;
export declare function handlePostgresChatHistorySearch(args: any): Promise<any>;
export declare function handlePostgresEmbeddingsStore(args: any): Promise<any>;
export declare function handlePostgresEmbeddingsSearch(args: any): Promise<any>;
export declare function handlePostgresTableCreate(args: any): Promise<any>;
export declare function handlePostgresTableList(args: any): Promise<any>;
export declare function handlePostgresTableDescribe(args: any): Promise<any>;
export declare function handlePostgresTableDrop(args: any): Promise<any>;
export declare function handlePostgresIndexCreate(args: any): Promise<any>;
export declare function handlePostgresIndexList(args: any): Promise<any>;
export declare function handlePostgresIndexDrop(args: any): Promise<any>;
export declare function handlePostgresTransactionBegin(args: any): Promise<any>;
export declare function handlePostgresTransactionCommit(args: any): Promise<any>;
export declare function handlePostgresTransactionRollback(args: any): Promise<any>;
export declare function handlePostgresBackupCreate(args: any): Promise<{
    success: boolean;
    message: string;
    metadata: {
        backup_name: any;
        tables: any;
        created_at: string;
    };
}>;
export declare function handlePostgresBackupRestore(args: any): Promise<{
    success: boolean;
    message: string;
    backup_name: any;
}>;
export declare function handlePostgresStatsGet(args: any): Promise<any>;
export declare function handlePostgresConnectionTest(args: any): Promise<{
    success: boolean;
    message: string;
    info: any;
} | {
    success: boolean;
    message: string;
    info?: undefined;
}>;
export declare function handlePostgresSchemaCreate(args: any): Promise<any>;
export declare function handlePostgresSchemaList(args: any): Promise<any>;
export declare function handlePostgresUserCreate(args: any): Promise<{
    success: boolean;
    message: string;
    privileges: any;
}>;
export declare function handlePostgresUserList(args: any): Promise<any>;
//# sourceMappingURL=postgres-handlers.d.ts.map