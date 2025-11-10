/**
 * Diagnostic endpoint for Custom GPT troubleshooting
 */

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const diagnostic = {
      timestamp: new Date().toISOString(),
      method: req.method,
      headers: {
        'content-type': req.headers['content-type'],
        'x-api-key': req.headers['x-api-key'] ? '***' + req.headers['x-api-key'].slice(-4) : 'missing',
        'authorization': req.headers['authorization'] ? '***' + req.headers['authorization'].slice(-4) : 'missing',
        'user-agent': req.headers['user-agent']
      },
      body: req.body,
      query: req.query,
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        hasVercelToken: !!process.env.VERCEL_TOKEN,
        hasGitHubToken: !!process.env.GITHUB_TOKEN,
        hasApiKey: !!process.env.API_SECRET_KEY
      },
      authentication: {
        apiKeyProvided: !!(req.headers['x-api-key'] || req.headers['authorization']),
        apiKeyValid: false
      }
    };

    // Check auth
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
    if (process.env.API_SECRET_KEY && apiKey === process.env.API_SECRET_KEY) {
      diagnostic.authentication.apiKeyValid = true;
    }

    // Test a simple API call
    if (diagnostic.authentication.apiKeyValid && process.env.VERCEL_TOKEN) {
      try {
        const response = await fetch('https://api.vercel.com/v9/projects?limit=1', {
          headers: {
            'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        diagnostic.vercelApiTest = {
          status: response.status,
          ok: response.ok
        };
      } catch (error) {
        diagnostic.vercelApiTest = {
          error: error.message
        };
      }
    }

    return res.status(200).json({
      ok: true,
      message: "Diagnostic endpoint - use this to troubleshoot Custom GPT integration",
      diagnostic
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
      stack: error.stack
    });
  }
};

