/**
 * GitHub Git Tags REST API
 * GET  /api/github/repos/[owner]/[repo]/git/tags - Get tag
 * POST /api/github/repos/[owner]/[repo]/git/tags - Create tag
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
      const { tag_sha } = query;
      if (!tag_sha) throw new Error('tag_sha is required');
      const url = `https://api.github.com/repos/${owner}/${repo}/git/tags/${tag_sha}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'POST') {
      const { tag, sha, message, tagger } = req.body;
      if (!tag || !sha || !message) throw new Error('tag, sha, and message are required');
      const url = `https://api.github.com/repos/${owner}/${repo}/git/tags`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ tag, sha, message, tagger })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub git tags API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

