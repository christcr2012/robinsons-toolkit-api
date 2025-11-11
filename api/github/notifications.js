/**
 * GitHub Notifications REST API
 * GET /api/github/notifications - List notifications
 */

const { getAuthHeaders, checkResponseSize } = require('../_shared/github-utils');

module.exports = async (req, res) => {
  const headers = getAuthHeaders();
  const { method, query } = req;
  
  try {
    if (method === 'GET') {
      const { all = false, participating = false, per_page = 10, page = 1 } = query;
      let url = `https://api.github.com/notifications?per_page=${per_page}&page=${page}`;
      if (all) url += '&all=true';
      if (participating) url += '&participating=true';
      
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(checkResponseSize(data.map(n => ({ 
        id: n.id, 
        subject: n.subject, 
        reason: n.reason, 
        unread: n.unread, 
        updated_at: n.updated_at,
        repository: { name: n.repository?.name, full_name: n.repository?.full_name }
      }))));
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('GitHub notifications API error:', error);
    return res.status(500).json({ error: error.message });
  }
};

