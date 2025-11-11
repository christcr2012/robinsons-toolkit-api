/**
 * GitHub Workflow Run Artifacts REST API
 * GET /api/github/repos/[owner]/[repo]/actions/runs/[run_id]/artifacts - List artifacts
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
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run_id}/artifacts?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        total_count: data.total_count,
        artifacts: data.artifacts?.map(a => ({ id: a.id, name: a.name, size_in_bytes: a.size_in_bytes, created_at: a.created_at })) || []
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub workflow run artifacts API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

