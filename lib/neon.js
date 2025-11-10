/**
 * NEON Integration - Pure JavaScript
 * NO MCP dependencies
 */

async function neonFetch(credentials, path, options = {}) {
  const url = path.startsWith('http') ? path : 'https://console.neon.tech/api/v2' + path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function listProjects(credentials, args) {
    const params = new URLSearchParams();
    if (args.limit) params.append('limit', args.limit.toString());
    if (args.search) params.append('search', args.search);
    if (args.cursor) params.append('cursor', args.cursor);
    if (args.org_id) params.append('org_id', args.org_id);

    const response = await this.client.get(`/projects?${params.toString()}`);
}

async function listOrganizations(credentials, args) {
    const response = await this.client.get('/users/me/organizations');
    let orgs = response.data.organizations || [];

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      orgs = orgs.filter((org) =>
        org.name?.toLowerCase().includes(searchLower) ||
        org.id?.toLowerCase().includes(searchLower)
      );
    }

}

async function listSharedProjects(credentials, args) {
    const params = new URLSearchParams();
    if (args.limit) params.append('limit', args.limit.toString());
    if (args.search) params.append('search', args.search);
    if (args.cursor) params.append('cursor', args.cursor);

    const response = await this.client.get(`/projects/shared?${params.toString()}`);
}

async function createProject(credentials, args) {
    const body = {};
    if (args.name) body.project = { name: args.name };
    if (args.org_id) body.project = { ...body.project, org_id: args.org_id };
    if (args.region_id) body.project = { ...body.project, region_id: args.region_id };
    if (args.pg_version) body.project = { ...body.project, pg_version: args.pg_version };

    const response = await this.client.post('/projects', body);
}

async function deleteProject(credentials, args) {
    const response = await this.client.delete(`/projects/${args.projectId}`);
}

async function describeProject(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}`);
}

async function updateProject(credentials, args) {
    const body = { project: {} };
    if (args.name) body.project.name = args.name;
    if (args.settings) body.project.settings = args.settings;

    const response = await this.client.patch(`/projects/${args.projectId}`, body);
}

async function getProjectOperations(credentials, args) {
    const params = new URLSearchParams();
    if (args.limit) params.append('limit', args.limit.toString());

    const response = await this.client.get(`/projects/${args.projectId}/operations?${params.toString()}`);
}

async function getProjectConsumption(credentials, args) {
    const params = new URLSearchParams();
    if (args.from) params.append('from', args.from);
    if (args.to) params.append('to', args.to);

    const response = await this.client.get(`/projects/${args.projectId}/consumption?${params.toString()}`);
}

async function setProjectSettings(credentials, args) {
    const response = await this.client.patch(`/projects/${args.projectId}`, { project: { settings: args.settings } });
}

async function getProjectQuotas(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}`);
    const quotas = response.data.project?.quotas || {};
}

async function cloneProject(credentials, args) {
}

async function getProjectPermissions(credentials, args) {
}

async function createBranch(credentials, args) {
    const body = { branch: {} };
    if (args.branchName) body.branch.name = args.branchName;
    if (args.parent_id) body.branch.parent_id = args.parent_id;

    const response = await this.client.post(`/projects/${args.projectId}/branches`, body);
}

async function deleteBranch(credentials, args) {
    const response = await this.client.delete(`/projects/${args.projectId}/branches/${args.branchId}`);
}

async function describeBranch(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/branches/${args.branchId}`);
}

async function resetFromParent(credentials, args) {
    const body = {};
    if (args.preserveUnderName) body.preserve_under_name = args.preserveUnderName;

    const response = await this.client.post(`/projects/${args.projectId}/branches/${args.branchIdOrName}/reset`, body);
}

async function updateBranch(credentials, args) {
    const body = { branch: {} };
    if (args.name) body.branch.name = args.name;
    if (args.protected !== undefined) body.branch.protected = args.protected;

    const response = await this.client.patch(`/projects/${args.projectId}/branches/${args.branchId}`, body);
}

async function listBranches(credentials, args) {
    const params = new URLSearchParams();
    if (args.search) params.append('search', args.search);

    const response = await this.client.get(`/projects/${args.projectId}/branches?${params.toString()}`);
}

async function getBranchDetails(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/branches/${args.branchId}`);
}

async function restoreBranch(credentials, args) {
}

