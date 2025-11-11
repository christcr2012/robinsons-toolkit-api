/**
 * GitHub Actions Workflow Runs REST API
 * GET /api/github/repos/[owner]/[repo]/actions/runs - List workflow runs
 */

const { getAuthHeaders, checkResponseSize, minimalWorkflowRun } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo]/actions/runs - List workflow runs
    if (method === 'GET') {
      const { workflow_id, status, per_page = 10, page = 1 } = query;
      
      let url = `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=${per_page}&page=${page}`;
      if (workflow_id) url += `&workflow_id=${workflow_id}`;
      if (status) url += `&status=${status}`;
      
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

