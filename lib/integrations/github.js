/**
 * GitHub Integration - Pure REST API (no MCP protocol)
 */

class GitHubIntegration {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'https://api.github.com';
  }

  async fetch(path, options = {}) {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
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

  async listRepos(args) {
    const params = new URLSearchParams();
    if (args.type) params.append('type', args.type);
    if (args.per_page) params.append('per_page', args.per_page);
    const query = params.toString() ? `?${params}` : '';
    return this.fetch(`/user/repos${query}`);
  }

  async listUserRepos(args) {
    const params = new URLSearchParams();
    if (args.per_page) params.append('per_page', args.per_page);
    const query = params.toString() ? `?${params}` : '';
    return this.fetch(`/users/${args.username}/repos${query}`);
  }

  async getRepo(args) {
    return this.fetch(`/repos/${args.owner}/${args.repo}`);
  }
}

async function executeGitHubTool(toolName, args, token) {
  const github = new GitHubIntegration(token);
  
  const methodMap = {
    'github_list_repos': 'listRepos',
    'github_list_user_repos': 'listUserRepos',
    'github_get_repo': 'getRepo',
  };

  const method = methodMap[toolName];
  if (!method) {
    throw new Error(`Unknown GitHub tool: ${toolName}`);
  }

  return github[method](args);
}

module.exports = { GitHubIntegration, executeGitHubTool };
