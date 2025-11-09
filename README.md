# Robinson's Toolkit API - Custom GPT Wrapper

## ⚠️ CRITICAL: Repository Separation

**THIS IS A SEPARATE REPOSITORY FROM THE MAIN MCP SERVERS!**

- **Main MCP Repo**: `robinsonai-mcp-servers` - DO NOT MODIFY when working on this API wrapper
- **This Repo**: `robinsons-toolkit-api` - Vercel deployment for Custom GPT integration

## 🎯 Purpose

Expose Robinson's Toolkit MCP (1,237+ tools) as a REST API for Custom GPT Actions.

## 📋 Current Status

✅ Deployed to Vercel: https://robinsons-toolkit-api.vercel.app
✅ Health endpoint working: `/api/health`
✅ Execute endpoint working: `/api/execute`
⏳ Waiting for npm package v1.16.0 with UnifiedToolkit export

## 🔧 What Needs to Be Done

### 1. Wait for npm Package Update
The main MCP repo needs to publish v1.16.0 with the `UnifiedToolkit` export:
```typescript
export { UnifiedToolkit };
```

**DO NOT publish from this repo!** Only the main MCP repo should publish npm packages.

### 2. Update package.json (once v1.16.0 is published)
```bash
cd robinsons-toolkit-api
# Update to latest version
npm install @robinson_ai_systems/robinsons-toolkit-mcp@latest
git add package.json package-lock.json
git commit -m "chore: Update to toolkit v1.16.0"
git push
```

### 3. Test the API
```bash
# Test health
curl https://robinsons-toolkit-api.vercel.app/api/health

# Test tool execution
curl -X POST https://robinsons-toolkit-api.vercel.app/api/execute \
  -H "Content-Type: application/json" \
  -d '{"tool":"github_list_repos","args":{"owner":"christcr2012"}}'
```

### 4. Import to Custom GPT
1. Go to ChatGPT → My GPTs → Create/Edit GPT
2. Configure tab → Actions → Create new action
3. Import from URL: `https://robinsons-toolkit-api.vercel.app/openapi.json`
4. Test with: "List my GitHub repositories"

## 📁 Repository Structure

```
robinsons-toolkit-api/
├── api/
│   ├── health.js       # Health check endpoint
│   └── execute.js      # Tool execution endpoint
├── package.json        # Dependencies (toolkit npm package)
├── openapi.json        # OpenAPI schema for Custom GPT
├── vercel.json         # Vercel config (minimal)
└── README.md           # This file
```

## 🚫 What NOT to Do

❌ **DO NOT** modify the main MCP repo (`robinsonai-mcp-servers`) when working on this API
❌ **DO NOT** publish npm packages from this repo
❌ **DO NOT** add MCP server code to this repo
❌ **DO NOT** copy code between repos - use the published npm package

## ✅ What TO Do

✅ Only modify files in `robinsons-toolkit-api/` directory
✅ Use the published npm package `@robinson_ai_systems/robinsons-toolkit-mcp`
✅ Test locally before pushing
✅ Keep this repo minimal and focused on REST API wrapper

## 🔐 Environment Variables (Already Set in Vercel)

All environment variables from `augment-mcp-config.json` have been added to Vercel:
- GITHUB_TOKEN
- VERCEL_TOKEN
- NEON_API_KEY
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- OPENAI_API_KEY
- GOOGLE_USER_EMAIL
- STRIPE_SECRET_KEY
- SUPABASE_URL
- SUPABASE_KEY
- RESEND_API_KEY
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- CLOUDFLARE_API_TOKEN

## 🐛 Current Issue

**Error**: `UnifiedToolkit not found in module exports`

**Cause**: The published npm package v1.15.0 doesn't export `UnifiedToolkit`

**Solution**: Wait for v1.16.0 to be published from the main MCP repo with the export

## �� Next Steps

1. **In main MCP repo** (`robinsonai-mcp-servers`):
   - Build: `cd packages/robinsons-toolkit-mcp && npm run build`
   - Publish: `npm version patch && npm publish`

2. **In this repo** (`robinsons-toolkit-api`):
   - Update: `npm install @robinson_ai_systems/robinsons-toolkit-mcp@latest`
   - Commit and push to trigger Vercel deployment

3. **Test Custom GPT**:
   - Import OpenAPI schema
   - Try: "List my GitHub repositories"
