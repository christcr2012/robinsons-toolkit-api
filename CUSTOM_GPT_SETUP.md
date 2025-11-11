# Custom GPT Setup for Robinson's Toolkit API

## Overview

This REST API is designed to work seamlessly with Custom GPT in ChatGPT. All authentication is handled server-side - Custom GPT never sees or handles credentials.

## Quick Start

1. Go to https://chat.openai.com/gpts/editor
2. Create a new action
3. Import from URL: **`https://robinsons-toolkit-api.vercel.app/openapi.json`**
4. Leave authentication as "None" - credentials are configured server-side

## How It Works

- **Custom GPT** makes HTTP requests to the API
- **API** uses server-side environment variables (GitHub token, Vercel token, etc.)
- **Custom GPT** receives the results
- **Credentials are never exposed** to Custom GPT or the browser

## Available Endpoints

The OpenAPI schema includes 144+ endpoints across:
- **GitHub**: Repositories, issues, pull requests, commits, etc.
- **Vercel**: Projects, deployments, environment variables, etc.
- **And more**: Neon, Upstash, Google Workspace, OpenAI, Stripe, etc.

## Environment Variables

All credentials are configured in Vercel:

1. Go to https://vercel.com/dashboard
2. Select the `robinsons-toolkit-api` project
3. Go to Settings → Environment Variables
4. Add your credentials:
   - `GITHUB_TOKEN` - GitHub personal access token
   - `VERCEL_TOKEN` - Vercel API token
   - Other service tokens as needed

## Testing

Test the API directly:

```bash
curl https://robinsons-toolkit-api.vercel.app/api/github/repos
```

View the OpenAPI schema:

```bash
curl https://robinsons-toolkit-api.vercel.app/openapi.json | jq .
```

## Troubleshooting

- **"401 Unauthorized"**: Check that environment variables are set in Vercel
- **"404 Not Found"**: Endpoint may not exist - check the OpenAPI schema
- **Custom GPT import fails**: Verify the schema URL is correct and returns valid JSON

## Support

For issues or questions, see: https://github.com/christcr2012/robinsons-toolkit-api/issues
