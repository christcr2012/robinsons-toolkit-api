const { getToolkitInstance } = require('./_toolkit');

module.exports = async (req, res) => {
  try {
    // Return the EXACT request body we received
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    
    res.status(200).json({
      ok: true,
      received: {
        method: req.method,
        headers: req.headers,
        body: body,
        bodyType: typeof req.body,
        bodyKeys: Object.keys(body),
        bodyJSON: JSON.stringify(body, null, 2)
      }
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
};
