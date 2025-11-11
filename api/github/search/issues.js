/**
 * GitHub Search Issues REST API
 * GET /api/github/search/issues - Search issues
 */

const { getAuthHeaders, checkResponseSize, minimalIssue } = require('../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { q } = query;
  
  if (!q) {
    return res.status(400).json({ error: 'q (search query) is required' });
  }
  
  try {
    if (method === 'GET') {
      const { sort = 'created', order = 'desc', per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&sort=${sort}&order=${order}&per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        total_count: data.total_count,
        items: data.items?.slice(0, per_page).map(minimalIssue) || []
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub search issues API error:', error);
    return res.status(500).json({ error: error.message });
  }
};



