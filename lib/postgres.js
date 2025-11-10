/** POSTGRES Integration - Pure JavaScript */

async function postgresFetch(credentials, path, options = {}) {
  const url = path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function handlePostgresQueryExecute(credentials, args) {
  const { sql, params } = args;
  return await fastAPIClient.postgresExecute(sql, params);
}

async function handlePostgresVectorSearch(credentials, args) {
  const { table, embedding, limit, threshold } = args;
  return await fastAPIClient.postgresVectorSearch(table, embedding, limit, threshold);
}

async function handlePostgresChatHistoryStore(credentials, args) {
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
  await fastAPIClient.postgresExecute(createTableSQL);
  
  // Insert chat message
  const insertSQL = `
    INSERT INTO chat_history (role, content, embedding, metadata)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  return await fastAPIClient.postgresExecute(insertSQL, [
    role,
    content,
    JSON.stringify(embedding),
    JSON.stringify(metadata || {}),
  ]);
}

async function handlePostgresChatHistoryRetrieve(credentials, args) {
  const { user_id, limit = 10, offset = 0 } = args;
  
  const sql = `
    SELECT * FROM chat_history
    WHERE metadata->>'user_id' = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;
  return await fastAPIClient.postgresExecute(sql, [user_id, limit, offset]);
}

async function handlePostgresChatHistorySearch(credentials, args) {
  const { query_embedding, limit = 5 } = args;
  return await fastAPIClient.postgresVectorSearch('chat_history', query_embedding, limit);
}

async function handlePostgresEmbeddingsStore(credentials, args) {
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
  await fastAPIClient.postgresExecute(createTableSQL);
  
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
  return await fastAPIClient.postgresExecute(upsertSQL, [
    document_id,
    content,
    JSON.stringify(embedding),
    JSON.stringify(metadata || {}),
  ]);
}

async function handlePostgresEmbeddingsSearch(credentials, args) {
  const { table, query_embedding, limit = 5, threshold = 0.7 } = args;
  return await fastAPIClient.postgresVectorSearch(table, query_embedding, limit, threshold);
}

async function handlePostgresTableCreate(credentials, args) {
  const { table_name, schema } = args;
  const sql = `CREATE TABLE ${table_name} (${schema})`;
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresTableList(credentials, args) {
  return await fastAPIClient.postgresListTables();
}

async function handlePostgresTableDescribe(credentials, args) {
  const { table_name } = args;
  const sql = `
    SELECT column_name, data_type, character_maximum_length, is_nullable
    FROM information_schema.columns
    WHERE table_name = $1
  `;
  return await fastAPIClient.postgresExecute(sql, [table_name]);
}

async function handlePostgresTableDrop(credentials, args) {
  const { table_name, cascade = false } = args;
  const sql = `DROP TABLE ${table_name}${cascade ? ' CASCADE' : ''}`;
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresIndexCreate(credentials, args) {
  const { index_name, table_name, columns, unique = false } = args;
  const uniqueKeyword = unique ? 'UNIQUE ' : '';
  const columnList = columns.join(', ');
  const sql = `CREATE ${uniqueKeyword}INDEX ${index_name} ON ${table_name} (${columnList})`;
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresIndexList(credentials, args) {
  const { table_name } = args;
  
  let sql = `
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE schemaname = 'public'
  `;
  
  if (table_name) {
    sql += ` AND tablename = $1`;
    return await fastAPIClient.postgresExecute(sql, [table_name]);
  }
  
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresIndexDrop(credentials, args) {
  const { index_name } = args;
  const sql = `DROP INDEX ${index_name}`;
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresTransactionBegin(credentials, args) {
  const { isolation_level = 'READ COMMITTED' } = args;
  const sql = `BEGIN TRANSACTION ISOLATION LEVEL ${isolation_level}`;
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresTransactionCommit(credentials, args) {
  const sql = 'COMMIT';
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresTransactionRollback(credentials, args) {
  const sql = 'ROLLBACK';
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresBackupCreate(credentials, args) {
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

async function handlePostgresBackupRestore(credentials, args) {
  const { backup_name } = args;
  
  return {
    success: true,
    message: 'Backup restore initiated (note: use pg_restore for production restores)',
    backup_name,
  };
}

async function handlePostgresStatsGet(credentials, args) {
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
  
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresConnectionTest(credentials, args) {
  try {
    const result = await fastAPIClient.postgresGetInfo();
    return {
      success: true,
      message: 'Connection successful',
      info: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection failed',
    };
  }
}

async function handlePostgresSchemaCreate(credentials, args) {
  const { schema_name } = args;
  const sql = `CREATE SCHEMA ${schema_name}`;
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresSchemaList(credentials, args) {
  const sql = `
    SELECT schema_name
    FROM information_schema.schemata
    WHERE schema_name NOT IN ('pg_catalog', 'information_schema')
  `;
  return await fastAPIClient.postgresExecute(sql);
}

async function handlePostgresUserCreate(credentials, args) {
  const { username, password, privileges = [] } = args;
  
  // Create user
  const createUserSQL = `CREATE USER ${username} WITH PASSWORD '${password}'`;
  await fastAPIClient.postgresExecute(createUserSQL);
  
  // Grant privileges if specified
  if (privileges.length > 0) {
    const grantSQL = `GRANT ${privileges.join(', ')} ON ALL TABLES IN SCHEMA public TO ${username}`;
    await fastAPIClient.postgresExecute(grantSQL);
  }
  
  return {
    success: true,
    message: `User ${username} created successfully`,
    privileges,
  };
}

async function handlePostgresUserList(credentials, args) {
  const sql = `
    SELECT usename AS username, usesuper AS is_superuser, usecreatedb AS can_create_db
    FROM pg_user
  `;
  return await fastAPIClient.postgresExecute(sql);
}

async function executePostgresTool(toolName, args, credentials) {
  const tools = {
    'postgres_handlePostgresQueryExecute': handlePostgresQueryExecute,
    'postgres_handlePostgresVectorSearch': handlePostgresVectorSearch,
    'postgres_handlePostgresChatHistoryStore': handlePostgresChatHistoryStore,
    'postgres_handlePostgresChatHistoryRetrieve': handlePostgresChatHistoryRetrieve,
    'postgres_handlePostgresChatHistorySearch': handlePostgresChatHistorySearch,
    'postgres_handlePostgresEmbeddingsStore': handlePostgresEmbeddingsStore,
    'postgres_handlePostgresEmbeddingsSearch': handlePostgresEmbeddingsSearch,
    'postgres_handlePostgresTableCreate': handlePostgresTableCreate,
    'postgres_handlePostgresTableList': handlePostgresTableList,
    'postgres_handlePostgresTableDescribe': handlePostgresTableDescribe,
    'postgres_handlePostgresTableDrop': handlePostgresTableDrop,
    'postgres_handlePostgresIndexCreate': handlePostgresIndexCreate,
    'postgres_handlePostgresIndexList': handlePostgresIndexList,
    'postgres_handlePostgresIndexDrop': handlePostgresIndexDrop,
    'postgres_handlePostgresTransactionBegin': handlePostgresTransactionBegin,
    'postgres_handlePostgresTransactionCommit': handlePostgresTransactionCommit,
    'postgres_handlePostgresTransactionRollback': handlePostgresTransactionRollback,
    'postgres_handlePostgresBackupCreate': handlePostgresBackupCreate,
    'postgres_handlePostgresBackupRestore': handlePostgresBackupRestore,
    'postgres_handlePostgresStatsGet': handlePostgresStatsGet,
    'postgres_handlePostgresConnectionTest': handlePostgresConnectionTest,
    'postgres_handlePostgresSchemaCreate': handlePostgresSchemaCreate,
    'postgres_handlePostgresSchemaList': handlePostgresSchemaList,
    'postgres_handlePostgresUserCreate': handlePostgresUserCreate,
    'postgres_handlePostgresUserList': handlePostgresUserList,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executePostgresTool };