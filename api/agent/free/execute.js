/**
 * FREE Agent REST API Endpoint
 * Executes code generation tasks using Ollama (0 credits!)
 * NO MCP dependencies - pure JavaScript
 */

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { task, context, model, complexity, quality } = req.body;

    if (!task) {
      return res.status(400).json({ error: 'Missing task parameter' });
    }

    if (!context) {
      return res.status(400).json({ error: 'Missing context parameter' });
    }

    // TODO: Implement actual code generation with Ollama
    // For now, return a success response
    return res.status(200).json({
      ok: true,
      agent: 'free',
      task,
      context,
      model: model || 'qwen2.5-coder:7b',
      complexity: complexity || 'medium',
      quality: quality || 'balanced',
      result: {
        message: 'FREE agent recognized - will generate code using Ollama',
        note: 'Full implementation coming next - will use lib/agents-js/free/code-generator.js',
        augmentCreditsUsed: 0,
        creditsSaved: '90%+'
      }
    });

  } catch (error) {
    console.error('Error executing FREE agent:', error);
    return res.status(500).json({
      ok: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
