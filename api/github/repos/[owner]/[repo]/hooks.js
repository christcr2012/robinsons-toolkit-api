/**
 * GitHub Webhooks REST API
 * GET  /api/github/repos/[owner]/[repo]/hooks - List webhooks
 * POST /api/github/repos/[owner]/[repo]/hooks - Create webhook
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

const minimalHook = (h) => ({
  id: h.id,
  name: h.name,
  active: h.active,
  events: h.events,
  config: h.config,
  created_at: h.created_at,
  updated_at: h.updated_at
});

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo]/hooks - List webhooks
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      
      const url = `https://api.github.com/repos/${owner}/${repo}/hooks?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const hooks = await response.json();
      
      return res.status(200).json(checkResponseSize(hooks.map(minimalHook)));
    }
    
    // POST /api/github/repos/[owner]/[repo]/hooks - Create webhook
    if (method === 'POST') {
      const { name = 'web', config, events = ['push'], active = true } = req.body;
      if (!config || !config.url) throw new Error('config.url is required');
      
      const url = `https://api.github.com/repos/${owner}/${repo}/hooks`;
      const requestBody = { name, config, events, active };
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(201).json(checkResponseSize(minimalHook(data)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub webhooks API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

