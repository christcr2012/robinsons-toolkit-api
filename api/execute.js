// api/execute.js
// Lightweight toolkit wrapper that calls APIs directly

const { Octokit } = require('@octokit/rest');

// Tool registry - maps tool names to handler functions
const toolHandlers = {
  // GitHub tools
  github_list_repos: async (args) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const { data } = await octokit.repos.listForUser({ username: args.owner });
    return data;
  },
  
  // Add more tools as needed...
};

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const key = req.headers['x-api-key'];
    if (process.env.API_KEY && key !== process.env.API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { tool, args } = body;
    
    if (!tool) {
      return res.status(400).json({ error: 'Missing `tool` parameter' });
    }

    // Find and execute the tool handler
    const handler = toolHandlers[tool];
    if (!handler) {
      return res.status(404).json({ 
        error: `Tool '${tool}' not found`,
        availableTools: Object.keys(toolHandlers)
      });
    }

    const result = await handler(args || {});
    return res.status(200).json({ ok: true, result });
    
  } catch (err) {
    console.error('Error executing tool:', err);
    return res.status(500).json({ 
      ok: false, 
      error: err.message || String(err) 
    });
  }
};
