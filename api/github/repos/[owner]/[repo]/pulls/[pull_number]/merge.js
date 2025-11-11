/**
 * GitHub PR Merge REST API
 * GET  /api/github/repos/[owner]/[repo]/pulls/[pull_number]/merge - Check if mergeable
 * PUT  /api/github/repos/[owner]/[repo]/pulls/[pull_number]/merge - Merge PR
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
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/merge`;
      const response = await fetch(url, { headers });
      if (response.status === 204) {
        return res.status(200).json({ merged: true });
      }
      if (response.status === 404) {
        return res.status(200).json({ merged: false });
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    if (method === 'PUT') {
      const { commit_title, commit_message, merge_method = 'merge' } = req.body;
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/merge`;
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ commit_title, commit_message, merge_method })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub PR merge API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

