import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import { lexicalRank } from './search.js';



const FILE_GLOB = ['**/*.{ts,tsx,js,jsx,py,go,java,rs,cpp,c,h,cs,rb,php}'];
const FILE_IGNORE = [
  '**/node_modules/**',
  '**/.git/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/.turbo/**',
  '**/vendor/**',
  '**/.venv*/**',
  '**/venv/**',
  '**/__pycache__/**',
  '**/.idea/**',
];

function highlight(text, term){
  const idx = text.toLowerCase().indexOf(term.toLowerCase());
  if (idx === -1) {
    return text.slice(0, 320);
  }
  const start = Math.max(0, idx - 120);
  const end = Math.min(text.length, idx + term.length + 180);
  return text.slice(start, end);
}

export class QuickSearch {
  private files = [];
  private lastIndexed = 0;
  private readonly ttlMs = 5 * 60 * 1000;
  private readonly maxFiles = parseInt(process.env.RCE_QUICK_MAX_FILES ?? '400', 10);

  constructor(private readonly root) {}

  private async refreshIfNeeded(){
    const now = Date.now();
    if (this.files.length && now - this.lastIndexed  terms.some(term => f.toLowerCase().includes(term)))
      .concat(this.files)
      .slice(0, Math.min(this.maxFiles, 200));

    const seen = new Set();
    const hits: QuickHit[] = [];

    for (const file of prioritized) {
      const rel = path.relative(this.root, file).split(path.sep).join('/');
      if (seen.has(rel)) continue;
      seen.add(rel);

      try {
        const text = await fs.readFile(file, 'utf8');
        const snippet = highlight(text, terms[0]);
        const score = lexicalRank(query, text.slice(0, 16000));
        if (score = limit * 2) break;
    }

    return hits
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(hit => ({ ...hit, score: Math.max(0.05, hit.score) }));
  }
}
