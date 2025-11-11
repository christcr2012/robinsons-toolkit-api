/**
 * GitHub Commit Check Runs REST API
 * GET /api/github/repos/[owner]/[repo]/commits/[sha]/check-runs - Get check runs
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = {
    ...getAuthHeaders(),
    'Accept': 'application/vnd.github.antiope-preview+json'
  };
  const { method, query } = req;
  const { owner, repo, sha } = query;
  
  if (!owner || !repo || !sha) {
    return res.status(400).json({ error: 'owner, repo, and sha are required' });
  }
  
  try {
    if (method === 'GET') {
      const { status = 'completed', per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/commits/${sha}/check-runs?status=${status}&per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        total_count: data.total_count,
        check_runs: data.check_runs?.map(c => ({ id: c.id, name: c.name, status: c.status, conclusion: c.conclusion })) || []
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub check runs API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

