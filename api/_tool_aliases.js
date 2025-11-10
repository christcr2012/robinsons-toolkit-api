// Tool name aliases for AI-friendly naming
// Maps intuitive names to actual toolkit tool names
// Includes metadata tags for intent-based search

const TOOL_ALIASES = {
  // ===== GITHUB =====
  // Repository operations
  'list_repos': 'github_list_repos',
  'list_repos_for_user': 'github_list_user_repos',
  'list_repos_for_org': 'github_list_repos',
  'list_repos_for_me': 'github_list_repos',
  'get_repo': 'github_get_repo',
  'get_repo_readme': 'github_get_repo_readme',
  'get_readme': 'github_get_repo_readme',
  'create_repo': 'github_create_repo',
  
  // Issues
  'list_issues': 'github_list_issues',
  'create_issue': 'github_create_issue',
  'get_issue': 'github_get_issue',
  'update_issue': 'github_update_issue',
  
  // Pull Requests
  'list_prs': 'github_list_pull_requests',
  'create_pr': 'github_create_pull_request',
  'get_pr': 'github_get_pull_request',
  'merge_pr': 'github_merge_pull_request',
  
  // ===== VERCEL =====
  'deploy': 'vercel_create_deployment',
  'list_deployments': 'vercel_list_deployments',
  'get_deployment': 'vercel_get_deployment',
  'list_projects': 'vercel_list_projects',
  'get_project': 'vercel_get_project',
  'create_project': 'vercel_create_project',
  'list_domains': 'vercel_list_domains',
  'add_domain': 'vercel_add_domain',
  'get_env_vars': 'vercel_list_env_vars',
  'set_env_var': 'vercel_create_env_var',
  
  // ===== NEON =====
  'list_databases': 'neon_list_projects',
  'create_database': 'neon_create_project',
  'get_database': 'neon_get_project',
  'delete_database': 'neon_delete_project',
  'list_branches': 'neon_list_branches',
  'create_branch': 'neon_create_branch',
  'run_query': 'neon_execute_query',
  
  // ===== UPSTASH (Redis) =====
  'redis_get': 'upstash_redis_get',
  'redis_set': 'upstash_redis_set',
  'redis_del': 'upstash_redis_del',
  'redis_keys': 'upstash_redis_keys',
  'list_redis_databases': 'upstash_list_databases',
  'create_redis_database': 'upstash_create_database',
  
  // ===== GOOGLE WORKSPACE =====
  // Gmail
  'send_email': 'gmail_send_message',
  'list_emails': 'gmail_list_messages',
  'get_email': 'gmail_get_message',
  'search_emails': 'gmail_search_messages',
  
  // Drive
  'list_files': 'drive_list_files',
  'upload_file': 'drive_upload_file',
  'download_file': 'drive_download_file',
  'delete_file': 'drive_delete_file',
  'share_file': 'drive_share_file',
  
  // Calendar
  'list_events': 'calendar_list_events',
  'create_event': 'calendar_create_event',
  'get_event': 'calendar_get_event',
  'update_event': 'calendar_update_event',
  
  // Sheets
  'read_sheet': 'sheets_get_values',
  'write_sheet': 'sheets_update_values',
  'create_sheet': 'sheets_create_spreadsheet',
  
  // ===== OPENAI =====
  'chat': 'openai_chat_completion',
  'complete': 'openai_completion',
  'embed': 'openai_create_embedding',
  'list_models': 'openai_list_models',
  'generate_image': 'openai_create_image',
  
  // ===== STRIPE =====
  'create_payment': 'stripe_payment_intent_create',
  'list_payments': 'stripe_payment_intent_list',
  'get_payment': 'stripe_payment_intent_retrieve',
  'create_customer': 'stripe_customer_create',
  'list_customers': 'stripe_customer_list',
  'get_customer': 'stripe_customer_retrieve',
  'create_subscription': 'stripe_subscription_create',
  'list_subscriptions': 'stripe_subscription_list',
  
  // ===== SUPABASE =====
  'query_table': 'supabase_select',
  'insert_row': 'supabase_insert',
  'update_row': 'supabase_update',
  'delete_row': 'supabase_delete',
  'list_tables': 'supabase_list_tables',
  
  // ===== TWILIO =====
  'send_sms': 'twilio_send_message',
  'list_messages': 'twilio_list_messages',
  'make_call': 'twilio_create_call',
  
  // ===== RESEND =====
  'send_email_resend': 'resend_send_email',
  'list_emails_resend': 'resend_list_emails',
  
  // ===== CLOUDFLARE =====
  'list_zones': 'cloudflare_list_zones',
  'get_zone': 'cloudflare_get_zone',
  'list_dns_records': 'cloudflare_list_dns_records',
  'create_dns_record': 'cloudflare_create_dns_record',
  'purge_cache': 'cloudflare_purge_cache',
  
  // ===== PLAYWRIGHT =====
  'open_browser': 'playwright_launch_browser',
  'goto_page': 'playwright_goto',
  'click_element': 'playwright_click',
  'type_text': 'playwright_type',
  'screenshot': 'playwright_screenshot',
};

