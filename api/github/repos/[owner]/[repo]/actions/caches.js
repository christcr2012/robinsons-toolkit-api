/**
 * GitHub Actions Caches REST API
 * GET /api/github/repos/[owner]/[repo]/actions/caches - List caches
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
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/caches?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        total_count: data.total_count,
        actions_caches: data.actions_caches?.map(c => ({ id: c.id, ref: c.ref, key: c.key, size_in_bytes: c.size_in_bytes, created_at: c.created_at })) || []
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub actions caches API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

