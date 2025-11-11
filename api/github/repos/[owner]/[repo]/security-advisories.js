/**
 * GitHub Security Advisories REST API
 * GET  /api/github/repos/[owner]/[repo]/security-advisories - List advisories
 * POST /api/github/repos/[owner]/[repo]/security-advisories - Create advisory
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    if (method === 'GET') {
      const { per_page = 10, page = 1 } = query;
      const url = `https://api.github.com/repos/${owner}/${repo}/security-advisories?per_page=${per_page}&page=${page}`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(a => ({ ghsa_id: a.ghsa_id, cve_id: a.cve_id, summary: a.summary, state: a.state }))));
    }
    
    if (method === 'POST') {
      const { summary, description, severity, vulnerabilities } = req.body;
      if (!summary || !severity) throw new Error('summary and severity are required');
      const url = `https://api.github.com/repos/${owner}/${repo}/security-advisories`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ summary, description, severity, vulnerabilities })
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(201).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub security advisories API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

