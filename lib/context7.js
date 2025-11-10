/** CONTEXT7 Integration - Pure JavaScript */

async function context7Fetch(credentials, path, options = {}) {
  const url = path.startsWith('http') ? path : 'https://api.context7.com' + path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function resolveLibraryId(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { library } = args;
    const response = await this.context7Client.get(`/libraries/resolve`, {
      params: { name: library },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to resolve library ID: ${error.message}`);
  }
}

async function searchLibraries(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { query, limit = 10 } = args;
    const response = await this.context7Client.get(`/libraries/search`, {
      params: { q: query, limit },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to search libraries: ${error.message}`);
  }
}

async function listLibraries(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { page = 1, perPage = 50 } = args;
    const response = await this.context7Client.get(`/libraries`, {
      params: { page, per_page: perPage },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to list libraries: ${error.message}`);
  }
}

async function getLibraryDocs(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { library, version } = args;
    const response = await this.context7Client.get(`/libraries/${library}/docs`, {
      params: { version },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to get library docs: ${error.message}`);
  }
}

async function searchDocs(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { library, query, version } = args;
    const response = await this.context7Client.get(`/libraries/${library}/docs/search`, {
      params: { q: query, version },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to search docs: ${error.message}`);
  }
}

async function getApiReference(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { library, version } = args;
    const response = await this.context7Client.get(`/libraries/${library}/api`, {
      params: { version },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to get API reference: ${error.message}`);
  }
}

async function getGuides(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { library, version } = args;
    const response = await this.context7Client.get(`/libraries/${library}/guides`, {
      params: { version },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to get guides: ${error.message}`);
  }
}

async function compareVersions(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { library, from, to } = args;
    const response = await this.context7Client.get(`/libraries/${library}/compare`, {
      params: { from, to },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to compare versions: ${error.message}`);
  }
}

async function getMigrationGuide(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { library, from, to } = args;
    const response = await this.context7Client.get(`/libraries/${library}/migration`, {
      params: { from, to },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to get migration guide: ${error.message}`);
  }
}

async function listVersions(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { library } = args;
    const response = await this.context7Client.get(`/libraries/${library}/versions`);
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to list versions: ${error.message}`);
  }
}

async function getExamples(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { library, topic, version } = args;
    const response = await this.context7Client.get(`/libraries/${library}/examples`, {
      params: { topic, version },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to get examples: ${error.message}`);
  }
}

async function searchExamples(credentials, args) {
  if (!this.context7Client) throw new Error('Context7 client not initialized');
  try {
    const { query, libraries, limit = 10 } = args;
    const response = await this.context7Client.get(`/examples/search`, {
      params: { q: query, libraries: libraries?.join(','), limit },
    });
    return formatContext7Response(response.data);
  } catch (error) {
    throw new Error(`Failed to search examples: ${error.message}`);
  }
}

async function executeContext7Tool(toolName, args, credentials) {
  const tools = {
    'context7_resolveLibraryId': resolveLibraryId,
    'context7_searchLibraries': searchLibraries,
    'context7_listLibraries': listLibraries,
    'context7_getLibraryDocs': getLibraryDocs,
    'context7_searchDocs': searchDocs,
    'context7_getApiReference': getApiReference,
    'context7_getGuides': getGuides,
    'context7_compareVersions': compareVersions,
    'context7_getMigrationGuide': getMigrationGuide,
    'context7_listVersions': listVersions,
    'context7_getExamples': getExamples,
    'context7_searchExamples': searchExamples,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeContext7Tool };