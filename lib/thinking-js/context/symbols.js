const EXT_ALIAS: Record = {
  '.tsx': '.ts',
  '.jsx': '.js',
  '.mjs': '.js',
  '.cjs': '.js',
  '.cts': '.ts',
  '.mts': '.ts',
  '.hpp': '.cpp',
  '.hxx': '.cpp',
  '.hh': '.cpp',
  '.ipp': '.cpp',
  '.cc': '.cpp',
  '.cxx': '.cpp',
  '.h': '.c',
  '.mm': '.m',
};

;

function normalizeExtension(ext){
  const lower = ext.toLowerCase();
  return EXT_ALIAS[lower] ?? lower;
}

function matchAll(text, regex: RegExp, group = 1) {
  const out = [];
  let match: RegExpExecArray | null;
  const cloned = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
  while ((match = cloned.exec(text)) !== null) {
    const value = match[group];
    if (value) out.push(value.trim());
  }
  return out;
}

export function extractSymbols(langExt, text) {
  const normalized = normalizeExtension(langExt);
  const out = new Set();
  const patterns = SYMBOL_PATTERNS[normalized] || [];

  for (const extractor of patterns) {
    try {
      for (const symbol of extractor(text)) {
        if (symbol) out.add(symbol);
      }
    } catch {
      // ignore extractor failures
    }
  }

  if (out.size === 0) {
    for (const match of matchAll(text, /([A-Za-z_][A-Za-z0-9_]*)\s*\(/g)) {
      out.add(match);
    }
  }

  return Array.from(out).slice(0, 200);
}

