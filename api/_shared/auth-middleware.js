/**
 * Authentication Middleware
 * Handles both server-side env vars and Custom GPT session tokens
 */

const { getSessionCredentials } = require('./auth-configure');

/**
 * Get credentials from either:
 * 1. Custom GPT session token (X-Session-Token header)
 * 2. Server-side environment variables (fallback)
 */
function getCredentials(req, service) {
  const sessionToken = req.headers['x-session-token'];
  
  if (sessionToken) {
    const session = getSessionCredentials(sessionToken);
    if (!session) {
      throw new Error('Invalid or expired session token');
    }
    
    const credentialMap = {
      github: session.github_token,
      vercel: session.vercel_token,
      neon: session.neon_api_key,
      upstash: session.upstash_token,
      openai: session.openai_api_key,
      stripe: session.stripe_api_key,
      google: session.google_service_account
    };
    
    const credential = credentialMap[service];
    if (!credential) {
      throw new Error(`No ${service} credentials configured in session`);
    }
    
    return credential;
  }
  
  // Fallback to environment variables
  const envMap = {
    github: process.env.GITHUB_TOKEN,
    vercel: process.env.VERCEL_TOKEN,
    neon: process.env.NEON_API_KEY,
    upstash: process.env.UPSTASH_TOKEN,
    openai: process.env.OPENAI_API_KEY,
    stripe: process.env.STRIPE_API_KEY,
    google: process.env.GOOGLE_SERVICE_ACCOUNT
  };
  
  const credential = envMap[service];
  if (!credential) {
    throw new Error(`${service.toUpperCase()}_TOKEN not configured. Set environment variable or use X-Session-Token header.`);
  }
  
  return credential;
}

/**
 * Get GitHub auth headers
 */
function getGitHubHeaders(req) {
  const token = getCredentials(req, 'github');
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json'
  };
}

/**
 * Get Vercel auth headers
 */
function getVercelHeaders(req) {
  const token = getCredentials(req, 'vercel');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

/**
 * Get Neon auth headers
 */
function getNeonHeaders(req) {
  const token = getCredentials(req, 'neon');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

/**
 * Get Upstash auth headers
 */
function getUpstashHeaders(req) {
  const token = getCredentials(req, 'upstash');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

/**
 * Get OpenAI auth headers
 */
function getOpenAIHeaders(req) {
  const token = getCredentials(req, 'openai');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

/**
 * Get Stripe auth headers
 */
function getStripeHeaders(req) {
  const token = getCredentials(req, 'stripe');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

/**
 * Get Google auth headers
 */
function getGoogleHeaders(req) {
  const serviceAccount = getCredentials(req, 'google');
  return {
    'Content-Type': 'application/json',
    'X-Google-Service-Account': serviceAccount
  };
}

module.exports = {
  getCredentials,
  getGitHubHeaders,
  getVercelHeaders,
  getNeonHeaders,
  getUpstashHeaders,
  getOpenAIHeaders,
  getStripeHeaders,
  getGoogleHeaders
};

