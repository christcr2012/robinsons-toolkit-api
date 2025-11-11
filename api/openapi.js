/**
 * Dynamic OpenAPI Schema Generator
 * GET /api/openapi.json - Returns auto-discovered OpenAPI schema
 */

const fs = require('fs');
const path = require('path');

function scanDirectory(dir, prefix = '') {
  const paths = {};
  
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      const routePath = prefix + '/' + file.name.replace(/\.js$/, '').replace(/\[/g, '{').replace(/\]/g, '}');
      
      if (file.isDirectory()) {
        Object.assign(paths, scanDirectory(fullPath, routePath));
      } else if (file.name.endsWith('.js') && file.name !== 'openapi.js') {
        try {
          const handler = require(fullPath);
          paths[routePath] = {
            get: { summary: `GET ${routePath}`, operationId: `get_${routePath.replace(/[{}\/]/g, '_')}` },
            post: { summary: `POST ${routePath}`, operationId: `post_${routePath.replace(/[{}\/]/g, '_')}` },
            put: { summary: `PUT ${routePath}`, operationId: `put_${routePath.replace(/[{}\/]/g, '_')}` },
            patch: { summary: `PATCH ${routePath}`, operationId: `patch_${routePath.replace(/[{}\/]/g, '_')}` },
            delete: { summary: `DELETE ${routePath}`, operationId: `delete_${routePath.replace(/[{}\/]/g, '_')}` }
          };
        } catch (e) {
          // Skip files that can't be required
        }
      }
    }
  } catch (e) {
    console.error(`Error scanning ${dir}:`, e.message);
  }
  
  return paths;
}

module.exports = async (req, res) => {
  try {
    const apiDir = path.join(__dirname);
    const paths = scanDirectory(apiDir);
    
    const schema = {
      openapi: '3.0.0',
      info: {
        title: "Robinson's Toolkit REST API",
        description: 'Unified REST API for 1,655+ tools across GitHub, Vercel, Neon, Upstash, Google Workspace, OpenAI, Stripe, and more',
        version: '1.0.0',
        contact: {
          name: 'Robinson AI Systems',
          url: 'https://github.com/christcr2012/robinsons-toolkit-api'
        }
      },
      servers: [
        {
          url: 'https://robinsons-toolkit-api.vercel.app',
          description: 'Production API'
        }
      ],
      paths: paths,
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            description: 'GitHub and Vercel tokens are configured server-side via environment variables'
          }
        }
      },
      security: [
        { bearerAuth: [] }
      ]
    };
    
    return res.status(200).json(schema);
  } catch (error) {
    console.error('OpenAPI schema generation error:', error);
    return res.status(500).json({ error: error.message });
  }
};

