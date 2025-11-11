/**
 * Dynamic OpenAPI Schema Generator
 * GET /api/openapi - Returns auto-discovered OpenAPI schema for Custom GPT
 */

const fs = require("fs");
const path = require("path");

function scanDirectory(dir, prefix = "") {
  const paths = {};

  try {
    console.log(`Scanning directory: ${dir}`);
    const files = fs.readdirSync(dir, { withFileTypes: true });
    console.log(`Found ${files.length} items`);

    for (const file of files) {
      console.log(`Processing: ${file.name}`);
      if (file.name.startsWith(".") || file.name === "openapi.js" || file.name === "_shared" || file.name === "handlers") {
        continue;
      }

      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        const subPaths = scanDirectory(fullPath, prefix + "/" + file.name);
        Object.assign(paths, subPaths);
      } else if (file.name.endsWith(".js")) {
        const routePath = prefix + "/" + file.name.replace(/\.js$/, "").replace(/\[/g, "{").replace(/\]/g, "}");
        const operationId = routePath.replace(/[{}\/\-]/g, "_").substring(1);

        paths[routePath] = {
          get: {
            summary: `GET ${routePath}`,
            operationId: `get_${operationId}`,
            tags: [routePath.split("/")[1] || "api"],
            responses: {
              "200": { description: "Success" },
              "400": { description: "Bad Request" },
              "401": { description: "Unauthorized" },
              "500": { description: "Server Error" }
            }
          }
        };
      }
    }
  } catch (e) {
    console.error(`Error scanning ${dir}:`, e.message);
  }

  return paths;
}

module.exports = async (req, res) => {
  try {
    const apiDir = __dirname;
    console.log(`API Dir: ${apiDir}`);
    const paths = scanDirectory(apiDir);
    console.log(`Found ${Object.keys(paths).length} paths`);

    const schema = {
      openapi: "3.1.0",
      info: {
        title: "Robinson's Toolkit REST API",
        description: "Unified REST API for 1,655+ tools across GitHub, Vercel, Neon, Upstash, Google Workspace, OpenAI, Stripe, and more. All authentication is handled server-side.",
        version: "1.0.0",
        contact: {
          name: "Robinson AI Systems",
          url: "https://github.com/christcr2012/robinsons-toolkit-api"
        }
      },
      servers: [
        {
          url: "https://robinsons-toolkit-api.vercel.app",
          description: "Production API"
        }
      ],
      paths: paths || {},
      components: {
        schemas: {},
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            in: "header",
            name: "X-API-Key",
            description: "Optional API key for rate limiting. Leave empty - authentication is server-side."
          }
        }
      },
      security: []
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(schema);
  } catch (error) {
    console.error("OpenAPI schema generation error:", error);
    return res.status(500).json({ error: error.message, debug: error.stack });
  }
};
