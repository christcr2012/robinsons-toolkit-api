import { indexRepo } from '../context/indexer.js';

export const contextIndexFullDescriptor = {
  name: 'context_index_full',
  description: 'Force a full rebuild of the index (ignores TTL and caps). Use after branch switch or when index seems stale.',
  inputSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {}
  }
};

export async function contextIndexFullTool(_: {}, ctx) {
  try {
    // Force full rebuild by passing quick: false
    const res = await indexRepo(ctx.workspaceRoot, { quick: false, force: true });

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          ok: res.ok,
          chunks: res.chunks,
          embeddings: res.embeddings,
          files: res.files,
          changed: res.changed,
          removed: res.removed,
          tookMs: res.tookMs
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error performing full index: ${error.message}`
      }],
      isError: true
    };
  }
}

