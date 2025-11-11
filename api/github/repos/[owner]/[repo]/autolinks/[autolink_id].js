/**
 * GitHub Single Autolink REST API
 * GET    /api/github/repos/[owner]/[repo]/autolinks/[autolink_id] - Get autolink
 * DELETE /api/github/repos/[owner]/[repo]/autolinks/[autolink_id] - Delete autolink
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, autolink_id } = query;
  
  if (!owner || !repo || !autolink_id) {
    return res.status(400).json({ error: 'owner, repo, and autolink_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/autolinks/${autolink_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'DELETE') {
      const url = `https://api.github.com/repos/${owner}/${repo}/autolinks/${autolink_id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub autolink API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

