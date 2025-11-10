// Loads npm ESM toolkit if available; else falls back to vendored CJS runtime.
// Zero-build; safe on Vercel Node serverless.
// NOW WITH PROPER CREDENTIAL INITIALIZATION

let cached = null;

async function loadFromNpm() {
  try {
    const mod = await import('@robinson_ai_systems/robinsons-toolkit-mcp'); // ESM
    const ToolkitClass = mod.UnifiedToolkit || mod.default?.UnifiedToolkit || mod.default;
    
    if (typeof ToolkitClass === 'function') {
      // Initialize with environment variables
      return new ToolkitClass({
        githubToken: process.env.GITHUB_TOKEN,
        vercelToken: process.env.VERCEL_TOKEN,
        neonApiKey: process.env.NEON_API_KEY,
        openaiApiKey: process.env.OPENAI_API_KEY,
        upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL,
        upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN,
        stripeSecretKey: process.env.STRIPE_SECRET_KEY,
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
        resendApiKey: process.env.RESEND_API_KEY,
        twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
        twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
        cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
        googleUserEmail: process.env.GOOGLE_USER_EMAIL,
      });
    }
    return ToolkitClass;
  } catch (e) {
    console.log('[toolkit] npm import failed:', e?.message);
    return null;
  }
}

function loadFromVendor() {
  try {
    const mod = require('../vendor/robinsons-toolkit-mcp'); // CJS
    const ToolkitClass = mod.UnifiedToolkit || mod.default?.UnifiedToolkit || mod.default;
    
    if (typeof ToolkitClass === 'function') {
      // Initialize with environment variables
      return new ToolkitClass({
        githubToken: process.env.GITHUB_TOKEN,
        vercelToken: process.env.VERCEL_TOKEN,
        neonApiKey: process.env.NEON_API_KEY,
        openaiApiKey: process.env.OPENAI_API_KEY,
        upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL,
        upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN,
        stripeSecretKey: process.env.STRIPE_SECRET_KEY,
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
        resendApiKey: process.env.RESEND_API_KEY,
        twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
        twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
        cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
        googleUserEmail: process.env.GOOGLE_USER_EMAIL,
      });
    }
    return ToolkitClass;
  } catch (e) {
    console.log('[toolkit] vendor require failed:', e?.message);
    return null;
  }
}

module.exports.getToolkitInstance = async function getToolkitInstance(opts = {}) {
  if (!opts.fresh && cached) return cached;

  const prefer = opts.prefer || process.env.TOOLKIT_SOURCE || 'npm'; // 'npm' | 'vendor'
  let inst = null;

  if (prefer === 'npm') inst = await loadFromNpm();
  if (!inst) inst = loadFromVendor();
  if (!inst && prefer === 'vendor') inst = await loadFromNpm();

  if (!inst) throw new Error('Cannot load toolkit from npm or vendor');

  if (!opts.fresh) cached = inst;
  return inst;
};

module.exports._resetToolkitCache = () => { cached = null; };
module.exports._loaderStatus = () => ({ cached: !!cached });
