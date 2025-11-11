# Custom GPT Setup for Robinson's Toolkit API

## Overview

This REST API is designed to work seamlessly with ChatGPT Custom GPTs. The API automatically discovers all available endpoints and exposes them via an OpenAPI schema that Custom GPT can consume.

## Quick Setup

### 1. Get the OpenAPI Schema URL

The API automatically generates an OpenAPI 3.0 schema at:

```
https://robinsons-toolkit-api.vercel.app/api/openapi.json
```

This schema is **dynamically generated** from all deployed endpoint files. As you add new endpoints, they automatically appear in the schema.

### 2. Create a Custom GPT

1. Go to https://chat.openai.com/gpts/editor
2. Click "Create a new GPT"
3. Name it: "Robinson's Toolkit"
4. Description: "Access 1,655+ tools across GitHub, Vercel, Neon, Upstash, Google Workspace, OpenAI, Stripe, and more"

### 3. Configure the API Connection

1. In the Custom GPT editor, scroll to "Actions"
2. Click "Create new action"
3. Select "Import from URL"
4. Paste: `https://robinsons-toolkit-api.vercel.app/api/openapi.json`
5. Click "Import"

### 4. Authentication

The API uses **server-side authentication**:

- **GitHub**: Set `GITHUB_TOKEN` environment variable in Vercel
- **Vercel**: Set `VERCEL_TOKEN` environment variable in Vercel
- **Other services**: Add their tokens as environment variables

Custom GPT does NOT need to handle authentication - it's all configured server-side.

### 5. Test the Connection

In the Custom GPT preview, try:
- "List my GitHub repositories"
- "Show my Vercel projects"
- "Create a new GitHub issue"

## How It Works

### Dynamic Endpoint Discovery

Every `.js` file in the `api/` directory becomes an endpoint:

```
api/github/repos.js                    → GET/POST /api/github/repos
api/github/repos/[owner]/[repo].js     → GET/PATCH/DELETE /api/github/repos/{owner}/{repo}
api/vercel/projects.js                 → GET/POST /api/vercel/projects
```

### Automatic Schema Generation

The `/api/openapi.json` endpoint:
1. Scans all files in the `api/` directory
2. Converts file paths to OpenAPI paths
3. Generates operation IDs and summaries
4. Returns a complete OpenAPI 3.0 schema

### Adding New Tools

When you add a new endpoint file:

```javascript
// api/neon/projects.js
module.exports = async (req, res) => {
  // Your implementation
};
```

It **automatically appears** in the OpenAPI schema within seconds. Custom GPT will discover it on the next refresh.

## Environment Variables (Vercel)

Set these in your Vercel project settings:

```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
VERCEL_TOKEN=vercel_xxxxxxxxxxxxx
NEON_API_KEY=neon_xxxxxxxxxxxxx
UPSTASH_TOKEN=upstash_xxxxxxxxxxxxx
GOOGLE_SERVICE_ACCOUNT={"type":"service_account",...}
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
STRIPE_API_KEY=sk_live_xxxxxxxxxxxxx
```

## Response Size Limits

Custom GPT has strict response size limits (~100KB). All endpoints:
- Use `checkResponseSize()` to validate responses
- Extract minimal fields to reduce payload size
- Return paginated results (default 10 items per page)

## Supported Integrations

### Complete (235 tools)
- ✅ GitHub (all 235 tools)

### In Progress
- 🔄 Vercel (4 tools deployed, 146 remaining)
- ⏳ Neon (167 tools)
- ⏳ Upstash (157 tools)
- ⏳ Google Workspace (193 tools)
- ⏳ OpenAI (73+ tools)
- ⏳ Stripe (150 tools)
- ⏳ Supabase (97 tools)
- ⏳ Playwright (49 tools)
- ⏳ Twilio (83 tools)
- ⏳ Resend (40 tools)
- ⏳ Cloudflare (160 tools)
- ⏳ And more...

## Example Custom GPT Prompts

Once configured, you can use prompts like:

```
"List all my GitHub repositories and show which ones have open issues"

"Create a new Vercel project called 'my-app' and deploy it"

"Get the last 5 deployments for my Vercel project and show their status"

"List all GitHub issues in my repo that are labeled 'bug'"

"Create a GitHub issue with the title 'Fix login bug' and assign it to @username"
```

## Troubleshooting

### Schema Not Updating

The schema is cached. To force a refresh:
1. In Custom GPT settings, click "Refresh schema"
2. Or wait 5 minutes for automatic refresh

### Authentication Errors

Verify environment variables are set in Vercel:
```bash
vercel env ls
```

### Response Too Large

If you get "Response too large" errors:
- Reduce `per_page` parameter
- The API automatically truncates responses to 100KB

## API Documentation

Full endpoint documentation: https://github.com/christcr2012/robinsons-toolkit-api

## Support

For issues or feature requests: https://github.com/christcr2012/robinsons-toolkit-api/issues

