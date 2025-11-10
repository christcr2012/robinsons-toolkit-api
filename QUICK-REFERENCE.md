# 🚀 QUICK REFERENCE - Custom GPT Import

## Import URL
https://robinsons-toolkit-api.vercel.app/api/openapi

## Authentication
- Type: API Key
- Auth Type: Custom
- Header Name: `x-api-key`
- API Key: `robinson-toolkit-api-secure-key-2025`

## GPT Instructions (copy/paste)
```
When unsure of the exact tool name, call GET /api/tools/list with q="<keywords>".
Then call POST /api/execute with:
  { "tool": "<selected_name>", "args": { ... } }
On odd failures, retry once with ?fresh=1&prefer=npm.
Always include x-api-key.
```

## Quick Tests
```bash
# Schema
curl -s https://robinsons-toolkit-api.vercel.app/api/openapi | jq '.info'

# Loader status
curl -s -H 'x-api-key: robinson-toolkit-api-secure-key-2025' \
  'https://robinsons-toolkit-api.vercel.app/api/debug-loader?fresh=1&prefer=npm' | jq

# Discover tools
curl -s -H 'x-api-key: robinson-toolkit-api-secure-key-2025' \
  'https://robinsons-toolkit-api.vercel.app/api/tools/list?q=github&limit=20' | jq

# Execute tool
curl -s -X POST -H 'content-type: application/json' \
  -H 'x-api-key: robinson-toolkit-api-secure-key-2025' \
  -d '{"tool":"github_list_repos","args":{"owner":"christcr2012","per_page":3}}' \
  'https://robinsons-toolkit-api.vercel.app/api/execute?fresh=1&prefer=npm' | jq
```

## Stats
- **Total Tools**: 1,713
- **Categories**: 17
- **API Version**: 1.0.0
- **Status**: ✅ Production Ready

## Categories
GitHub (241) • Vercel (150) • Neon (167) • Upstash (157) • Google (262) • OpenAI (73) • Stripe (150) • Supabase (97) • Playwright (49) • Twilio (83) • Resend (40) • Context7 (12) • Cloudflare (160) • Postgres (25) • Neo4j (20) • Qdrant (15) • n8n (12)
