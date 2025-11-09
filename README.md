# Robinson's Toolkit API - Custom GPT Wrapper

## What This Is

A **REST API wrapper** that exposes Robinson's Toolkit (1,237+ tools) to Custom GPTs in ChatGPT.

Custom GPTs can only call REST APIs via OpenAPI schemas - they can't use MCP servers directly. This repo bridges that gap.

## Current Status

🔴 **NOT WORKING** - The npm package doesn't export the `UnifiedToolkit` class needed to run tools programmatically.

## The Problem

The published npm package `@robinson_ai_systems/robinsons-toolkit-mcp@1.15.0` is designed to run as an MCP server (stdio transport), not to be imported as a library.

When we try to import it:
```javascript
const { UnifiedToolkit } = await import('@robinson_ai_systems/robinsons-toolkit-mcp');
```

We get: **"UnifiedToolkit not found in module exports"**

## What Needs to Happen

**Someone needs to update the main MCP repo** (`robinsonai-mcp-servers`) to:

1. Export the `UnifiedToolkit` class from `packages/robinsons-toolkit-mcp/src/index.ts`
2. Prevent auto-start when imported as a library (not as MCP server)
3. Build and publish a new version to npm

**This API repo cannot be fixed without that change.**

## Repository Structure

```
robinsons-toolkit-api/
├── api/
│   ├── health.js          # GET /api/health - Returns 200 OK
│   └── execute.js         # POST /api/execute - Runs toolkit tools (BROKEN)
├── package.json           # Depends on @robinson_ai_systems/robinsons-toolkit-mcp
├── openapi.json           # OpenAPI 3.1.0 schema for Custom GPT
└── README.md              # This file
```

## How It Should Work (Once Fixed)

```
Custom GPT in ChatGPT
    ↓ HTTP POST
https://robinsons-toolkit-api.vercel.app/api/execute
    ↓ imports
@robinson_ai_systems/robinsons-toolkit-mcp (npm package)
    ↓ calls
GitHub, Vercel, Neon, Stripe, etc. APIs
```

## Files Explained

### `api/health.js`
Simple health check endpoint. Returns:
```json
{
  "ok": true,
  "ts": "2025-11-09T...",
  "commit": "abc123"
}
```

### `api/execute.js`
Main tool execution endpoint. Accepts:
```json
{
  "tool": "github_list_repos",
  "args": {"owner": "christcr2012"}
}
```

Returns:
```json
{
  "ok": true,
  "result": { ... }
}
```

**Currently broken** because `UnifiedToolkit` can't be imported.

### `openapi.json`
OpenAPI 3.1.0 schema that Custom GPT imports. Defines:
- `GET /api/health` - Health check
- `POST /api/execute` - Execute tools

### `package.json`
Minimal dependencies:
- `@robinson_ai_systems/robinsons-toolkit-mcp@^1.15.0` - The toolkit (needs update)

## Environment Variables (Set in Vercel)

All credentials are configured in Vercel dashboard:

- `GITHUB_TOKEN` - GitHub API access
- `VERCEL_TOKEN` - Vercel API access
- `NEON_API_KEY` - Neon database API
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token
- `OPENAI_API_KEY` - OpenAI API
- `GOOGLE_USER_EMAIL` - Google Workspace email
- `STRIPE_SECRET_KEY` - Stripe API
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase service role key
- `RESEND_API_KEY` - Resend email API
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token

## How to Use (Once Fixed)

### Step 1: Import to Custom GPT

1. Go to https://chat.openai.com
2. Click your profile → **My GPTs** → **Create a GPT**
3. Click **Configure** tab
4. Scroll to **Actions** → **Create new action**
5. Click **Import from URL**
6. Enter: `https://robinsons-toolkit-api.vercel.app/openapi.json`
7. Click **Import**

### Step 2: Test in Custom GPT

Try these prompts:
- "List my GitHub repositories"
- "Create a new Vercel project"
- "Check my Neon databases"
- "Send a test email via Resend"

The GPT will automatically call the appropriate tools!

### Step 3: Test via curl

```bash
# Health check
curl https://robinsons-toolkit-api.vercel.app/api/health

# Execute a tool
curl -X POST https://robinsons-toolkit-api.vercel.app/api/execute \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "github_list_repos",
    "args": {"owner": "christcr2012"}
  }'
```

## Deployment

Vercel auto-deploys on every push to `main` branch.

**Deployment URL:** https://robinsons-toolkit-api.vercel.app
**Vercel Dashboard:** https://vercel.com/chris-projects-de6cd1bf/robinsons-toolkit-api

## What This Repo Should NOT Have

❌ MCP server code
❌ Tool implementations
❌ Integration logic
❌ Build scripts for the toolkit

This repo should ONLY have:
✅ Serverless API endpoints (`api/` folder)
✅ OpenAPI schema (`openapi.json`)
✅ Package dependencies (`package.json`)
✅ Documentation (`README.md`)

## Troubleshooting

**"UnifiedToolkit not found in module exports"**
→ The npm package needs to be updated to export `UnifiedToolkit`. This must be done in the main MCP repo.

**"Connection closed" or timeout errors**
→ Check Vercel function logs: https://vercel.com/chris-projects-de6cd1bf/robinsons-toolkit-api/logs

**"Unauthorized" errors**
→ Check environment variables in Vercel dashboard

**Custom GPT can't import schema**
→ Verify schema is valid: https://robinsons-toolkit-api.vercel.app/openapi.json

## Next Steps

1. **Wait for main MCP repo to export `UnifiedToolkit`**
2. **Update package.json** to use new version
3. **Push to trigger Vercel deployment**
4. **Test with Custom GPT**

---

**This repo is ready.** It just needs the main MCP repo to publish a new version of the toolkit with `UnifiedToolkit` exported.
