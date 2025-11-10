// api/openapi.js
module.exports = (_, res) => res.status(200).json(require('../openapi.json'));
