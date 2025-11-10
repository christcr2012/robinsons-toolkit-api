const { executeGitHubTool } = require('./integrations/github');

async function executeToolkitTool(toolName, args, credentials) {
  if (toolName.startsWith('github_')) {
    return await executeGitHubTool(toolName, args, credentials.githubToken);
  }
  throw new Error(`Unknown tool: ${toolName}`);
}

module.exports = { executeToolkitTool };
