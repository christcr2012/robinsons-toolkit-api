/**
 * context_neighborhood - Get file neighborhood (imports + importers + symbols)
 */

export async function contextNeighborhoodTool(args: { file: string }, ctx) {
  const { file } = args;

  if (!file) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ error: 'file parameter is required' }, null, 2)
      }]
    };
  }

  try {
    const neighborhood = await ctx.ctx.getNeighborhood(file);

    if (!neighborhood) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            error: 'Symbol index not built. Run context_index_repo first.',
            file
          }, null, 2)
        }]
      };
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          file,
          imports: neighborhood.imports,
          importedBy: neighborhood.importedBy,
          symbols: neighborhood.symbols.map((s) => ({
            name: s.name,
            type: s.type,
            line: s.line,
            isPublic: s.isPublic
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
          file
        }, null, 2)
      }]
    };
  }
}

