/**
 * GitHub Releases REST API
 * GET  /api/github/repos/[owner]/[repo]/releases - List releases
 * POST /api/github/repos/[owner]/[repo]/releases - Create release
 */

const { getAuthHeaders, checkResponseSize, minimalRelease } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo]/releases - List releases
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      
      const url = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const releases = await response.json();
      
      return res.status(200).json(checkResponseSize(releases.map(minimalRelease)));
    }
    
    // POST /api/github/repos/[owner]/[repo]/releases - Create release
    if (method === 'POST') {
      const { tag_name, name, body, draft, prerelease, target_commitish } = req.body;
      if (!tag_name) throw new Error('tag_name is required');
      
      const url = `https://api.github.com/repos/${owner}/${repo}/releases`;
      const requestBody = { tag_name, name, body, draft, prerelease, target_commitish };
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(201).json(checkResponseSize(minimalRelease(data)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub releases API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

