const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const cwd = process.cwd();
    
    // Check if node_modules exists
    const nodeModulesPath = path.join(cwd, 'node_modules');
    const hasNodeModules = fs.existsSync(nodeModulesPath);
    
    // Check if @robinson_ai_systems exists
    const scopePath = path.join(nodeModulesPath, '@robinson_ai_systems');
    const hasScope = fs.existsSync(scopePath);
    
    // Check if the toolkit package exists
    const toolkitPath = path.join(scopePath, 'robinsons-toolkit-mcp');
    const hasToolkit = fs.existsSync(toolkitPath);
    
    // List what's in node_modules/@robinson_ai_systems if it exists
    let scopeContents = [];
    if (hasScope) {
      scopeContents = fs.readdirSync(scopePath);
    }
    
    // Try to require the package and see what error we get
    let requireError = null;
    try {
      require('@robinson_ai_systems/robinsons-toolkit-mcp');
    } catch (e) {
      requireError = {
        message: e.message,
        code: e.code,
        stack: e.stack
      };
    }
    
    res.status(200).json({
      ok: true,
      cwd,
      hasNodeModules,
      hasScope,
      hasToolkit,
      scopeContents,
      requireError
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message,
      stack: err.stack
    });
  }
};
