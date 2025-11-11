/**
 * GitHub Autolinks REST API
 * GET  /api/github/repos/[owner]/[repo]/autolinks - List autolinks
 * POST /api/github/repos/[owner]/[repo]/autolinks - Create autolink
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
      const url = `https://api.github.com/repos/${owner}/${repo}/autolinks?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'POST') {
      const { url_template, key_prefix } = req.body;
      if (!url_template || !key_prefix) throw new Error('url_template and key_prefix are required');
      const url = `https://api.github.com/repos/${owner}/${repo}/autolinks`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ url_template, key_prefix })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub autolinks API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

