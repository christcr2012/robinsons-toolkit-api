/**
 * GitHub Single Cache REST API
 * DELETE /api/github/repos/[owner]/[repo]/actions/caches/[cache_id] - Delete cache
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, cache_id } = query;
  
  if (!owner || !repo || !cache_id) {
    return res.status(400).json({ error: 'owner, repo, and cache_id are required' });
  }
  
  try {
    if (method === 'DELETE') {
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/caches/${cache_id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub cache API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

