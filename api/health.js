// api/health.js
module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    ts: new Date().toISOString(),
    commit: process.env.VERCEL_GIT_COMMIT_SHA || 'dev'
  });
};