async function setBranchProtection(credentials, args) {
    const response = await this.client.patch(`/projects/${args.projectId}/branches/${args.branchId}`, {
      branch: { protected: args.protected }
    });
}

async function getBranchSchemaDiff(credentials, args) {
}

async function getBranchDataDiff(credentials, args) {
}

async function mergeBranches(credentials, args) {
}

async function promoteBranch(credentials, args) {
    const response = await this.client.post(`/projects/${args.projectId}/branches/${args.branchId}/set_as_primary`, {});
}

async function setBranchRetention(credentials, args) {
}

async function getBranchHistory(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/branches/${args.branchId}`);
}

async function restoreBranchToTimestamp(credentials, args) {
    const body = { timestamp: args.timestamp };
    const response = await this.client.post(`/projects/${args.projectId}/branches/${args.branchId}/restore`, body);
}

async function getBranchSize(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/branches/${args.branchId}`);
    const size = response.data.branch?.logical_size || 0;
}

async function setBranchComputeSettings(credentials, args) {
}

async function getBranchConnections(credentials, args) {
}

async function listBranchComputes(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/endpoints`);
    const branchEndpoints = args.branchId
      ? response.data.endpoints?.filter((e) => e.branch_id === args.branchId)
      : response.data.endpoints;
}

async function runSql(credentials, args) {
}

async function runSqlTransaction(credentials, args) {
}

async function getConnectionString(credentials, args) {
}

async function getDatabaseTables(credentials, args) {
}

async function describeTableSchema(credentials, args) {
}

async function explainSqlStatement(credentials, args) {
}

async function listSlowQueries(credentials, args) {
}

async function optimizeQuery(credentials, args) {
}

async function suggestIndexes(credentials, args) {
}

async function analyzeQueryPlan(credentials, args) {
}

async function createDatabase(credentials, args) {
}

async function deleteDatabase(credentials, args) {
}

async function listDatabases(credentials, args) {
}

async function getDatabaseSize(credentials, args) {
}

async function getDatabaseStats(credentials, args) {
}

async function vacuumDatabase(credentials, args) {
}

async function analyzeDatabase(credentials, args) {
}

async function reindexDatabase(credentials, args) {
}

async function getDatabaseLocks(credentials, args) {
}

async function killDatabaseQuery(credentials, args) {
}

async function getDatabaseActivity(credentials, args) {
}

async function backupDatabase(credentials, args) {
}

async function prepareDatabaseMigration(credentials, args) {
}

async function completeDatabaseMigration(credentials, args) {
}

async function prepareQueryTuning(credentials, args) {
}

async function completeQueryTuning(credentials, args) {
}

async function createRole(credentials, args) {
}

async function deleteRole(credentials, args) {
}

async function listRoles(credentials, args) {
}

async function updateRole(credentials, args) {
}

async function grantRolePermissions(credentials, args) {
}

async function revokeRolePermissions(credentials, args) {
}

async function getRolePermissions(credentials, args) {
}

async function resetRolePassword(credentials, args) {
}

async function createEndpoint(credentials, args) {
}

async function deleteEndpoint(credentials, args) {
}

async function updateEndpoint(credentials, args) {
}

async function startEndpoint(credentials, args) {
}

async function suspendEndpoint(credentials, args) {
}

async function restartEndpoint(credentials, args) {
}

async function getEndpointMetrics(credentials, args) {
}

async function setEndpointAutoscaling(credentials, args) {
}

async function getEndpointLogs(credentials, args) {
}

async function setEndpointPooling(credentials, args) {
}

async function getQueryStatistics(credentials, args) {
}

async function getSlowQueryLog(credentials, args) {
}

async function getConnectionStats(credentials, args) {
}

async function getStorageMetrics(credentials, args) {
}

async function getComputeMetrics(credentials, args) {
}

async function getIoMetrics(credentials, args) {
}

async function getCacheHitRatio(credentials, args) {
}

async function getIndexUsage(credentials, args) {
}

async function getTableBloat(credentials, args) {
}

async function getReplicationLag(credentials, args) {
}

async function getCheckpointStats(credentials, args) {
}

async function getWalStats(credentials, args) {
}

async function setMonitoringAlerts(credentials, args) {
}

async function getAlertHistory(credentials, args) {
}

async function getPerformanceInsights(credentials, args) {
}

async function listBackups(credentials, args) {
}

async function createBackup(credentials, args) {
}

async function restoreBackup(credentials, args) {
}

async function deleteBackup(credentials, args) {
}

async function getBackupStatus(credentials, args) {
}

async function scheduleBackup(credentials, args) {
}

async function exportBackup(credentials, args) {
}

async function validateBackup(credentials, args) {
}

async function enableIpAllowlist(credentials, args) {
}

async function getIpAllowlist(credentials, args) {
}

async function enableSslEnforcement(credentials, args) {
}

async function rotateCredentials(credentials, args) {
}

async function getAuditLog(credentials, args) {
}

async function enableEncryption(credentials, args) {
}

async function getSecurityScan(credentials, args) {
}

async function setPasswordPolicy(credentials, args) {
}

async function enable2fa(credentials, args) {
}

async function getComplianceReport(credentials, args) {
}

async function getCostBreakdown(credentials, args) {
}

async function getCostForecast(credentials, args) {
}

async function setCostAlerts(credentials, args) {
}

async function getCostOptimizationTips(credentials, args) {
}

async function getBillingHistory(credentials, args) {
}

async function exportCostReport(credentials, args) {
}

async function setBudgetLimits(credentials, args) {
}

async function getResourceRecommendations(credentials, args) {
}

async function createWebhook(credentials, args) {
}

async function listWebhooks(credentials, args) {
}

async function deleteWebhook(credentials, args) {
}

async function testWebhook(credentials, args) {
}

async function getWebhookLogs(credentials, args) {
}

async function createApiKey(credentials, args) {
}

async function detectNPlusOne(credentials, args) {
}

async function suggestPartitioning(credentials, args) {
}

async function analyzeTableStatistics(credentials, args) {
}

async function suggestVacuumStrategy(credentials, args) {
}

async function detectMissingIndexes(credentials, args) {
}

async function analyzeJoinPerformance(credentials, args) {
}

async function suggestMaterializedViews(credentials, args) {
}

async function getTableDependencies(credentials, args) {
}

async function suggestQueryRewrite(credentials, args) {
}

async function analyzeDeadlocks(credentials, args) {
}

async function provisionNeonAuth(credentials, args) {
}

async function listApiKeys(credentials, args) {
    const response = await this.client.get('/api_keys');
}

async function createApiKeyForProject(credentials, args) {
    const body = { key_name: args.keyName };
    if (args.projectId) body.project_id = args.projectId;

    const response = await this.client.post('/api_keys', body);
}

async function revokeApiKey(credentials, args) {
    const response = await this.client.delete(`/api_keys/${args.keyId}`);
}

async function getConnectionPoolerConfig(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/endpoints/${args.endpointId}`);
    const poolerConfig = response.data.endpoint?.pooler_enabled ? {
      pooler_enabled: response.data.endpoint.pooler_enabled,
      pooler_mode: response.data.endpoint.pooler_mode,
      settings: response.data.endpoint.settings
    } : { pooler_enabled: false };

}

