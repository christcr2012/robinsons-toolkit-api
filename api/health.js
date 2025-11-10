module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    ok: true,
    message: 'API is working',
    timestamp: new Date().toISOString(),
    env_check: {
      has_vercel_token: !!process.env.VERCEL_TOKEN,
      has_github_token: !!process.env.GITHUB_TOKEN,
      has_api_key: !!process.env.API_SECRET_KEY
    }
  });
};
