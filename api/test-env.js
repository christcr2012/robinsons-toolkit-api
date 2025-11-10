// api/test-env.js - Test endpoint to verify environment variables
module.exports = async (req, res) => {
  const envVars = {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN ? 'Set (length: ' + process.env.GITHUB_TOKEN.length + ')' : 'Not set',
    VERCEL_TOKEN: process.env.VERCEL_TOKEN ? 'Set (length: ' + process.env.VERCEL_TOKEN.length + ')' : 'Not set',
    NEON_API_KEY: process.env.NEON_API_KEY ? 'Set (length: ' + process.env.NEON_API_KEY.length + ')' : 'Not set',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Set (length: ' + process.env.OPENAI_API_KEY.length + ')' : 'Not set',
  };
  
  res.status(200).json({
    ok: true,
    message: 'Environment variables check',
    env: envVars
  });
};
