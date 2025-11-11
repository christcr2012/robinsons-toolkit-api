/**
 * Authentication Configuration Endpoint
 * POST /api/auth/configure - Configure API credentials for Custom GPT
 * 
 * This endpoint allows Custom GPT to securely provide credentials that are
 * stored in the session and used for all subsequent API calls.
 */

const crypto = require('crypto');

// In-memory session store (in production, use Redis or database)
const sessions = new Map();

function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = async (req, res) => {
  const { method, query, body } = req;
  
  try {
    if (method === 'POST') {
      // Configure credentials for this session
      const { github_token, vercel_token, neon_api_key, upstash_token, openai_api_key, stripe_api_key, google_service_account } = body;
      
      if (!github_token && !vercel_token && !neon_api_key && !upstash_token && !openai_api_key && !stripe_api_key && !google_service_account) {
        return res.status(400).json({ error: 'At least one credential is required' });
      }
      
      // Generate session token
      const sessionToken = generateSessionToken();
      
      // Store credentials in session (expires in 24 hours)
      const sessionData = {
        github_token,
        vercel_token,
        neon_api_key,
        upstash_token,
        openai_api_key,
        stripe_api_key,
        google_service_account,
        created_at: Date.now(),
        expires_at: Date.now() + (24 * 60 * 60 * 1000)
      };
      
      sessions.set(sessionToken, sessionData);
      
      // Clean up expired sessions
      for (const [token, data] of sessions.entries()) {
        if (data.expires_at < Date.now()) {
          sessions.delete(token);
        }
      }
      
      return res.status(201).json({
        session_token: sessionToken,
        expires_in: 86400,
        message: 'Credentials configured. Use this session_token in the X-Session-Token header for all API calls.'
      });
    }
    
    if (method === 'GET') {
      // Get session info (for debugging)
      const { session_token } = query;
      
      if (!session_token) {
        return res.status(400).json({ error: 'session_token is required' });
      }
      
      const session = sessions.get(session_token);
      
      if (!session) {
        return res.status(404).json({ error: 'Session not found or expired' });
      }
      
      if (session.expires_at < Date.now()) {
        sessions.delete(session_token);
        return res.status(401).json({ error: 'Session expired' });
      }
      
      return res.status(200).json({
        session_token,
        configured_services: {
          github: !!session.github_token,
          vercel: !!session.vercel_token,
          neon: !!session.neon_api_key,
          upstash: !!session.upstash_token,
          openai: !!session.openai_api_key,
          stripe: !!session.stripe_api_key,
          google: !!session.google_service_account
        },
        expires_at: new Date(session.expires_at).toISOString()
      });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Auth configuration error:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Export for use in other endpoints
module.exports.getSessionCredentials = (sessionToken) => {
  const session = sessions.get(sessionToken);
  
  if (!session || session.expires_at < Date.now()) {
    return null;
  }
  
  return session;
};

module.exports.sessions = sessions;

