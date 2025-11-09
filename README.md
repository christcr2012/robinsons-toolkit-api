# Robinson's Toolkit API

REST API wrapper for Robinson's Toolkit - enables Custom GPT integration with 1,237+ tools across 16+ categories.

## 🚀 Live API

**Base URL:** `https://robinsons-toolkit-api.vercel.app`

## 📋 Endpoints

### Health Check
```bash
GET /api/health
```

Returns API status and deployment information.

**Example:**
```bash
curl https://robinsons-toolkit-api.vercel.app/api/health
```

**Response:**
```json
{
  "ok": true,
  "ts": "2025-11-09T22:43:07.492Z",
  "commit": "3377a75..."
}
```

### Execute Tool
```bash
POST /api/execute
```

Execute any tool from Robinson's Toolkit.

**Headers:**
- `Content-Type: application/json`
- `x-api-key: YOUR_API_KEY` (if API_KEY environment variable is set)

**Request Body:**
```json
{
  "tool": "github_list_repos",
  "args": {
    "owner": "christcr2012"
  }
}
```

**Example:**
```bash
curl -X POST https://robinsons-toolkit-api.vercel.app/api/execute \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"tool": "github_list_repos", "args": {"owner": "christcr2012"}}'
```

**Response:**
```json
{
  "ok": true,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "[...repository data...]"
      }
    ]
  }
}
```

## 🛠️ Available Tools

Robinson's Toolkit provides **1,237+ tools** across **16+ categories**:

- **GitHub** (241 tools) - Repository management, issues, PRs, actions
- **Vercel** (150 tools) - Deployments, projects, domains
- **Neon** (666 tools) - PostgreSQL database management
- **Upstash Redis** (157 tools) - Redis operations
- **Google Workspace** (192 tools) - Gmail, Drive, Calendar, Sheets
- **OpenAI** (259 tools) - AI models, embeddings, fine-tuning
- **PostgreSQL** (25 tools) - Database with pgvector
- **Neo4j** (20 tools) - Knowledge graph operations
- **Qdrant** (15 tools) - Vector search
- **N8N** (12 tools) - Workflow automation
- **Stripe** (105 tools) - Payment processing
- **Supabase** (80 tools) - Backend as a service
- **Playwright** (33 tools) - Browser automation
- **Twilio** (70 tools) - SMS, voice, messaging
- **Resend** (60 tools) - Email delivery
- **Cloudflare** (90 tools) - CDN, DNS, workers
- **Context7** (8 tools) - Documentation search

## 🔧 Custom GPT Integration

### 1. Import OpenAPI Schema

In your Custom GPT configuration:

1. Go to **Configure** → **Actions**
2. Click **Import from URL** or **Import from file**
3. Use the `openapi.json` file from this repository

### 2. Configure Authentication

1. Set **Authentication** to **API Key**
2. Choose **Header** authentication
3. Set header name to `x-api-key`
4. Enter your API key

### 3. Add Instructions

Add this to your Custom GPT instructions:

```
You have access to Robinson's Toolkit with 1,237+ tools across 16+ categories.

To execute any tool, call the /api/execute endpoint with:
{
  "tool": "tool_name",
  "args": { ...tool-specific arguments... }
}

Available tool categories:
- github_* - GitHub operations
- vercel_* - Vercel deployments
- neon_* - Neon PostgreSQL
- upstash_* - Upstash Redis
- google_* - Google Workspace
- openai_* - OpenAI API
- postgres_* - PostgreSQL with pgvector
- neo4j_* - Neo4j graph database
- qdrant_* - Qdrant vector search
- n8n_* - N8N workflows
- stripe_* - Stripe payments
- supabase_* - Supabase backend
- playwright_* - Browser automation
- twilio_* - Twilio messaging
- resend_* - Resend email
- cloudflare_* - Cloudflare services
- context7_* - Documentation search
```

## 🔐 Environment Variables

Set these in your Vercel project:

- `API_KEY` (optional) - API key for authentication
- `GITHUB_TOKEN` - GitHub personal access token
- `VERCEL_TOKEN` - Vercel API token
- `NEON_API_KEY` - Neon API key
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token
- `GOOGLE_CLIENT_EMAIL` - Google service account email
- `GOOGLE_PRIVATE_KEY` - Google service account private key
- `OPENAI_API_KEY` - OpenAI API key
- (and other service-specific credentials)

## 📦 Deployment

This API is deployed on Vercel and uses the published npm package `@robinson_ai_systems/robinsons-toolkit-mcp`.

### Deploy Your Own

1. Fork this repository
2. Connect to Vercel
3. Set environment variables
4. Deploy!

```bash
vercel --prod
```

## 🏗️ Architecture

```
Custom GPT (ChatGPT)
    ↓ HTTP REST API
Robinson's Toolkit API (Vercel Serverless)
    ↓ npm package
@robinson_ai_systems/robinsons-toolkit-mcp
    ↓ API calls
External Services (GitHub, Vercel, Neon, etc.)
```

## 📝 License

UNLICENSED - Private use only

## 🔗 Links

- **Live API:** https://robinsons-toolkit-api.vercel.app
- **Main Repository:** https://github.com/christcr2012/robinsonai-mcp-servers
- **npm Package:** @robinson_ai_systems/robinsons-toolkit-mcp
