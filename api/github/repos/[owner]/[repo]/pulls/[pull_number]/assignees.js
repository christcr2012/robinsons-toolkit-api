/**
 * GitHub PR Assignees REST API
 * GET /api/github/repos/[owner]/[repo]/pulls/[pull_number]/assignees - List assignees
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, pull_number } = query;
  
  if (!owner || !repo || !pull_number) {
    return res.status(400).json({ error: 'owner, repo, and pull_number are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/assignees`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(u => ({ id: u.id, login: u.login, avatar_url: u.avatar_url }))));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub PR assignees API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

