# Robinson's Toolkit API

REST API wrapper for Robinson's Toolkit MCP - enables Custom GPT integration with 1,237+ tools across 16+ categories.

## Features

- **1,237+ Tools** across 16+ categories (GitHub, Vercel, Neon, Upstash, Google, OpenAI, Stripe, Supabase, Playwright, Twilio, Resend, Context7, Cloudflare, PostgreSQL, Neo4j, Qdrant, N8N)
- **Serverless Architecture** - Runs on Vercel Edge Functions
- **Custom GPT Integration** - Import OpenAPI schema directly into ChatGPT
- **Zero Build Step** - Direct TypeScript execution in serverless environment

## API Endpoints

- `GET /api` - API information
- `GET /api/health` - Health check
- `GET /api/openapi.json` - OpenAPI schema for Custom GPT
- `POST /api/execute` - Execute any tool from Robinson's Toolkit

## Custom GPT Setup

1. Go to ChatGPT → My GPTs → Create/Edit GPT
2. Actions → Import from URL
3. Use: `https://robinsons-toolkit-api.vercel.app/api/openapi.json`

## Deployment

Automatically deploys to Vercel on push to `main` branch.

**Production URL:** https://robinsons-toolkit-api.vercel.app

## License

MIT