// Metadata tags for intent-based search
const TOOL_METADATA = {
  // GitHub
  'list_repos': { tags: ['github', 'repository', 'list', 'repos'], intent: 'list repositories', description: 'List GitHub repositories' },
  'list_repos_for_user': { tags: ['github', 'user', 'repository', 'list'], intent: 'list user repositories', description: 'List repositories for a specific user' },
  'get_repo_readme': { tags: ['github', 'readme', 'documentation', 'get'], intent: 'get repository readme', description: 'Get README file from a repository' },
  'get_readme': { tags: ['github', 'readme', 'documentation', 'get'], intent: 'get readme', description: 'Get README file from a repository' },
  'create_repo': { tags: ['github', 'repository', 'create'], intent: 'create repository', description: 'Create a new GitHub repository' },
  'list_issues': { tags: ['github', 'issues', 'list'], intent: 'list issues', description: 'List GitHub issues' },
  'create_issue': { tags: ['github', 'issues', 'create'], intent: 'create issue', description: 'Create a new GitHub issue' },
  'list_prs': { tags: ['github', 'pull request', 'pr', 'list'], intent: 'list pull requests', description: 'List pull requests' },
  'create_pr': { tags: ['github', 'pull request', 'pr', 'create'], intent: 'create pull request', description: 'Create a new pull request' },
  
  // Vercel
  'deploy': { tags: ['vercel', 'deployment', 'deploy'], intent: 'deploy to vercel', description: 'Deploy to Vercel' },
  'list_deployments': { tags: ['vercel', 'deployment', 'list'], intent: 'list deployments', description: 'List Vercel deployments' },
  'list_projects': { tags: ['vercel', 'project', 'list'], intent: 'list projects', description: 'List Vercel projects' },
  'list_domains': { tags: ['vercel', 'domain', 'list'], intent: 'list domains', description: 'List Vercel domains' },
  'get_env_vars': { tags: ['vercel', 'environment', 'variables', 'list'], intent: 'get environment variables', description: 'Get environment variables' },
  
  // Neon
  'list_databases': { tags: ['neon', 'database', 'postgres', 'list'], intent: 'list databases', description: 'List Neon databases' },
  'create_database': { tags: ['neon', 'database', 'postgres', 'create'], intent: 'create database', description: 'Create a new Neon database' },
  'run_query': { tags: ['neon', 'database', 'query', 'sql'], intent: 'run database query', description: 'Run SQL query on Neon database' },
  
  // Upstash
  'redis_get': { tags: ['upstash', 'redis', 'get', 'cache'], intent: 'get redis value', description: 'Get value from Redis' },
  'redis_set': { tags: ['upstash', 'redis', 'set', 'cache'], intent: 'set redis value', description: 'Set value in Redis' },
  
  // Google
  'send_email': { tags: ['gmail', 'email', 'send'], intent: 'send email', description: 'Send email via Gmail' },
  'list_emails': { tags: ['gmail', 'email', 'list'], intent: 'list emails', description: 'List Gmail messages' },
  'list_files': { tags: ['drive', 'files', 'list'], intent: 'list drive files', description: 'List Google Drive files' },
  'upload_file': { tags: ['drive', 'files', 'upload'], intent: 'upload file to drive', description: 'Upload file to Google Drive' },
  'list_events': { tags: ['calendar', 'events', 'list'], intent: 'list calendar events', description: 'List Google Calendar events' },
  'create_event': { tags: ['calendar', 'events', 'create'], intent: 'create calendar event', description: 'Create Google Calendar event' },
  
  // OpenAI
  'chat': { tags: ['openai', 'chat', 'completion'], intent: 'chat completion', description: 'OpenAI chat completion' },
  'embed': { tags: ['openai', 'embedding', 'vector'], intent: 'create embedding', description: 'Create OpenAI embedding' },
  'generate_image': { tags: ['openai', 'image', 'generate', 'dall-e'], intent: 'generate image', description: 'Generate image with DALL-E' },
  
  // Stripe
  'create_payment': { tags: ['stripe', 'payment', 'create'], intent: 'create payment', description: 'Create Stripe payment' },
  'create_customer': { tags: ['stripe', 'customer', 'create'], intent: 'create customer', description: 'Create Stripe customer' },
  'create_subscription': { tags: ['stripe', 'subscription', 'create'], intent: 'create subscription', description: 'Create Stripe subscription' },
  
  // Supabase
  'query_table': { tags: ['supabase', 'database', 'query', 'select'], intent: 'query table', description: 'Query Supabase table' },
  'insert_row': { tags: ['supabase', 'database', 'insert'], intent: 'insert row', description: 'Insert row into Supabase table' },
  
  // Twilio
  'send_sms': { tags: ['twilio', 'sms', 'message', 'send'], intent: 'send sms', description: 'Send SMS via Twilio' },
  
  // Resend
  'send_email_resend': { tags: ['resend', 'email', 'send'], intent: 'send email via resend', description: 'Send email via Resend' },
  
  // Cloudflare
  'list_dns_records': { tags: ['cloudflare', 'dns', 'list'], intent: 'list dns records', description: 'List Cloudflare DNS records' },
  'purge_cache': { tags: ['cloudflare', 'cache', 'purge'], intent: 'purge cache', description: 'Purge Cloudflare cache' },
  
  // Playwright
  'open_browser': { tags: ['playwright', 'browser', 'automation'], intent: 'open browser', description: 'Launch browser with Playwright' },
  'screenshot': { tags: ['playwright', 'screenshot', 'capture'], intent: 'take screenshot', description: 'Take screenshot with Playwright' },
};

// Parameter mapping for aliases
const PARAM_MAPPINGS = {
  'list_repos': (args) => {
    if (args.owner) return { org: args.owner, ...args };
    return args;
  },
  'list_repos_for_user': (args) => args,
  'list_repos_for_org': (args) => {
    if (args.owner) return { org: args.owner, ...args };
    return args;
  },
  'list_repos_for_me': (args) => args,
};

module.exports = {
  resolveToolName: (name) => TOOL_ALIASES[name] || name,
  mapParameters: (name, args) => {
    const mapper = PARAM_MAPPINGS[name];
    return mapper ? mapper(args) : args;
  },
  getAllAliases: () => TOOL_ALIASES,
  getToolMetadata: (name) => TOOL_METADATA[name] || null,
  searchByIntent: (query) => {
    const needle = query.toLowerCase();
    return Object.entries(TOOL_METADATA)
      .filter(([name, meta]) => 
        meta.intent.includes(needle) ||
        meta.tags.some(tag => tag.includes(needle)) ||
        meta.description.toLowerCase().includes(needle)
      )
      .map(([name, meta]) => ({ name, ...meta, actualTool: TOOL_ALIASES[name] }));
  },
};
