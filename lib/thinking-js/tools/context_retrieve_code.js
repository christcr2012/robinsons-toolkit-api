/**
 * context_retrieve_code - Retrieve code context using FREE Agent's code-aware retrieval
 */

export async function contextRetrieveCodeTool(
  args: {
    targetFile?;
    targetFunction?;
    targetClass?;
    targetInterface?;
    keywords?;
  },
  ctx) {
  try {
    const result = await ctx.ctx.retrieveCodeContext(args);

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          targetFile: result.targetFile,
          similarFiles: result.similarFiles,
          relatedTests: result.relatedTests,
          relatedTypes: result.relatedTypes,
          snippets: result.snippets.map((s) => ({
            file: s.file,
            reason: s.reason,
            contentPreview: s.content.substring(0, 200) + (s.content.length > 200 ? '...' : '')
          }))
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: error.message,
          query: args
        }, null, 2)
      }]
    };
  }
}