async function updateConnectionPoolerConfig(credentials, args) {
    const body = { endpoint: {} };
    if (args.poolMode) body.endpoint.pooler_mode = args.poolMode;
    if (args.poolSize !== undefined) body.endpoint.settings = { ...body.endpoint.settings, pool_size: args.poolSize };
    if (args.maxClientConn !== undefined) body.endpoint.settings = { ...body.endpoint.settings, max_client_conn: args.maxClientConn };

    const response = await this.client.patch(`/projects/${args.projectId}/endpoints/${args.endpointId}`, body);
}

async function createReadReplica(credentials, args) {
    const body = {
      endpoint: {
        branch_id: args.branchId,
        type: 'read_only'
      }
    };
    if (args.region) body.endpoint.region_id = args.region;

    const response = await this.client.post(`/projects/${args.projectId}/endpoints`, body);
}

async function listReadReplicas(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/endpoints`);
    const readReplicas = response.data.endpoints?.filter((ep) =>
      ep.type === 'read_only' && ep.branch_id === args.branchId
    ) || [];

}

async function shareProject(credentials, args) {
    const body = {
      email: args.email
    };
    if (args.role) body.role = args.role;

    const response = await this.client.post(`/projects/${args.projectId}/permissions`, body);
}

async function listProjectShares(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/permissions`);
}

