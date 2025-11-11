/**
 * GitHub Single Security Advisory REST API
 * GET   /api/github/repos/[owner]/[repo]/security-advisories/[ghsa_id] - Get advisory
 * PATCH /api/github/repos/[owner]/[repo]/security-advisories/[ghsa_id] - Update advisory
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, ghsa_id } = query;
  
  if (!owner || !repo || !ghsa_id) {
    return res.status(400).json({ error: 'owner, repo, and ghsa_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/security-advisories/${ghsa_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'PATCH') {
      const { summary, description, severity, state } = req.body;
      const url = `https://api.github.com/repos/${owner}/${repo}/security-advisories/${ghsa_id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ summary, description, severity, state })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub security advisory API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

