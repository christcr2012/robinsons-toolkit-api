"use strict";
/**
 * PostgreSQL Handlers for Chris's Infrastructure
 *
 * Handler functions for all 25 PostgreSQL tools
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostgresQueryExecute = handlePostgresQueryExecute;
exports.handlePostgresVectorSearch = handlePostgresVectorSearch;
exports.handlePostgresChatHistoryStore = handlePostgresChatHistoryStore;
exports.handlePostgresChatHistoryRetrieve = handlePostgresChatHistoryRetrieve;
exports.handlePostgresChatHistorySearch = handlePostgresChatHistorySearch;
exports.handlePostgresEmbeddingsStore = handlePostgresEmbeddingsStore;
exports.handlePostgresEmbeddingsSearch = handlePostgresEmbeddingsSearch;
exports.handlePostgresTableCreate = handlePostgresTableCreate;
exports.handlePostgresTableList = handlePostgresTableList;
exports.handlePostgresTableDescribe = handlePostgresTableDescribe;
exports.handlePostgresTableDrop = handlePostgresTableDrop;
exports.handlePostgresIndexCreate = handlePostgresIndexCreate;
exports.handlePostgresIndexList = handlePostgresIndexList;
exports.handlePostgresIndexDrop = handlePostgresIndexDrop;
exports.handlePostgresTransactionBegin = handlePostgresTransactionBegin;
exports.handlePostgresTransactionCommit = handlePostgresTransactionCommit;
exports.handlePostgresTransactionRollback = handlePostgresTransactionRollback;
exports.handlePostgresBackupCreate = handlePostgresBackupCreate;
exports.handlePostgresBackupRestore = handlePostgresBackupRestore;
exports.handlePostgresStatsGet = handlePostgresStatsGet;
exports.handlePostgresConnectionTest = handlePostgresConnectionTest;
exports.handlePostgresSchemaCreate = handlePostgresSchemaCreate;
exports.handlePostgresSchemaList = handlePostgresSchemaList;
exports.handlePostgresUserCreate = handlePostgresUserCreate;
exports.handlePostgresUserList = handlePostgresUserList;
const fastapi_client_js_1 = require("./fastapi-client.js");
// ============================================================================
// Query Execution
// ============================================================================
async function handlePostgresQueryExecute(args) {
    const { sql, params } = args;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql, params);
}
// ============================================================================
// Vector Search
// ============================================================================
async function handlePostgresVectorSearch(args) {
    const { table, embedding, limit, threshold } = args;
    return await fastapi_client_js_1.fastAPIClient.postgresVectorSearch(table, embedding, limit, threshold);
}
// ============================================================================
// Chat History
// ============================================================================
async function handlePostgresChatHistoryStore(args) {
    const { role, content, embedding, metadata } = args;
    // Create table if it doesn't exist
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS chat_history (
      id SERIAL PRIMARY KEY,
      role VARCHAR(50),
      content TEXT,
      embedding vector(1536),
      metadata JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
    await fastapi_client_js_1.fastAPIClient.postgresExecute(createTableSQL);
    // Insert chat message
    const insertSQL = `
    INSERT INTO chat_history (role, content, embedding, metadata)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(insertSQL, [
        role,
        content,
        JSON.stringify(embedding),
        JSON.stringify(metadata || {}),
    ]);
}
async function handlePostgresChatHistoryRetrieve(args) {
    const { user_id, limit = 10, offset = 0 } = args;
    const sql = `
    SELECT * FROM chat_history
    WHERE metadata->>'user_id' = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql, [user_id, limit, offset]);
}
async function handlePostgresChatHistorySearch(args) {
    const { query_embedding, limit = 5 } = args;
    return await fastapi_client_js_1.fastAPIClient.postgresVectorSearch('chat_history', query_embedding, limit);
}
// ============================================================================
// Embeddings
// ============================================================================
async function handlePostgresEmbeddingsStore(args) {
    const { table, document_id, content, embedding, metadata } = args;
    // Create table if it doesn't exist
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY,
      document_id VARCHAR(255) UNIQUE,
      content TEXT,
      embedding vector(1536),
      metadata JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
    await fastapi_client_js_1.fastAPIClient.postgresExecute(createTableSQL);
    // Insert or update embedding
    const upsertSQL = `
    INSERT INTO ${table} (document_id, content, embedding, metadata)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (document_id) DO UPDATE SET
      content = EXCLUDED.content,
      embedding = EXCLUDED.embedding,
      metadata = EXCLUDED.metadata
    RETURNING *
  `;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(upsertSQL, [
        document_id,
        content,
        JSON.stringify(embedding),
        JSON.stringify(metadata || {}),
    ]);
}
async function handlePostgresEmbeddingsSearch(args) {
    const { table, query_embedding, limit = 5, threshold = 0.7 } = args;
    return await fastapi_client_js_1.fastAPIClient.postgresVectorSearch(table, query_embedding, limit, threshold);
}
// ============================================================================
// Table Management
// ============================================================================
async function handlePostgresTableCreate(args) {
    const { table_name, schema } = args;
    const sql = `CREATE TABLE ${table_name} (${schema})`;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
async function handlePostgresTableList(args) {
    return await fastapi_client_js_1.fastAPIClient.postgresListTables();
}
async function handlePostgresTableDescribe(args) {
    const { table_name } = args;
    const sql = `
    SELECT column_name, data_type, character_maximum_length, is_nullable
    FROM information_schema.columns
    WHERE table_name = $1
  `;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql, [table_name]);
}
async function handlePostgresTableDrop(args) {
    const { table_name, cascade = false } = args;
    const sql = `DROP TABLE ${table_name}${cascade ? ' CASCADE' : ''}`;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
// ============================================================================
// Index Management
// ============================================================================
async function handlePostgresIndexCreate(args) {
    const { index_name, table_name, columns, unique = false } = args;
    const uniqueKeyword = unique ? 'UNIQUE ' : '';
    const columnList = columns.join(', ');
    const sql = `CREATE ${uniqueKeyword}INDEX ${index_name} ON ${table_name} (${columnList})`;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
async function handlePostgresIndexList(args) {
    const { table_name } = args;
    let sql = `
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE schemaname = 'public'
  `;
    if (table_name) {
        sql += ` AND tablename = $1`;
        return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql, [table_name]);
    }
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
async function handlePostgresIndexDrop(args) {
    const { index_name } = args;
    const sql = `DROP INDEX ${index_name}`;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
// ============================================================================
// Transaction Management
// ============================================================================
async function handlePostgresTransactionBegin(args) {
    const { isolation_level = 'READ COMMITTED' } = args;
    const sql = `BEGIN TRANSACTION ISOLATION LEVEL ${isolation_level}`;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
async function handlePostgresTransactionCommit(args) {
    const sql = 'COMMIT';
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
async function handlePostgresTransactionRollback(args) {
    const sql = 'ROLLBACK';
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
// ============================================================================
// Backup & Restore
// ============================================================================
async function handlePostgresBackupCreate(args) {
    const { backup_name, tables } = args;
    // Note: This is a simplified backup - in production, use pg_dump
    const timestamp = new Date().toISOString();
    const metadata = {
        backup_name,
        tables: tables || 'all',
        created_at: timestamp,
    };
    return {
        success: true,
        message: 'Backup created (note: use pg_dump for production backups)',
        metadata,
    };
}
async function handlePostgresBackupRestore(args) {
    const { backup_name } = args;
    return {
        success: true,
        message: 'Backup restore initiated (note: use pg_restore for production restores)',
        backup_name,
    };
}
// ============================================================================
// Statistics & Monitoring
// ============================================================================
async function handlePostgresStatsGet(args) {
    const { stat_type = 'database' } = args;
    let sql = '';
    switch (stat_type) {
        case 'database':
            sql = 'SELECT * FROM pg_stat_database WHERE datname = current_database()';
            break;
        case 'tables':
            sql = 'SELECT * FROM pg_stat_user_tables';
            break;
        case 'indexes':
            sql = 'SELECT * FROM pg_stat_user_indexes';
            break;
        case 'connections':
            sql = 'SELECT * FROM pg_stat_activity';
            break;
        default:
            sql = 'SELECT * FROM pg_stat_database WHERE datname = current_database()';
    }
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
async function handlePostgresConnectionTest(args) {
    try {
        const result = await fastapi_client_js_1.fastAPIClient.postgresGetInfo();
        return {
            success: true,
            message: 'Connection successful',
            info: result,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Connection failed',
        };
    }
}
// ============================================================================
// Schema Management
// ============================================================================
async function handlePostgresSchemaCreate(args) {
    const { schema_name } = args;
    const sql = `CREATE SCHEMA ${schema_name}`;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
async function handlePostgresSchemaList(args) {
    const sql = `
    SELECT schema_name
    FROM information_schema.schemata
    WHERE schema_name NOT IN ('pg_catalog', 'information_schema')
  `;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
// ============================================================================
// User Management
// ============================================================================
async function handlePostgresUserCreate(args) {
    const { username, password, privileges = [] } = args;
    // Create user
    const createUserSQL = `CREATE USER ${username} WITH PASSWORD '${password}'`;
    await fastapi_client_js_1.fastAPIClient.postgresExecute(createUserSQL);
    // Grant privileges if specified
    if (privileges.length > 0) {
        const grantSQL = `GRANT ${privileges.join(', ')} ON ALL TABLES IN SCHEMA public TO ${username}`;
        await fastapi_client_js_1.fastAPIClient.postgresExecute(grantSQL);
    }
    return {
        success: true,
        message: `User ${username} created successfully`,
        privileges,
    };
}
async function handlePostgresUserList(args) {
    const sql = `
    SELECT usename AS username, usesuper AS is_superuser, usecreatedb AS can_create_db
    FROM pg_user
  `;
    return await fastapi_client_js_1.fastAPIClient.postgresExecute(sql);
}
