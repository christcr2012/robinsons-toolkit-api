/*
  context-packing.ts – Context Packing with Inline Citations
  ----------------------------------------------------------
  Add inline anchors to examples for citation tracking.
  The Fixer must reference them in conventions_used.

  Features:
  - Inject anchors into code examples
  - Truncate by token budget
  - Track citations for audit trail
*/

  file;
  startLine;
  endLine;
  content;
  description?;
};

  citedContent;
};

  totalTokens;
  truncated;
};

/**
 * Pack context with inline citations
 */
export function packContext(
  examples,
  opts: {
    maxTokens?;
    anchorPrefix?;
  } = {}
) {
  const maxTokens = opts.maxTokens || 8000;
  const anchorPrefix = opts.anchorPrefix || 'EX';
  
  const cited = [];
  let totalTokens = 0;
  let truncated = false;
  
  for (let i = 0; i  maxTokens) {
      truncated = true;
      break;
    }
    
    cited.push({
      ...example,
      anchor,
      citedContent,
    });
    
    totalTokens += tokens;
  }
  
  return {
    examples: cited,
    totalTokens,
    truncated,
  };
}

/**
 * Extract citations from conventions_used
 */
export function extractCitations(
  conventionsUsed
): {
  cited;
  uncited;
} {
  const cited = [];
  const uncited = [];
  
  for (const conv of conventionsUsed) {
    if (conv.mirrors.some(m => m.includes('⟦'))) {
      cited.push(conv.new);
    } else {
      uncited.push(conv.new);
    }
  }
  
  return { cited, uncited };
}

/**
 * Validate that Fixer referenced examples
 */
export function validateCitations(
  conventionsUsed,
  examples
): {
  valid;
  missingCitations;
  invalidCitations;
} {
  const validAnchors = new Set(examples.map(e => e.anchor));
  const missingCitations = [];
  const invalidCitations = [];
  
  for (const conv of conventionsUsed) {
    let hasCitation = false;
    
    for (const mirror of conv.mirrors) {
      const anchorMatch = mirror.match(/⟦([^⟧]+)⟧/);
      if (anchorMatch) {
        hasCitation = true;
        const anchor = `⟦${anchorMatch[1]}⟧`;
        if (!validAnchors.has(anchor)) {
          invalidCitations.push(anchor);
        }
      }
    }
    
    if (!hasCitation) {
      missingCitations.push(conv.new);
    }
  }
  
  return {
    valid: missingCitations.length === 0 && invalidCitations.length === 0,
    missingCitations,
    invalidCitations,
  };
}

/**
 * Render context pack text
 */
export function renderContextPack(pack: ContextPack){
  let text = '# Code Examples\n\n';
  text += 'Use these examples. When you use a pattern from an example, ';
  text += 'reference it in conventions_used with the anchor (e.g., ⟦EX1:src/foo.ts:42⟧).\n\n';
  
  for (const example of pack.examples) {
    text += `## ${example.id}\n`;
    if (example.description) {
      text += `${example.description}\n\n`;
    }
    text += '```\n';
    text += example.citedContent;
    text += '\n```\n\n';
  }
  
  if (pack.truncated) {
    text += '\n_Note: Context truncated to fit token budget_\n';
  }
  
  return text;
}

/**
 * Create code example from file
 */
export function createExample(
  id,
  file,
  content,
  opts: {
    startLine?;
    endLine?;
    description?;
  } = {}
) {
  return {
    id,
    file,
    startLine: opts.startLine || 1,
    endLine: opts.endLine || content.split('\n').length,
    content,
    description: opts.description,
  };
}

/**
 * Extract examples from neighbor files
 */
export function extractExamplesFromNeighbors(
  neighbors,
  opts: {
    maxExamplesPerFile?;
    targetSymbols?;
  } = {}
) {
  const maxExamplesPerFile = opts.maxExamplesPerFile || 3;
  const examples = [];
  
  for (const neighbor of neighbors) {
    // Extract functions/classes from the file
    const extracted = extractCodeBlocks(neighbor.content, opts.targetSymbols);
    
    for (let i = 0; i  {
    let score = 0;
    for (const sym of targetSymbols) {
      if (ex.content.includes(sym)) {
        score++;
      }
    }
    return { example: ex, score };
  });
  
  // Sort by score (descending)
  scored.sort((a, b) => b.score - a.score);
  
  return scored.map(s => s.example);
}

