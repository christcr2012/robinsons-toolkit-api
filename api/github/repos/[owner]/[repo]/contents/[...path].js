/**
 * GitHub Repository Contents REST API
 * GET    /api/github/repos/[owner]/[repo]/contents/[...path] - Get file/directory contents
 * PUT    /api/github/repos/[owner]/[repo]/contents/[...path] - Create or update file
 * DELETE /api/github/repos/[owner]/[repo]/contents/[...path] - Delete file
 */

const { getAuthHeaders, checkResponseSize } = require('../../../../../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  const { owner, repo, path } = query;
  
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  // path can be empty for root directory
  const filePath = Array.isArray(path) ? path.join('/') : (path || '');
  
  try {
    // GET /api/github/repos/[owner]/[repo]/contents/[...path] - Get contents
    if (method === 'GET') {
      const { ref } = query;
      
      let url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      if (ref) url += `?ref=${ref}`;
      
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(200).json(checkResponseSize(data));
    }
    
    // PUT /api/github/repos/[owner]/[repo]/contents/[...path] - Create or update file
    if (method === 'PUT') {
      const { message, content, sha, branch } = req.body;
      if (!message || !content) throw new Error('message and content are required');
      
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      const requestBody = { message, content, sha, branch };
      
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(200).json(checkResponseSize(data));
    }
    
    // DELETE /api/github/repos/[owner]/[repo]/contents/[...path] - Delete file
    if (method === 'DELETE') {
      const { message, sha, branch } = req.body;
      if (!message || !sha) throw new Error('message and sha are required');
      
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      const requestBody = { message, sha, branch };
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      
      return res.status(200).json(checkResponseSize(data));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('GitHub contents API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

