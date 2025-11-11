const fs = require("fs");
const path = require("path");

function scanDirectory(dir, prefix = "") {
  const paths = {};
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.name.startsWith(".") || file.name === "openapi.js" || file.name === "_shared" || file.name === "handlers") continue;
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        const subPaths = scanDirectory(fullPath, prefix + "/" + file.name);
        Object.assign(paths, subPaths);
      } else if (file.name.endsWith(".js")) {
        const routePath = prefix + "/" + file.name.replace(/\.js$/, "").replace(/\[/g, "{").replace(/\]/g, "}");
        const operationId = routePath.replace(/[{}\/\-]/g, "_").substring(1);
        paths[routePath] = {
          get: { summary: `GET ${routePath}`, operationId: `get_${operationId}`, tags: [routePath.split("/")[1] || "api"], responses: { "200": { description: "Success" }, "400": { description: "Bad Request" }, "401": { description: "Unauthorized" }, "500": { description: "Server Error" } } },
          post: { summary: `POST ${routePath}`, operationId: `post_${operationId}`, tags: [routePath.split("/")[1] || "api"], requestBody: { content: { "application/json": { schema: { type: "object" } } } }, responses: { "201": { description: "Created" }, "400": { description: "Bad Request" }, "401": { description: "Unauthorized" }, "500": { description: "Server Error" } } },
          put: { summary: `PUT ${routePath}`, operationId: `put_${operationId}`, tags: [routePath.split("/")[1] || "api"], requestBody: { content: { "application/json": { schema: { type: "object" } } } }, responses: { "200": { description: "Success" }, "400": { description: "Bad Request" }, "401": { description: "Unauthorized" }, "500": { description: "Server Error" } } },
          patch: { summary: `PATCH ${routePath}`, operationId: `patch_${operationId}`, tags: [routePath.split("/")[1] || "api"], requestBody: { content: { "application/json": { schema: { type: "object" } } } }, responses: { "200": { description: "Success" }, "400": { description: "Bad Request" }, "401": { description: "Unauthorized" }, "500": { description: "Server Error" } } },
          delete: { summary: `DELETE ${routePath}`, operationId: `delete_${operationId}`, tags: [routePath.split("/")[1] || "api"], responses: { "204": { description: "Deleted" }, "400": { description: "Bad Request" }, "401": { description: "Unauthorized" }, "500": { description: "Server Error" } } }
        };
      }
    }
  } catch (e) {
    console.error(`Error scanning ${dir}:`, e.message);
  }
  return paths;
}

const apiDir = path.join(__dirname, "api");
const paths = scanDirectory(apiDir);
const schema = {
  openapi: "3.1.0",
  info: { title: "Robinson's Toolkit REST API", description: "Unified REST API for 1,655+ tools across GitHub, Vercel, Neon, Upstash, Google Workspace, OpenAI, Stripe, and more. All authentication is handled server-side.", version: "1.0.0", contact: { name: "Robinson AI Systems", url: "https://github.com/christcr2012/robinsons-toolkit-api" } },
  servers: [{ url: "https://robinsons-toolkit-api.vercel.app", description: "Production API" }],
  paths: paths || {},
  components: { schemas: {}, securitySchemes: { apiKey: { type: "apiKey", in: "header", name: "X-API-Key", description: "Optional API key for rate limiting. Leave empty - authentication is server-side." } } },
  security: []
};
const outputDir = path.join(__dirname, "public");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "openapi.json"), JSON.stringify(schema, null, 2));
console.log(`✓ Generated OpenAPI schema with ${Object.keys(paths).length} paths`);