async function revokeProjectShare(credentials, args) {
    const response = await this.client.delete(`/projects/${args.projectId}/permissions/${args.shareId}`);
}

async function listExtensions(credentials, args) {
    const branchId = args.branchId || 'main';
    const dbName = args.databaseName || 'neondb';
    const sql = 'SELECT * FROM pg_available_extensions ORDER BY name';
    const response = await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: sql });
}

async function enableExtension(credentials, args) {
    const branchId = args.branchId || 'main';
    const dbName = args.databaseName || 'neondb';
    const schema = args.schema || 'public';
    const sql = `CREATE EXTENSION IF NOT EXISTS "${args.extensionName}" SCHEMA ${schema}`;
    const response = await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: sql });
}

async function disableExtension(credentials, args) {
    const branchId = args.branchId || 'main';
    const dbName = args.databaseName || 'neondb';
    const sql = `DROP EXTENSION IF EXISTS "${args.extensionName}"`;
    const response = await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: sql });
}

async function getExtensionDetails(credentials, args) {
    const branchId = args.branchId || 'main';
    const dbName = args.databaseName || 'neondb';
    const sql = `SELECT * FROM pg_extension WHERE extname = '${args.extensionName}'`;
    const response = await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: sql });
}

async function updateExtension(credentials, args) {
    const branchId = args.branchId || 'main';
    const dbName = args.databaseName || 'neondb';
    const version = args.version ? `TO '${args.version}'` : '';
    const sql = `ALTER EXTENSION "${args.extensionName}" UPDATE ${version}`;
    const response = await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: sql });
}

async function createMigration(credentials, args) {
    const branchId = args.branchId || 'main';
    const dbName = args.databaseName || 'neondb';
    // Create migration tracking table if not exists
    const createTableSql = `CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      sql TEXT NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: createTableSql });

    // Execute migration
    await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: args.sql });

    // Record migration
    const recordSql = `INSERT INTO schema_migrations (name, sql) VALUES ('${args.name}', '${args.sql.replace(/'/g, "''")}')`;
    const response = await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: recordSql });
}

async function listMigrations(credentials, args) {
    const branchId = args.branchId || 'main';
    const dbName = args.databaseName || 'neondb';
    const sql = 'SELECT * FROM schema_migrations ORDER BY applied_at DESC';
    const response = await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: sql });
}

async function rollbackMigration(credentials, args) {
    const branchId = args.branchId || 'main';
    const dbName = args.databaseName || 'neondb';
    const sql = `DELETE FROM schema_migrations WHERE id = ${args.migrationId}`;
    const response = await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: sql });
}

async function getConnectionUri(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/connection_uri`, {
      params: {
        branch_id: args.branchId,
        database_name: args.databaseName,
        role_name: args.roleName,
        pooled: args.pooled
      }
    });
    const uri = response.data.uri;

    if (args.format) {
      const formatted = this.formatConnectionString(uri, args.format);
    }

}

async function testConnection(credentials, args) {
    const branchId = args.branchId || 'main';
    const dbName = args.databaseName || 'neondb';
    const startTime = Date.now();
    try {
      await this.client.post(`/projects/${args.projectId}/branches/${branchId}/databases/${dbName}/query`, { query: 'SELECT 1' });
      const latency = Date.now() - startTime;
    } catch (error) {
    }
}

async function getConnectionExamples(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/connection_uri`, {
      params: {
        branch_id: args.branchId,
        database_name: args.databaseName
      }
    });
    const uri = response.data.uri;

    const examples = {
      javascript: `const { Pool } = require('pg');\nconst pool = new Pool({ connectionString: '${uri}' });\n\nconst result = await pool.query('SELECT * FROM users');\nconsole.log(result.rows);`,
      typescript: `import { Pool } from 'pg';\nconst pool = new Pool({ connectionString: '${uri}' });\n\nconst result = await pool.query<User>('SELECT * FROM users');\nconsole.log(result.rows);`,
      python: `import psycopg2\n\nconn = psycopg2.connect('${uri}')\ncur = conn.cursor()\ncur.execute('SELECT * FROM users')\nrows = cur.fetchall()`,
      go: `import (\n  "database/sql"\n  _ "github.com/lib/pq"\n)\n\ndb, err := sql.Open("postgres", "${uri}")\nrows, err := db.Query("SELECT * FROM users")`,
      rust: `use postgres::{Client, NoTls};\n\nlet mut client = Client::connect("${uri}", NoTls)?;\nlet rows = client.query("SELECT * FROM users", &[])?;`,
      java: `import java.sql.*;\n\nString url = "${uri.replace('postgres://', 'jdbc:postgresql://')}";\nConnection conn = DriverManager.getConnection(url);\nStatement stmt = conn.createStatement();\nResultSet rs = stmt.executeQuery("SELECT * FROM users");`,
      php: `<?php\n$conn = pg_connect('${uri}');\n$result = pg_query($conn, 'SELECT * FROM users');\n$rows = pg_fetch_all($result);`,
      ruby: `require 'pg'\n\nconn = PG.connect('${uri}')\nresult = conn.exec('SELECT * FROM users')\nresult.each { |row| puts row }`
    };

    const example = examples[args.language || 'javascript'];
}

