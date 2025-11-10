/**
 * GitHub Integration - Pure REST API calls
 * NO MCP dependencies
 */

async function githubFetch(token, path, options = {}) {
  const url = path.startsWith('http') ? path : `https://api.github.com${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error (${response.status}): ${error}`);
  }

  return response.json();
}

async function listRepos(token, args) {
  const params = new URLSearchParams();
  if (args.type) params.append('type', args.type);
  if (args.per_page) params.append('per_page', args.per_page);
  
  const path = args.org ? `/orgs/${args.org}/repos` : '/user/repos';
  const query = params.toString() ? `?${params}` : '';
  return githubFetch(token, `${path}${query}`);
}

async function getRepo(token, args) {
  return githubFetch(token, `/repos/${args.owner}/${args.repo}`);
}

async function executeGitHubTool(toolName, args, token) {
  const tools = {
    'github_list_repos': listRepos,
    'github_get_repo': getRepo,
  };
  
  const handler = tools[toolName];
  if (!handler) {
    throw new Error(`Unknown GitHub tool: ${toolName}`);
  }
  
  return handler(token, args);
}

module.exports = { executeGitHubTool };
