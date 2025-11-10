module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Test if fetch exists
    const hasFetch = typeof fetch !== 'undefined';
    
    // Test environment variables
    const hasVercelToken = !!process.env.VERCEL_TOKEN;
    const hasApiKey = !!process.env.API_SECRET_KEY;
    
    return res.status(200).json({
      ok: true,
      test: 'simple-test',
      environment: {
        hasFetch,
        hasVercelToken,
        hasApiKey,
        nodeVersion: process.version,
        platform: process.platform
      },
      request: {
        method: req.method,
        headers: Object.keys(req.headers),
        body: req.body
      }
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
      stack: error.stack
    });
  }
};
