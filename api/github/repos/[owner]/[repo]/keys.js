/**
 * GitHub Deploy Keys REST API
 * GET  /api/github/repos/[owner]/[repo]/keys - List deploy keys
 * POST /api/github/repos/[owner]/[repo]/keys - Create deploy key
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

const minimalKey = (k) => ({
  id: k.id,
  key: k.key,
  title: k.title,
  read_only: k.read_only,
  created_at: k.created_at
});

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo]/keys - List deploy keys
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      
      const url = `https://api.github.com/repos/${owner}/${repo}/keys?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const keys = await response.json();
      
      return res.status(200).json(checkResponseSize(keys.map(minimalKey)));
    }
    
    // POST /api/github/repos/[owner]/[repo]/keys - Create deploy key
    if (method === 'POST') {
      const { title, key, read_only = true } = req.body;
      if (!title || !key) throw new Error('title and key are required');
      
      const url = `https://api.github.com/repos/${owner}/${repo}/keys`;
      const requestBody = { title, key, read_only };
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(201).json(checkResponseSize(minimalKey(data)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub deploy keys API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