async function createFromTemplate(credentials, args) {
    // Note: This is a placeholder - Neon API may not have direct template support
    // This would create a project and then apply template SQL
    const response = await this.client.post('/projects', {
      project: {
        name: args.name,
        region_id: args.region
      }
    });
}

async function listTemplates(credentials, args) {
    // Note: This is a placeholder - returning common templates
    const templates = [
      { id: 'nextjs', name: 'Next.js Starter', description: 'PostgreSQL schema for Next.js apps' },
      { id: 'rails', name: 'Ruby on Rails', description: 'Rails-compatible schema' },
      { id: 'django', name: 'Django', description: 'Django-compatible schema' },
      { id: 'ecommerce', name: 'E-commerce', description: 'Product catalog and orders' },
      { id: 'saas', name: 'SaaS Multi-tenant', description: 'Multi-tenant SaaS schema' }
    ];

    const filtered = args.category
      ? templates.filter(t => t.name.toLowerCase().includes(args.category.toLowerCase()))
      : templates;

}

async function getRealTimeMetrics(credentials, args) {
    const response = await this.client.get(`/projects/${args.projectId}/operations`, {
      params: { limit: 10 }
    });
}

async function exportMetrics(credentials, args) {
    const config = {
      destination: args.destination,
      projectId: args.projectId,
      config: args.config,
      message: `Metrics export configured for ${args.destination}. Note: This requires additional setup in your monitoring system.`
    };
}

async function checkApiKey(credentials, args) {
    if (!this.isEnabled) {
      return {
        content: [{
          type: 'text',
            enabled: false,
            message: 'Neon API key not configured. Set NEON_API_KEY environment variable to enable Neon tools.',
            instructions: 'Get your API key from: https://console.neon.tech/app/settings/api-keys'
          }, null, 2)
        }]
      };
    }

    try {
      // Test API key by listing projects
      await this.client.get('/projects', { params: { limit: 1 } });
      return {
        content: [{
          type: 'text',
            enabled: true,
            message: 'Neon API key is valid and working!'
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
            enabled: false,
            error: error.message,
            message: 'Neon API key is configured but invalid. Please check your API key.'
          }, null, 2)
        }]
      };
    }
}

async function createProjectForRAD(credentials, args) {
    if (!this.isEnabled) {
      return {
        content: [{
          type: 'text',
          text: 'Error: Neon API key not configured. Set NEON_API_KEY environment variable.'
        }]
      };
    }

    const projectData = {
      project: {
        name: args.name || 'RAD Crawler',
        region_id: args.region || 'aws-us-east-1',
        pg_version: 16
      }
    };

    if (args.org_id) {
      projectData.project.org_id = args.org_id;
    }

    const response = await this.client.post('/projects', projectData);
    return {
      content: [{
        type: 'text',
          success: true,
          project: response.data.project,
          message: 'RAD Crawler project created successfully!',
          next_steps: [
            'Use neon_deploy_schema to deploy your schema',
            'Use neon_get_connection_uri to get connection string'
          ]
        }, null, 2)
      }]
    };
}

