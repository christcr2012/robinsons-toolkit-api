/**
 * GitHub Artifact Download REST API
 * GET /api/github/repos/[owner]/[repo]/actions/artifacts/[artifact_id]/download - Download artifact
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, artifact_id } = query;
  
  if (!owner || !repo || !artifact_id) {
    return res.status(400).json({ error: 'owner, repo, and artifact_id are required' });
  }
  
  try {
    if (method === 'GET') {
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/artifacts/${artifact_id}/download`;
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.arrayBuffer();
      return res.status(200).setHeader('Content-Type', 'application/zip').send(Buffer.from(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub artifact download API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

