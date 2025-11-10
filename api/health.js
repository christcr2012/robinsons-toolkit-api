const { getToolkitInstance } = require('./_toolkit');

module.exports = async (req, res) => {
  try {
    const tk = await getToolkitInstance();
    
    // Check if it's the real toolkit or vendored
    const isVendored = tk.registry && tk.registry.categories && 
                       tk.registry.categories.get && 
                       tk.registry.categories.get('vendored');
    
    const categories = tk.registry && tk.registry.toolsByCategory ? 
                       tk.registry.toolsByCategory.size : 0;
    
    let totalTools = 0;
    if (tk.registry && tk.registry.toolsByCategory) {
      for (const [cat, tools] of tk.registry.toolsByCategory) {
        totalTools += tools.size;
      }
    }
    
    res.status(200).json({
      ok: true,
      toolkit: isVendored ? 'vendored' : 'npm-package',
      categories,
      totalTools,
      nodeVersion: process.version,
      platform: process.platform,
      cwd: process.cwd()
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message,
      stack: err.stack
    });
  }
};
