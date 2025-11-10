// Test endpoint to verify toolkit loading with detailed logging
const path = require('path');

module.exports = async (req, res) => {
  const logs = [];
  
  try {
    logs.push('Starting toolkit load test...');
    
    // Try dynamic import directly
    logs.push('Attempting dynamic import of @robinson_ai_systems/robinsons-toolkit-mcp...');
    const mod = await import('@robinson_ai_systems/robinsons-toolkit-mcp');
    logs.push('✓ Dynamic import successful');
    logs.push(`Module keys: ${Object.keys(mod).join(', ')}`);
    
    // Try to unwrap
    const UnifiedToolkit = mod.UnifiedToolkit || (mod.default && mod.default.UnifiedToolkit) || mod;
    logs.push(`UnifiedToolkit type: ${typeof UnifiedToolkit}`);
    
    // Try to instantiate
    const tk = typeof UnifiedToolkit === 'function' ? new UnifiedToolkit() : UnifiedToolkit;
    logs.push('✓ Toolkit instantiated');
    
    // Check registry
    const hasRegistry = tk.registry && tk.registry.toolsByCategory;
    logs.push(`Has registry: ${hasRegistry}`);
    
    if (hasRegistry) {
      const categories = tk.registry.toolsByCategory.size;
      let totalTools = 0;
      for (const [cat, tools] of tk.registry.toolsByCategory) {
        totalTools += tools.size;
      }
      logs.push(`Categories: ${categories}, Total tools: ${totalTools}`);
      
      res.status(200).json({
        ok: true,
        success: true,
        categories,
        totalTools,
        logs
      });
    } else {
      logs.push('⚠ No registry found');
      res.status(200).json({
        ok: true,
        success: false,
        error: 'No registry',
        logs
      });
    }
  } catch (err) {
    logs.push(`✗ Error: ${err.message}`);
    res.status(500).json({
      ok: false,
      error: err.message,
      stack: err.stack,
      logs
    });
  }
};
