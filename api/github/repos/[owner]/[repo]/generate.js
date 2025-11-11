/**
 * GitHub Generate from Template REST API
 * POST /api/github/repos/[owner]/[repo]/generate - Generate from template
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    if (method === 'POST') {
      const { name, owner: newOwner, description, private: isPrivate } = req.body;
      if (!name || !newOwner) throw new Error('name and owner are required');
      const url = `https://api.github.com/repos/${owner}/${repo}/generate`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, owner: newOwner, description, private: isPrivate })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub generate API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

