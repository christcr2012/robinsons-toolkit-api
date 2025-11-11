/**
 * GitHub Git Blobs REST API
 * GET  /api/github/repos/[owner]/[repo]/git/blobs - Get blob
 * POST /api/github/repos/[owner]/[repo]/git/blobs - Create blob
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
    if (method === 'GET') {
      const { blob_sha } = query;
      if (!blob_sha) throw new Error('blob_sha is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/git/blobs/${blob_sha}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({ sha: data.sha, size: data.size, url: data.url }));
    }
    
    if (method === 'POST') {
      const { content, encoding = 'utf-8' } = req.body;
      if (!content) throw new Error('content is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/git/blobs`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content, encoding })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub git blobs API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

