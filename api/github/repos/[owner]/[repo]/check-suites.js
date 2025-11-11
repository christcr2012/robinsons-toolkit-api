/**
 * GitHub Check Suites REST API
 * GET /api/github/repos/[owner]/[repo]/check-suites - List check suites
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = {
    ...getAuthHeaders(),
    'Accept': 'application/vnd.github.antiope-preview+json'
  };
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    if (method === 'GET') {
      const { check_name, status = 'completed', per_page = 10, page = 1 } = query;
      let url = `https://api.github.com/repos/${owner}/${repo}/check-suites?status=${status}&per_page=${per_page}&page=${page}`;
      if (check_name) url += `&check_name=${check_name}`;
      
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        total_count: data.total_count,
        check_suites: data.check_suites?.map(c => ({ id: c.id, status: c.status, conclusion: c.conclusion, created_at: c.created_at })) || []
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub check suites API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

