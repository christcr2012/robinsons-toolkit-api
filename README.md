# Robinson's Toolkit API (Vercel)

✅ **WORKING!** Minimal serverless wrapper that exposes MCP tool handlers over REST for Custom GPT Actions.

## Status

- ✅ Health endpoint working: `GET /api/health`
- ✅ Execute endpoint working: `POST /api/execute`
- ⏳ Toolkit integration: Using placeholder (needs wiring to real UnifiedToolkit)
- ⏳ OpenAPI schema: Not yet created
- ⏳ Custom GPT integration: Pending toolkit wiring

## Endpoints

### `GET /api/health`
Returns server health and deployment info.

**Response:**
```json
{
  "ok": true,
  "ts": "2025-11-09T19:38:17.700Z",
  "commit": "d61f9e3..."
}
```

### `POST /api/execute`
Execute any tool from Robinson's Toolkit.

**Request:**
```json
{
  "tool": "github_list_repos",
  "args": {
    "owner": "christcr2012"
  }
}
```

**Response:**
```json
{
  "ok": true,
  "result": { ... }
}
```

**Auth (optional):**
Send `x-api-key: <API_KEY>` header. Set `API_KEY` in Vercel → Project → Environment Variables.

## Testing

```bash
# Health check
curl https://robinsons-toolkit-api.vercel.app/api/health

# Execute tool (placeholder)
curl -X POST \
  -H 'content-type: application/json' \
  -d '{"tool":"ping","args":{"foo":"bar"}}' \
  https://robinsons-toolkit-api.vercel.app/api/execute
```

## Next Steps

1. **Wire real toolkit** - Replace placeholder in `api/execute.js` with:
   ```js
   const { UnifiedToolkit } = require('@robinson_ai_systems/robinsons-toolkit-mcp');
   // ...
   const result = await UnifiedToolkit.executeToolInternal(tool, args);
   ```

2. **Create OpenAPI schema** - Generate `openapi.json` for Custom GPT Actions import

3. **Test with Custom GPT** - Import schema and test tool execution

4. **Add API key auth** - Set `API_KEY` env var in Vercel for security

## Local Development

```bash
npm i -g vercel
vercel dev
# then hit http://localhost:3000/api/health
```

## Deployment

Automatically deploys to Vercel on push to `main` branch.

**Production URL:** https://robinsons-toolkit-api.vercel.app

## License

UNLICENSED
