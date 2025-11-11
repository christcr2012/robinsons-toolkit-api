/**
 * GitHub Commits REST API
 * GET /api/github/repos/[owner]/[repo]/commits - List commits
 */

const { getAuthHeaders, checkResponseSize, minimalCommit } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo]/commits - List commits
    if (method === 'GET') {
      const { sha, path, author, since, until, per_page = 10, page = 1 } = query;
      
      let url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${per_page}&page=${page}`;
      if (sha) url += `&sha=${sha}`;
      if (path) url += `&path=${path}`;
      if (author) url += `&author=${author}`;
      if (since) url += `&since=${since}`;
      if (until) url += `&until=${until}`;
      
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const commits = await response.json();
      
      return res.status(200).json(checkResponseSize(commits.map(minimalCommit)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub commits API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

