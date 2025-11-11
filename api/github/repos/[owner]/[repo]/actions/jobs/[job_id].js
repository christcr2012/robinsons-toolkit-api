/**
 * GitHub Job REST API
 * GET /api/github/repos/[owner]/[repo]/actions/jobs/[job_id] - Get job
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, job_id } = query;
  
  if (!owner || !repo || !job_id) {
    return res.status(400).json({ error: 'owner, repo, and job_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/jobs/${job_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub job API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

