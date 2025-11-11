/**
 * GitHub Workflow Runs REST API
 * GET /api/github/repos/[owner]/[repo]/actions/workflows/[workflow_id]/runs - List runs
 */

const { getAuthHeaders, checkResponseSize, minimalWorkflowRun } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, workflow_id } = query;
  
  if (!owner || !repo || !workflow_id) {
    return res.status(400).json({ error: 'owner, repo, and workflow_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const { status = 'completed', per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/runs?status=${status}&per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        total_count: data.total_count,
        workflow_runs: data.workflow_runs?.map(minimalWorkflowRun) || []
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub workflow runs API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

