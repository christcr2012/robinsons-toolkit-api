/**
 * GitHub Workflow Run REST API
 * GET    /api/github/repos/[owner]/[repo]/actions/runs/[run_id] - Get run
 * DELETE /api/github/repos/[owner]/[repo]/actions/runs/[run_id] - Delete run
 */

const { getAuthHeaders, checkResponseSize, minimalWorkflowRun } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, run_id } = query;
  
  if (!owner || !repo || !run_id) {
    return res.status(400).json({ error: 'owner, repo, and run_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(minimalWorkflowRun(data)));
    }
    
    if (method === 'DELETE') {
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run_id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub workflow run API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

