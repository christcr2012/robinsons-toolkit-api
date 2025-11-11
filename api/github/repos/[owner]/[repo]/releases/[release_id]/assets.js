/**
 * GitHub Release Assets REST API
 * GET /api/github/repos/[owner]/[repo]/releases/[release_id]/assets - List assets
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, release_id } = query;
  
  if (!owner || !repo || !release_id) {
    return res.status(400).json({ error: 'owner, repo, and release_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/releases/${release_id}/assets?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(a => ({ id: a.id, name: a.name, size: a.size, download_count: a.download_count, created_at: a.created_at }))));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub release assets API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

