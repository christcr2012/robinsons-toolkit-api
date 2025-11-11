/**
 * GitHub Gists REST API
 * GET  /api/github/gists - List gists
 * POST /api/github/gists - Create gist
 */

const { getAuthHeaders, checkResponseSize } = require('../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders(req);
  const { method, query } = req;
  
  try {
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/gists?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(g => ({ id: g.id, url: g.url, description: g.description, public: g.public, created_at: g.created_at }))));
    }
    
    if (method === 'POST') {
      const { files, description, public: isPublic } = req.body;
      if (!files) throw new Error('files is required');
      const url = `https://api.github.com/gists`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ files, description, public: isPublic })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub gists API error:', error);
    return res.status(500).json({ error: error.message });
  }
};


