/**
 * GitHub Compare Commits REST API
 * GET /api/github/repos/[owner]/[repo]/compare/[base]...[head] - Compare commits
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, base, head } = query;
  
  if (!owner || !repo || !base || !head) {
    return res.status(400).json({ error: 'owner, repo, base, and head are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize({
        status: data.status,
        ahead_by: data.ahead_by,
        behind_by: data.behind_by,
        total_commits: data.total_commits,
        commits: data.commits?.slice(0, 10).map(c => ({ sha: c.sha, message: c.commit?.message })) || []
      }));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub compare API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

