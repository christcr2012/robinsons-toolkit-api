/**
 * GitHub Single Release REST API
 * GET    /api/github/repos/[owner]/[repo]/releases/[release_id] - Get release
 * PATCH  /api/github/repos/[owner]/[repo]/releases/[release_id] - Update release
 * DELETE /api/github/repos/[owner]/[repo]/releases/[release_id] - Delete release
 */

const { getAuthHeaders, checkResponseSize, minimalRelease } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, release_id } = query;
  
  if (!owner || !repo || !release_id) {
    return res.status(400).json({ error: 'owner, repo, and release_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/releases/${release_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(minimalRelease(data)));
    }
    
    if (method === 'PATCH') {
      const { tag_name, name, body, draft, prerelease } = req.body;
      const url = `https://api.github.com/repos/${owner}/${repo}/releases/${release_id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ tag_name, name, body, draft, prerelease })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(minimalRelease(data)));
    }
    
    if (method === 'DELETE') {
      const url = `https://api.github.com/repos/${owner}/${repo}/releases/${release_id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub release API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

