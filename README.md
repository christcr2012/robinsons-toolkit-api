# Robinson's Toolkit API - Custom GPT Wrapper

## What This Is

This is a **Vercel serverless API** that wraps Robinson's Toolkit MCP (1,237+ tools) and exposes it as a REST API so Custom GPTs in ChatGPT can use it.

**This is NOT the main MCP server repository!** This is a separate, standalone deployment.

## How It Works

```
Custom GPT (ChatGPT)
    ↓ (calls via OpenAPI/REST)
Vercel Serverless API (this repo)
    ↓ (imports npm package)
@robinson_ai_systems/robinsons-toolkit-mcp
    ↓ (executes tools)
GitHub, Vercel, Neon, etc. APIs
```

## Repository Structure

```
robinsons-toolkit-api/          ← THIS REPO (separate from main MCP servers)
├── api/
│   ├── health.js               ← GET /api/health - health check
│   └── execute.js              ← POST /api/execute - run toolkit tools
├── package.json                ← Depends on @robinson_ai_systems/robinsons-toolkit-mcp
├── openapi.json                ← OpenAPI schema for Custom GPT import
└── README.md                   ← This file
```

## The Problem We're Solving

**Custom GPTs can't use MCP servers directly.** They only support REST APIs via OpenAPI schemas.

So this repo:
1. Imports the published npm package `@robinson_ai_systems/robinsons-toolkit-mcp`
2. Exposes two HTTP endpoints (`/api/health` and `/api/execute`)
3. Provides an OpenAPI schema that Custom GPT can import
4. Runs as serverless functions on Vercel (auto-scales, no server management)

## Current Status

✅ **Deployed**: https://robinsons-toolkit-api.vercel.app
✅ **Health endpoint works**: `/api/health` returns 200 OK
❌ **Execute endpoint broken**: Returns "UnifiedToolkit not found in module exports"

## Why It's Broken

The published npm package `@robinson_ai_systems/robinsons-toolkit-mcp@1.15.0` **does not export the `UnifiedToolkit` class**.

The package was designed to run as an MCP server (stdio transport), not to be imported as a library.

## How to Fix It

**Option 1: Export UnifiedToolkit from main repo (RECOMMENDED)**

In the main MCP repo (`robinsonai-mcp-servers`):

1. Add export to `packages/robinsons-toolkit-mcp/src/index.ts`:
   ```typescript
   export { UnifiedToolkit };
   ```

2. Prevent auto-start when imported:
   ```typescript
   // Only start MCP server if NOT being imported as a library
   if (process.env.RTK_NO_AUTO_START !== '1') {
     const toolkit = new UnifiedToolkit();
     toolkit.run().catch(console.error);
   }
   ```

3. Build and publish:
   ```bash
   cd packages/robinsons-toolkit-mcp
   npm run build
   npm version patch  # 1.15.0 → 1.15.1
   npm publish
   ```

4. Update this repo:
   ```bash
   cd robinsons-toolkit-api
   npm install @robinson_ai_systems/robinsons-toolkit-mcp@latest
   git add package.json package-lock.json
   git commit -m "chore: Update to toolkit v1.15.1 with UnifiedToolkit export"
   git push  # Auto-deploys to Vercel
   ```

**Option 2: Create a separate library package**

Create `@robinson_ai_systems/robinsons-toolkit-lib` that exports just the `UnifiedToolkit` class without MCP server code.

## How to Use (Once Fixed)

### 1. Import to Custom GPT

1. Go to https://chat.openai.com
2. Click profile → **My GPTs** → **Create a GPT**
3. Click **Configure** tab
4. Scroll to **Actions** → **Create new action**
5. Click **Import from URL**
6. Enter: `https://robinsons-toolkit-api.vercel.app/openapi.json`
7. Click **Import**

### 2. Test in Custom GPT

Try these prompts:
- "List my GitHub repositories"
- "Create a new Vercel project called test-app"
- "Check my Neon databases"
- "Send an email via Resend to ops@robinsonaisystems.com"

The GPT will automatically call the appropriate tools!

### 3. Test via curl

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

## Environment Variables

All credentials are set in Vercel (Project → Settings → Environment Variables):

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

## Important Rules

### ✅ DO:
- Only modify files in this repo (`robinsons-toolkit-api`)
- Use the published npm package (don't copy code)
- Test locally before pushing
- Keep this repo minimal (just API wrapper code)

### ❌ DON'T:
- **DON'T modify the main MCP repo** when working on this API
- **DON'T publish npm packages** from this repo
- **DON'T add MCP server code** to this repo
- **DON'T copy code** between repos

## Deployment

Vercel auto-deploys on every push to `main` branch.

Check deployment status: https://vercel.com/chris-projects-de6cd1bf/robinsons-toolkit-api

## Troubleshooting

**"UnifiedToolkit not found in module exports"**
→ The npm package doesn't export `UnifiedToolkit`. Follow "How to Fix It" above.

**"Connection closed" or timeout errors**
→ Check Vercel function logs: https://vercel.com/chris-projects-de6cd1bf/robinsons-toolkit-api/logs

**"Unauthorized" errors**
→ Check environment variables are set in Vercel dashboard

**Custom GPT can't import schema**
→ Verify OpenAPI schema is valid: https://robinsons-toolkit-api.vercel.app/openapi.json
