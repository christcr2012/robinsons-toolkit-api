/**
 * GitHub Single Ruleset REST API
 * GET    /api/github/repos/[owner]/[repo]/rulesets/[ruleset_id] - Get ruleset
 * PUT    /api/github/repos/[owner]/[repo]/rulesets/[ruleset_id] - Update ruleset
 * DELETE /api/github/repos/[owner]/[repo]/rulesets/[ruleset_id] - Delete ruleset
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, ruleset_id } = query;
  
  if (!owner || !repo || !ruleset_id) {
    return res.status(400).json({ error: 'owner, repo, and ruleset_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/rulesets/${ruleset_id}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'PUT') {
      const { name, enforcement, rules } = req.body;
      const url = `https://api.github.com/repos/${owner}/${repo}/rulesets/${ruleset_id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ name, enforcement, rules })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data));
    }
    
    if (method === 'DELETE') {
      const url = `https://api.github.com/repos/${owner}/${repo}/rulesets/${ruleset_id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return res.status(204).send();
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub ruleset API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

