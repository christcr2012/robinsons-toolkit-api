/**
 * Serve OpenAPI schema for Custom GPT and AI agents
 */

const schema = {
  "openapi": "3.1.0",
  "info": {
    "title": "Robinson's Toolkit API",
    "description": "Unified REST API for Robinson's 5 MCP Servers. All credentials stored server-side for security.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://robinsons-toolkit-api.vercel.app"
    }
  ],
  "components": {
    "securitySchemes": {
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-Key"
      }
    },
    "schemas": {}
  },
  "security": [{"ApiKeyAuth": []}],
  "paths": {
    "/api/execute": {
      "post": {
        "operationId": "executeToolkitTool",
        "summary": "Execute toolkit tool (909 methods across 16 integrations)",
        "description": "Execute GitHub, Vercel, Neon, Google, Upstash, Stripe, Supabase, Cloudflare, Resend, Playwright, Postgres, Twilio, Neo4j, Qdrant, Context7, or N8N tools",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["tool", "args"],
                "properties": {
                  "tool": {"type": "string", "description": "Tool name (e.g., github_list_repos)", "example": "github_list_repos"},
                  "args": {"type": "object", "description": "Tool arguments", "example": {"type": "owner"}, "additionalProperties": true}
                }
              }
            }
          }
        },
        "responses": {"200": {"description": "Success"}}
      }
    },
    "/api/thinking/execute": {
      "post": {
        "operationId": "executeThinkingTool",
        "summary": "Execute thinking tool (64 tools)",
        "description": "Execute cognitive frameworks (SWOT, Devil's Advocate, etc.), context engine, or documentation tools",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["tool"],
                "properties": {
                  "tool": {"type": "string", "example": "framework_swot"},
                  "args": {"type": "object", "example": {"problem": "Analyze this idea", "stepNumber": 1, "content": "Analysis", "nextStepNeeded": false}}
                }
              }
            }
          }
        },
        "responses": {"200": {"description": "Success"}}
      }
    },
    "/api/agent/free/execute": {
      "post": {
        "operationId": "executeFreeAgent",
        "summary": "Execute FREE agent (Ollama, 0 credits)",
        "description": "Generate code using local Ollama models (completely free)",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["task", "context"],
                "properties": {
                  "task": {"type": "string", "example": "Create a React button component"},
                  "context": {"type": "string", "example": "React, TypeScript, Tailwind"},
                  "quality": {"type": "string", "enum": ["fast", "balanced", "best"], "default": "fast"},
                  "complexity": {"type": "string", "enum": ["simple", "medium", "complex"], "default": "medium"}
                }
              }
            }
          }
        },
        "responses": {"200": {"description": "Success"}}
      }
    },
    "/api/agent/paid/execute": {
      "post": {
        "operationId": "executePaidAgent",
        "summary": "Execute PAID agent (OpenAI/Claude)",
        "description": "Generate code using premium models for highest quality",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["task", "context"],
                "properties": {
                  "task": {"type": "string", "example": "Create a user authentication system"},
                  "context": {"type": "string", "example": "Node.js, Express, JWT"},
                  "provider": {"type": "string", "enum": ["openai", "claude"], "default": "openai"},
                  "maxCost": {"type": "number", "default": 1.0},
                  "minQuality": {"type": "string", "enum": ["basic", "standard", "premium"], "default": "standard"}
                }
              }
            }
          }
        },
        "responses": {"200": {"description": "Success"}}
      }
    },
    "/api/optimizer/workflow": {
      "post": {
        "operationId": "executeOptimizerAction",
        "summary": "Execute Credit Optimizer action",
        "description": "Plan workflows, scaffold templates, estimate costs, or optimize execution",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["action"],
                "properties": {
                  "action": {"type": "string", "enum": ["plan_workflow", "scaffold_template", "estimate_cost", "optimize_workflow"], "example": "estimate_cost"},
                  "taskType": {"type": "string", "example": "code_generation"},
                  "complexity": {"type": "string", "enum": ["simple", "medium", "complex"]},
                  "linesOfCode": {"type": "number"},
                  "workflowName": {"type": "string"},
                  "steps": {"type": "array", "items": {"type": "object"}},
                  "templateName": {"type": "string"},
                  "workflow": {"type": "object"}
                }
              }
            }
          }
        },
        "responses": {"200": {"description": "Success"}}
      }
    }
  }
};

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json(schema);
};
