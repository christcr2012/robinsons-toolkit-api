// api/execute.js
// Robinson's Toolkit API - Execute endpoint
// Handles tool execution requests from Custom GPT

const { executeToolInternal } = require('../vendor/robinsons-toolkit-mcp');

module.exports = async (req, res) => {
  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        ok: false,
        error: 'Method Not Allowed',
        message: 'Only POST requests are accepted'
      });
    }

    // Check API key if configured
    const apiKey = req.headers['x-api-key'];
    const expectedKey = process.env.API_KEY;
    
    if (expectedKey && apiKey !== expectedKey) {
      return res.status(401).json({ 
        ok: false,
        error: 'Unauthorized',
        message: 'Invalid or missing API key'
      });
    }

    // Parse request body
    const body = typeof req.body === 'string' 
      ? JSON.parse(req.body || '{}') 
      : (req.body || {});
    
    const { tool, args } = body;

    // Validate required parameters
    if (!tool) {
      return res.status(400).json({ 
        ok: false,
        error: 'Bad Request',
        message: 'Missing required parameter: tool'
      });
    }

    // Execute the tool
    console.log(`[Execute] Tool: ${tool}, Args:`, JSON.stringify(args || {}).substring(0, 100));
    
    const result = await executeToolInternal(tool, args || {});
    
    console.log(`[Execute] Success: ${tool}`);
    
    return res.status(200).json({ 
      ok: true, 
      result 
    });

  } catch (err) {
    console.error('[Execute] Error:', err);
    
    // Return detailed error in development, sanitized in production
    const isDev = process.env.VERCEL_ENV !== 'production';
    
    return res.status(500).json({
      ok: false,
      error: err.message || 'Internal Server Error',
      ...(isDev && { 
        stack: err.stack,
        details: String(err)
      })
    });
  }
};
