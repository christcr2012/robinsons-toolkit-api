/**
 * GitHub Single Check Run REST API
 * GET   /api/github/repos/[owner]/[repo]/check-runs/[check_run_id] - Get check run
 * PATCH /api/github/repos/[owner]/[repo]/check-runs/[check_run_id] - Update check run
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = {
    ...getAuthHeaders(),
    'Accept': 'application/vnd.github.antiope-preview+json'
  };
  const { method, query } = req;
  const { owner, repo, check_run_id } = query;
  
  if (!owner || !repo || !check_run_id) {
    return res.status(400).json({ error: 'owner, repo, and check_run_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/check-runs/${check_run_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'PATCH') {
      const { status, conclusion, output } = req.body;
      const url = `https://api.github.com/repos/${owner}/${repo}/check-runs/${check_run_id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status, conclusion, output })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub check run API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

