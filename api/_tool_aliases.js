// Tool name aliases for AI-friendly naming
// Maps intuitive names to actual toolkit tool names

const TOOL_ALIASES = {
  // GitHub repository tools - AI-friendly names
  'list_repos': 'github_list_repos',
  'list_repos_for_user': 'github_list_user_repos',
  'list_repos_for_org': 'github_list_repos',
  'list_repos_for_me': 'github_list_repos',
  
  // Common variations
  'github_list_repos_for_user': 'github_list_user_repos',
  'github_list_repos_for_org': 'github_list_repos',
};

// Parameter mapping for aliases
const PARAM_MAPPINGS = {
  'list_repos': (args) => {
    // Map 'owner' to 'org' for github_list_repos
    if (args.owner) {
      return { org: args.owner, ...args };
    }
    return args;
  },
  'list_repos_for_user': (args) => {
    // Ensure 'username' parameter exists
    return args;
  },
  'list_repos_for_org': (args) => {
    // Map 'owner' to 'org'
    if (args.owner) {
      return { org: args.owner, ...args };
    }
    return args;
  },
  'list_repos_for_me': (args) => {
    // No org parameter needed
    return args;
  },
};

module.exports = {
  resolveToolName: (name) => TOOL_ALIASES[name] || name,
  mapParameters: (name, args) => {
    const mapper = PARAM_MAPPINGS[name];
    return mapper ? mapper(args) : args;
  },
  getAllAliases: () => TOOL_ALIASES,
};
