const { executeGitHubTool } = require('../lib/github');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tool, ...args } = req.body;

    if (!tool) {
      return res.status(400).json({ error: 'Missing tool parameter' });
    }

    const credentials = {
      githubToken: process.env.GITHUB_TOKEN,
    };

    let result;

    if (tool.startsWith('github_')) {
      result = await executeGitHubTool(tool, args, credentials.githubToken);
    } else {
      return res.status(400).json({ error: `Unknown tool: ${tool}` });
    }

    return res.status(200).json({
      ok: true,
      tool,
      result
    });

  } catch (error) {
    console.error('Error executing tool:', error);
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};
