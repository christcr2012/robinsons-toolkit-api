# REST API Conversion Plan

## ✅ PHASE 1: EXTRACTION (COMPLETE)

**Status:** ✅ DONE
**Files extracted:** 159 files (1.43 MB)
**Commit:** 8055a1a

### What Was Extracted

1. **Robinson's Toolkit** (16 integrations, 722 KB)
   - GitHub (241 methods)
   - Google Workspace
   - Vercel
   - Neon
   - Upstash/Redis
   - Cloudflare
   - Stripe
   - Supabase
   - Twilio
   - Resend
   - Playwright
   - Context7
   - N8N
   - Neo4j
   - Postgres
   - Qdrant

2. **Thinking Tools** (95 files, 395 KB)
   - 24 cognitive frameworks
   - Context Engine tools
   - Documentation tools
   - Evidence tools
   - Web search tools

3. **FREE Agent** (39 files, 308 KB)
   - Code generation
   - Code analysis
   - Refactoring
   - Quality gates pipeline
   - Ollama client

4. **PAID Agent** (paid-lib, pricing, llm-selector)
   - Same as FREE but with OpenAI/Claude support

5. **Credit Optimizer** (8 files, 33 KB)
   - Workflow planner
   - Template engine
   - Policy engine

## 🔄 PHASE 2: CONVERSION TO JAVASCRIPT (IN PROGRESS)

### Goal
Convert ALL TypeScript files to pure JavaScript with NO dependencies on:
- `@modelcontextprotocol/sdk`
- TypeScript types
- MCP protocol wrappers

### Conversion Pattern

**FROM (MCP TypeScript):**
```typescript
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

private async listRepos(args: any): Promise<CallToolResult> {
  const response = await this.client.get(path, params);
  return {
    content: [{ type: 'text', text: JSON.stringify(response, null, 2) }]
  };
}
```

**TO (REST JavaScript):**
```javascript
async function listRepos(token, args) {
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json(); // Direct return, no MCP wrapper
}
```

### Conversion Steps

1. **Strip MCP imports** - Remove all `@modelcontextprotocol/sdk` imports
2. **Remove TypeScript types** - Convert to plain JavaScript
3. **Replace MCP response wrappers** - Return plain JSON
4. **Replace client.get/post** - Use native `fetch()`
5. **Create router functions** - Map tool names to methods

### Files to Convert (Priority Order)

#### Priority 1: Toolkit Integrations (16 files)
- [ ] lib/toolkit/github.ts → github.js (241 methods)
- [ ] lib/toolkit/google.ts → google.js
- [ ] lib/toolkit/vercel.ts → vercel.js
- [ ] lib/toolkit/neon.ts → neon.js
- [ ] lib/toolkit/upstash.ts → upstash.js
- [ ] lib/toolkit/cloudflare.ts → cloudflare.js
- [ ] lib/toolkit/stripe.ts → stripe.js
- [ ] lib/toolkit/supabase.ts → supabase.js
- [ ] lib/toolkit/twilio.ts → twilio.js
- [ ] lib/toolkit/resend.ts → resend.js
- [ ] lib/toolkit/playwright.ts → playwright.js
- [ ] lib/toolkit/context7.ts → context7.js
- [ ] lib/toolkit/n8n.ts → n8n.js
- [ ] lib/toolkit/neo4j.ts → neo4j.js
- [ ] lib/toolkit/postgres.ts → postgres.js
- [ ] lib/toolkit/qdrant.ts → qdrant.js

#### Priority 2: Thinking Tools (simplify to core logic)
- [ ] Extract core logic from 24 cognitive frameworks
- [ ] Extract Context Engine query/index functions
- [ ] Extract documentation tools
- [ ] Extract evidence tools

#### Priority 3: Agents (simplify to core execution)
- [ ] Extract Ollama client
- [ ] Extract code generation logic
- [ ] Extract quality gates pipeline
- [ ] Extract OpenAI/Claude client

#### Priority 4: Optimizer (simplify to core workflows)
- [ ] Extract workflow planner
- [ ] Extract template engine

## 🚀 PHASE 3: CREATE REST ENDPOINTS

### Endpoint Structure

```
/api/toolkit/execute          - Execute any of 1,713 toolkit tools
/api/thinking/execute          - Execute thinking tools
/api/agent/free/execute        - Execute FREE agent tasks
/api/agent/paid/execute        - Execute PAID agent tasks
/api/optimizer/workflow        - Execute workflows
```

### Implementation Plan

1. **Create api/toolkit/execute.js**
   - Import all 16 integration routers
   - Route based on tool name prefix
   - Pass credentials from env vars

2. **Create api/thinking/execute.js**
   - Import thinking tool functions
   - Route to appropriate framework/tool
   - Return results as JSON

3. **Create api/agent/execute.js**
   - Import agent execution logic
   - Support both FREE (Ollama) and PAID (OpenAI/Claude)
   - Return generated code/analysis

4. **Create api/optimizer/execute.js**
   - Import workflow planner
   - Execute workflows/recipes/blueprints
   - Return execution results

## 📋 PHASE 4: TESTING & DEPLOYMENT

1. **Local testing** - Test each endpoint with curl
2. **Deploy to Vercel** - `vercel --prod`
3. **Create OpenAPI schema** - Document all endpoints
4. **Test with Custom GPT** - Verify end-to-end

## 🎯 SUCCESS CRITERIA

- [ ] ALL 1,713 toolkit tools working via REST
- [ ] ALL 64 thinking tools working via REST
- [ ] FREE and PAID agents working via REST
- [ ] Credit Optimizer workflows working via REST
- [ ] ZERO MCP dependencies in package.json
- [ ] ZERO TypeScript compilation needed
- [ ] Custom GPT can call all endpoints successfully

## 📊 CURRENT STATUS

**Phase 1:** ✅ COMPLETE (159 files extracted)
**Phase 2:** 🔄 IN PROGRESS (0/159 files converted)
**Phase 3:** ⏳ NOT STARTED
**Phase 4:** ⏳ NOT STARTED

## 🔧 NEXT IMMEDIATE STEPS

1. Convert lib/toolkit/github.ts to github.js (241 methods)
2. Test GitHub integration via /api/toolkit/execute
3. Repeat for remaining 15 toolkit integrations
4. Move to thinking tools, agents, optimizer

