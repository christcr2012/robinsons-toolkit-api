/**
 * GitHub Single Issue REST API
 * GET   /api/github/repos/[owner]/[repo]/issues/[issue_number] - Get issue
 * PATCH /api/github/repos/[owner]/[repo]/issues/[issue_number] - Update issue
 */

const { getAuthHeaders, checkResponseSize, minimalIssue } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, issue_number } = query;
  
  if (!owner || !repo || !issue_number) {
    return res.status(400).json({ error: 'owner, repo, and issue_number are required' });
  }
  
  try {
    // GET /api/github/repos/[owner]/[repo]/issues/[issue_number] - Get issue
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(200).json(checkResponseSize(minimalIssue(data)));
    }
    
    // PATCH /api/github/repos/[owner]/[repo]/issues/[issue_number] - Update issue
    if (method === 'PATCH') {
      const { title, body, state, assignees, labels } = req.body;
      
      const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`;
      const requestBody = { title, body, state, assignees, labels };
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(200).json(checkResponseSize(minimalIssue(data)));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub issue API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

