/**
 * GitHub Workflow Run Cancel REST API
 * POST /api/github/repos/[owner]/[repo]/actions/runs/[run_id]/cancel - Cancel run
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
    if (method === 'POST') {
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run_id}/cancel`;
      const response = await fetch(url, {
        method: 'POST',
        headers
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return res.status(202).json({ status: 'cancelled' });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub workflow run cancel API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