async function deploySchema(credentials, args) {
    if (!this.isEnabled) {
      return {
        content: [{
          type: 'text',
          text: 'Error: Neon API key not configured. Set NEON_API_KEY environment variable.'
        }]
      };
    }

    // Split schema into individual statements
    const statements = args.schemaSQL
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const results = [];
    for (const sql of statements) {
      try {
        const response = await this.client.post(
          `/projects/${args.projectId}/branches/${args.branchId || 'main'}/databases/${args.databaseName || 'neondb'}/query`,
          { query: sql + ';' }
        );
        results.push({ success: true, statement: sql.substring(0, 100) + '...' });
      } catch (error) {
        results.push({ success: false, statement: sql.substring(0, 100) + '...', error: error.message });
      }
    }

    const successCount = results.filter(r => r.success).length;
    return {
      content: [{
        type: 'text',
          success: successCount === results.length,
          total_statements: results.length,
          successful: successCount,
          failed: results.length - successCount,
          results
        }, null, 2)
      }]
    };
}

async function verifySchema(credentials, args) {
    if (!this.isEnabled) {
      return {
        content: [{
          type: 'text',
          text: 'Error: Neon API key not configured. Set NEON_API_KEY environment variable.'
        }]
      };
    }

    const sql = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    `;

    const response = await this.client.post(
      `/projects/${args.projectId}/branches/${args.branchId || 'main'}/databases/${args.databaseName || 'neondb'}/query`,
      { query: sql }
    );

    const existingTables = response.data.rows.map((r) => r.table_name);
    const missingTables = args.requiredTables.filter((t) => !existingTables.includes(t));

    return {
      content: [{
        type: 'text',
          success: missingTables.length === 0,
          existing_tables: existingTables,
          required_tables: args.requiredTables,
          missing_tables: missingTables,
          message: missingTables.length === 0
            ? 'All required tables exist!'
            : `Missing tables: ${missingTables.join(', ')}`
        }, null, 2)
      }]
    };
}

async function setupRADDatabase(credentials, args) {
    if (!this.isEnabled) {
      return {
        content: [{
          type: 'text',
            success: false,
            error: 'Neon API key not configured',
            message: 'Set NEON_API_KEY environment variable to enable autonomous setup.',
            instructions: 'Get your API key from: https://console.neon.tech/app/settings/api-keys'
          }, null, 2)
        }]
      };
    }

    try {
      // Step 1: Create project
      const projectResult = await this.createProjectForRAD({
        name: args.projectName || 'RAD Crawler',
        region: args.region || 'aws-us-east-1',
        org_id: args.org_id
      });
      const project = JSON.parse(projectResult.content[0].text).project;

      // Step 2: Create database
      await this.client.post(
        `/projects/${project.id}/branches/main/databases`,
        { database: { name: args.databaseName || 'rad_production', owner_name: 'neondb_owner' } }
      );

      // Step 3: Deploy schema
      await this.deploySchema({
        projectId: project.id,
        branchId: 'main',
        databaseName: args.databaseName || 'rad_production',
        schemaSQL: args.schemaSQL
      });

      // Step 4: Get connection URI
      const uriResult = await this.getConnectionUri({
        projectId: project.id,
        branchId: 'main',
        databaseName: args.databaseName || 'rad_production',
        pooled: true
      });
      const connectionUri = JSON.parse(uriResult.content[0].text).connection_uri;

      return {
        content: [{
          type: 'text',
            success: true,
            project_id: project.id,
            database_name: args.databaseName || 'rad_production',
            connection_uri: connectionUri,
            message: 'RAD database setup complete! Add NEON_DATABASE_URL to your environment config.',
            next_steps: [
              `Set NEON_DATABASE_URL="${connectionUri}"`,
              'Update WORKING_AUGMENT_CONFIG.json',
              'Restart VS Code'
            ]
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
            success: false,
            error: error.message,
            message: 'Failed to set up RAD database. Check error details above.'
          }, null, 2)
        }]
      };
    }
}

async function executeNeonTool(toolName, args, credentials) {
  const tools = {
    'neon_listProjects': listProjects,
    'neon_listOrganizations': listOrganizations,
    'neon_listSharedProjects': listSharedProjects,
    'neon_createProject': createProject,
    'neon_deleteProject': deleteProject,
    'neon_describeProject': describeProject,
    'neon_updateProject': updateProject,
    'neon_getProjectOperations': getProjectOperations,
    'neon_getProjectConsumption': getProjectConsumption,
    'neon_setProjectSettings': setProjectSettings,
    'neon_getProjectQuotas': getProjectQuotas,
    'neon_cloneProject': cloneProject,
    'neon_getProjectPermissions': getProjectPermissions,
    'neon_createBranch': createBranch,
    'neon_deleteBranch': deleteBranch,
    'neon_describeBranch': describeBranch,
    'neon_resetFromParent': resetFromParent,
    'neon_updateBranch': updateBranch,
    'neon_listBranches': listBranches,
    'neon_getBranchDetails': getBranchDetails,
    'neon_restoreBranch': restoreBranch,
    'neon_setBranchProtection': setBranchProtection,
    'neon_getBranchSchemaDiff': getBranchSchemaDiff,
    'neon_getBranchDataDiff': getBranchDataDiff,
    'neon_mergeBranches': mergeBranches,
    'neon_promoteBranch': promoteBranch,
    'neon_setBranchRetention': setBranchRetention,
    'neon_getBranchHistory': getBranchHistory,
    'neon_restoreBranchToTimestamp': restoreBranchToTimestamp,
    'neon_getBranchSize': getBranchSize,
    'neon_setBranchComputeSettings': setBranchComputeSettings,
    'neon_getBranchConnections': getBranchConnections,
    'neon_listBranchComputes': listBranchComputes,
    'neon_runSql': runSql,
    'neon_runSqlTransaction': runSqlTransaction,
    'neon_getConnectionString': getConnectionString,
    'neon_getDatabaseTables': getDatabaseTables,
    'neon_describeTableSchema': describeTableSchema,
    'neon_explainSqlStatement': explainSqlStatement,
    'neon_listSlowQueries': listSlowQueries,
    'neon_optimizeQuery': optimizeQuery,
    'neon_suggestIndexes': suggestIndexes,
    'neon_analyzeQueryPlan': analyzeQueryPlan,
    'neon_createDatabase': createDatabase,
    'neon_deleteDatabase': deleteDatabase,
    'neon_listDatabases': listDatabases,
    'neon_getDatabaseSize': getDatabaseSize,
    'neon_getDatabaseStats': getDatabaseStats,
    'neon_vacuumDatabase': vacuumDatabase,
    'neon_analyzeDatabase': analyzeDatabase,
    'neon_reindexDatabase': reindexDatabase,
    'neon_getDatabaseLocks': getDatabaseLocks,
    'neon_killDatabaseQuery': killDatabaseQuery,
    'neon_getDatabaseActivity': getDatabaseActivity,
    'neon_backupDatabase': backupDatabase,
    'neon_prepareDatabaseMigration': prepareDatabaseMigration,
    'neon_completeDatabaseMigration': completeDatabaseMigration,
    'neon_prepareQueryTuning': prepareQueryTuning,
    'neon_completeQueryTuning': completeQueryTuning,
    'neon_createRole': createRole,
    'neon_deleteRole': deleteRole,
    'neon_listRoles': listRoles,
    'neon_updateRole': updateRole,
    'neon_grantRolePermissions': grantRolePermissions,
    'neon_revokeRolePermissions': revokeRolePermissions,
    'neon_getRolePermissions': getRolePermissions,
    'neon_resetRolePassword': resetRolePassword,
    'neon_createEndpoint': createEndpoint,
    'neon_deleteEndpoint': deleteEndpoint,
    'neon_updateEndpoint': updateEndpoint,
    'neon_startEndpoint': startEndpoint,
    'neon_suspendEndpoint': suspendEndpoint,
    'neon_restartEndpoint': restartEndpoint,
    'neon_getEndpointMetrics': getEndpointMetrics,
    'neon_setEndpointAutoscaling': setEndpointAutoscaling,
    'neon_getEndpointLogs': getEndpointLogs,
    'neon_setEndpointPooling': setEndpointPooling,
    'neon_getQueryStatistics': getQueryStatistics,
    'neon_getSlowQueryLog': getSlowQueryLog,
    'neon_getConnectionStats': getConnectionStats,
    'neon_getStorageMetrics': getStorageMetrics,
    'neon_getComputeMetrics': getComputeMetrics,
    'neon_getIoMetrics': getIoMetrics,
    'neon_getCacheHitRatio': getCacheHitRatio,
    'neon_getIndexUsage': getIndexUsage,
    'neon_getTableBloat': getTableBloat,
    'neon_getReplicationLag': getReplicationLag,
    'neon_getCheckpointStats': getCheckpointStats,
    'neon_getWalStats': getWalStats,
    'neon_setMonitoringAlerts': setMonitoringAlerts,
    'neon_getAlertHistory': getAlertHistory,
    'neon_getPerformanceInsights': getPerformanceInsights,
    'neon_listBackups': listBackups,
    'neon_createBackup': createBackup,
    'neon_restoreBackup': restoreBackup,
    'neon_deleteBackup': deleteBackup,
    'neon_getBackupStatus': getBackupStatus,
    'neon_scheduleBackup': scheduleBackup,
    'neon_exportBackup': exportBackup,
    'neon_validateBackup': validateBackup,
    'neon_enableIpAllowlist': enableIpAllowlist,
    'neon_getIpAllowlist': getIpAllowlist,
    'neon_enableSslEnforcement': enableSslEnforcement,
    'neon_rotateCredentials': rotateCredentials,
    'neon_getAuditLog': getAuditLog,
    'neon_enableEncryption': enableEncryption,
    'neon_getSecurityScan': getSecurityScan,
    'neon_setPasswordPolicy': setPasswordPolicy,
    'neon_enable2fa': enable2fa,
    'neon_getComplianceReport': getComplianceReport,
    'neon_getCostBreakdown': getCostBreakdown,
    'neon_getCostForecast': getCostForecast,
    'neon_setCostAlerts': setCostAlerts,
    'neon_getCostOptimizationTips': getCostOptimizationTips,
    'neon_getBillingHistory': getBillingHistory,
    'neon_exportCostReport': exportCostReport,
    'neon_setBudgetLimits': setBudgetLimits,
    'neon_getResourceRecommendations': getResourceRecommendations,
    'neon_createWebhook': createWebhook,
    'neon_listWebhooks': listWebhooks,
    'neon_deleteWebhook': deleteWebhook,
    'neon_testWebhook': testWebhook,
    'neon_getWebhookLogs': getWebhookLogs,
    'neon_createApiKey': createApiKey,
    'neon_detectNPlusOne': detectNPlusOne,
    'neon_suggestPartitioning': suggestPartitioning,
    'neon_analyzeTableStatistics': analyzeTableStatistics,
    'neon_suggestVacuumStrategy': suggestVacuumStrategy,
    'neon_detectMissingIndexes': detectMissingIndexes,
    'neon_analyzeJoinPerformance': analyzeJoinPerformance,
    'neon_suggestMaterializedViews': suggestMaterializedViews,
    'neon_getTableDependencies': getTableDependencies,
    'neon_suggestQueryRewrite': suggestQueryRewrite,
    'neon_analyzeDeadlocks': analyzeDeadlocks,
    'neon_provisionNeonAuth': provisionNeonAuth,
    'neon_listApiKeys': listApiKeys,
    'neon_createApiKeyForProject': createApiKeyForProject,
    'neon_revokeApiKey': revokeApiKey,
    'neon_getConnectionPoolerConfig': getConnectionPoolerConfig,
    'neon_updateConnectionPoolerConfig': updateConnectionPoolerConfig,
    'neon_createReadReplica': createReadReplica,
    'neon_listReadReplicas': listReadReplicas,
    'neon_shareProject': shareProject,
    'neon_listProjectShares': listProjectShares,
    'neon_revokeProjectShare': revokeProjectShare,
    'neon_listExtensions': listExtensions,
    'neon_enableExtension': enableExtension,
    'neon_disableExtension': disableExtension,
    'neon_getExtensionDetails': getExtensionDetails,
    'neon_updateExtension': updateExtension,
    'neon_createMigration': createMigration,
    'neon_listMigrations': listMigrations,
    'neon_rollbackMigration': rollbackMigration,
    'neon_getConnectionUri': getConnectionUri,
    'neon_testConnection': testConnection,
    'neon_getConnectionExamples': getConnectionExamples,
    'neon_createFromTemplate': createFromTemplate,
    'neon_listTemplates': listTemplates,
    'neon_getRealTimeMetrics': getRealTimeMetrics,
    'neon_exportMetrics': exportMetrics,
    'neon_checkApiKey': checkApiKey,
    'neon_createProjectForRAD': createProjectForRAD,
    'neon_deploySchema': deploySchema,
    'neon_verifySchema': verifySchema,
    'neon_setupRADDatabase': setupRADDatabase,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeNeonTool };