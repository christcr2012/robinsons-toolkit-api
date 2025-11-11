/**
 * GitHub Check Run Annotations REST API
 * GET /api/github/repos/[owner]/[repo]/check-runs/[check_run_id]/annotations - List annotations
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
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/check-runs/${check_run_id}/annotations?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(a => ({ annotation_level: a.annotation_level, message: a.message, title: a.title, path: a.path }))));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub check run annotations API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

