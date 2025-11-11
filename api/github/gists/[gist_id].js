/**
 * GitHub Single Gist REST API
 * GET    /api/github/gists/[gist_id] - Get gist
 * PATCH  /api/github/gists/[gist_id] - Update gist
 * DELETE /api/github/gists/[gist_id] - Delete gist
 */

const { getAuthHeaders, checkResponseSize } = require('../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { gist_id } = query;
  
  if (!gist_id) {
    return res.status(400).json({ error: 'gist_id is required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/gists/${gist_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'PATCH') {
      const { files, description } = req.body;
      const url = `https://api.github.com/gists/${gist_id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ files, description })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'DELETE') {
      const url = `https://api.github.com/gists/${gist_id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub gist API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

