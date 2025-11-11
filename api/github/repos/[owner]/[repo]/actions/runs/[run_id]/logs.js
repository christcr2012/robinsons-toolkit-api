/**
 * GitHub Workflow Run Logs REST API
 * GET /api/github/repos/[owner]/[repo]/actions/runs/[run_id]/logs - Download logs
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
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run_id}/logs`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.text();
      return res.status(200).setHeader('Content-Type', 'text/plain').send(data.substring(0, 100000));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub workflow run logs API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

