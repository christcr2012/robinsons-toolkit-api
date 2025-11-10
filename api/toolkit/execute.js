const { executeToolkitTool } = require('../../lib/toolkit-executor');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { tool, ...args } = body;

    if (!tool) {
      return res.status(400).json({ error: 'Missing "tool" parameter' });
    }

    const credentials = {
      githubToken: process.env.GITHUB_TOKEN,
    };

    const result = await executeToolkitTool(tool, args, credentials);

    res.status(200).json({ ok: true, tool, result });
  } catch (error) {
    console.error('[toolkit/execute] Error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
};
