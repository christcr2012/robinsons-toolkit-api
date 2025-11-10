# Custom GPT Knowledge Base - Dual API Integration

This Custom GPT has access to TWO powerful API systems:

## 1. Robinson's Toolkit API (1,713 Tools)
**Base URL:** https://robinsons-toolkit-api.vercel.app
**Authentication:** x-api-key header with value 'robinson-toolkit-api-secure-key-2025'

### What It Does
Provides 1,713 tools across 17 integration categories for external services:
- GitHub (241 tools) - Repository management, issues, PRs, workflows
- Vercel (150 tools) - Deployment and project management
- Neon (167 tools) - PostgreSQL database management
- Upstash (157 tools) - Redis and Kafka operations
- Google Workspace (262 tools) - Gmail, Drive, Calendar, Sheets, etc.
- OpenAI (73 tools) - AI model operations
- Stripe (150 tools) - Payment processing
- Supabase (97 tools) - Backend as a service
- Playwright (49 tools) - Browser automation
- Twilio (83 tools) - SMS and phone operations
- Resend (40 tools) - Email sending
- Context7 (12 tools) - Documentation search
- Cloudflare (160 tools) - CDN and DNS management
- Postgres (25 tools) - Direct PostgreSQL operations
- Neo4j (20 tools) - Graph database operations
- Qdrant (15 tools) - Vector database operations
- n8n (12 tools) - Workflow automation

### How to Use
1. **Discover tools:** GET /api/tools/list?q=<keyword>
2. **Execute tool:** POST /api/execute with {"tool": "<name>", "args": {...}}

### Example
\\\
# Find GitHub tools
GET /api/tools/list?q=github&limit=10

# Execute a tool
POST /api/execute
{
  "tool": "github_list_repos",
  "args": {"owner": "christcr2012", "per_page": 5}
}
\\\

---

## 2. ITAK AI Stack API (Database & AI)
**Base URL:** https://api.srv823383.hstgr.cloud
**Authentication:** X-User-Id or X-User header with value 'david' or 'chris'

### What It Does
Provides direct access to David and Chris's databases and AI capabilities:

#### PostgreSQL Database
- List tables and schemas
- Execute read queries (SELECT)
- Execute write queries (INSERT, UPDATE, DELETE)
- Get table structure (columns, indexes)
- Vector similarity search (pgvector)

#### Neo4j Graph Database
- Execute Cypher queries
- List nodes and relationships
- Graph traversal and pattern matching

#### Qdrant Vector Database
- List collections
- Vector similarity search
- Upsert and delete points
- Get collection info

#### LangChain Integration
- Chat with LLM (GPT-3.5-turbo, GPT-4, etc.)
- RAG (Retrieval-Augmented Generation) queries
- Document ingestion with automatic embeddings
- Context-aware responses using user's data

#### API Gateway
- Unified access to multiple services:
  - n8n (workflow automation)
  - crawl4ai (web scraping)
  - searxng (meta search engine)
- Single authentication point
- Unified error handling

### Key Endpoints

#### Database Operations
\\\
# PostgreSQL
GET /api/v1/postgres/tables - List all tables
GET /api/v1/postgres/query?sql=SELECT * FROM users LIMIT 10
POST /api/v1/postgres/execute - Execute write query

# Neo4j
GET /api/v1/neo4j/query?cypher=MATCH (n) RETURN n LIMIT 10
POST /api/v1/neo4j/execute - Execute Cypher query

# Qdrant
GET /api/v1/qdrant/collections - List collections
POST /api/v1/qdrant/collections/{name}/search - Vector search
\\\

#### AI/LangChain Operations
\\\
# Chat with LLM
POST /api/v1/langchain/chat
{
  "messages": [{"role": "user", "content": "Hello"}],
  "model": "gpt-3.5-turbo",
  "use_rag": true
}

# RAG Query
POST /api/v1/langchain/rag/query
{
  "query": "What are the main features?",
  "collection_name": "documents",
  "limit": 5
}

# Ingest Document
POST /api/v1/langchain/documents/ingest
{
  "content": "Document text here",
  "metadata": {"source": "manual"},
  "collection_name": "documents"
}
\\\

#### Gateway Operations
\\\
# List available services
GET /api/v1/gateway/services

# Proxy to n8n
GET /api/v1/gateway/n8n/api/v1/workflows

# Proxy to crawl4ai
POST /api/v1/gateway/crawl4ai/crawl

# Check service health
GET /api/v1/gateway/{service}/health
\\\

---

## When to Use Which API

### Use Robinson's Toolkit API for:
- External service integrations (GitHub, Vercel, Stripe, etc.)
- Deploying applications
- Managing cloud resources
- Sending emails or SMS
- Browser automation
- Payment processing
- Third-party API operations

### Use ITAK AI Stack API for:
- Querying David or Chris's databases
- Storing and retrieving data
- Vector similarity search
- Graph database operations
- RAG (Retrieval-Augmented Generation)
- LLM chat with context from databases
- Document ingestion and search
- Accessing n8n workflows, web scraping, or search engines

---

## Authentication Summary

| API | Header | Value |
|-----|--------|-------|
| Robinson's Toolkit | x-api-key | robinson-toolkit-api-secure-key-2025 |
| ITAK AI Stack | X-User-Id or X-User | david or chris |

---

## Rate Limits

### Robinson's Toolkit API
- 100 tokens max
- Refills at 10 tokens/second
- 1 token per request
- Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset

### ITAK AI Stack API
- No explicit rate limits documented
- Use responsibly

---

## Health Checks

- Robinson's Toolkit: GET https://robinsons-toolkit-api.vercel.app/api/health
- ITAK AI Stack: GET https://api.srv823383.hstgr.cloud/health

---

## OpenAPI Schemas

- Robinson's Toolkit: https://robinsons-toolkit-api.vercel.app/api/openapi
- ITAK AI Stack: https://api.srv823383.hstgr.cloud/openapi.json

---

## Tips for Effective Use

1. **Start with discovery** - Use Robinson's Toolkit's /api/tools/list to find the right tool
2. **Check both APIs** - Some operations might be available in both (e.g., database operations)
3. **Use RAG for context** - ITAK's RAG feature can provide context-aware responses
4. **Combine APIs** - Use Robinson's Toolkit to fetch data, ITAK to store/analyze it
5. **Monitor rate limits** - Check X-RateLimit headers on Robinson's Toolkit
6. **Use gateway for unified access** - ITAK's gateway provides single auth point for multiple services

---

*This knowledge base covers both API systems available to this Custom GPT*
