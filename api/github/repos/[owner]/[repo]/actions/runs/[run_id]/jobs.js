/**
 * GitHub Workflow Run Jobs REST API
 * GET /api/github/repos/[owner]/[repo]/actions/runs/[run_id]/jobs - List jobs
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, run_id } = query;
  
  if (!owner || !repo || !run_id) {
    return res.status(400).json({ error: 'owner, repo, and run_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run_id}/jobs?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        total_count: data.total_count,
        jobs: data.jobs?.map(j => ({ id: j.id, name: j.name, status: j.status, conclusion: j.conclusion, started_at: j.started_at })) || []
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub workflow run jobs API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

