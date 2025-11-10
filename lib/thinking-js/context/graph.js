import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';

;

const IGNORE = ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/build/**', '**/.next/**', '**/.venv*/**'];
const FILE_GLOB = ['**/*.{ts,tsx,js,jsx,py,go,java,rs,cpp,c,cc,cxx,h,hpp,hh}'];
const EXTENSIONS = ['', '.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.java', '.rs', '.cpp', '.c', '.cc', '.cxx', '.mjs', '.mts', '.cts', '.h', '.hpp', '.hh'];

function normalize(root, file){
  const abs = path.isAbsolute(file) ? file : path.join(root, file);
  return path.relative(root, abs).split(path.sep).join('/');
}

function resolveRelative(fromFile, spec): string | null {
  const dir = path.dirname(fromFile);
  const base = path.resolve(dir, spec);
  const candidates = [base, ...EXTENSIONS.map(ext => base + ext), ...EXTENSIONS.map(ext => path.join(base, 'index' + ext)), path.join(base, '__init__.py')];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function resolvePythonRelative(fromFile, spec): string | null {
  const match = spec.match(/^([.]+)(.*)$/);
  if (!match) return null;
  const depth = match[1].length;
  const remainder = match[2].replace(/\./g, '/');
  let dir = path.dirname(fromFile);
  for (let i = 0; i  l.trim()).filter(Boolean);
        for (const line of lines) {
          const match = line.match(/"([^"]+)"/);
          if (match) {
            addEdge(edges, root, file, null, match[1]);
          }
        }
      } else if (m[3]) {
        addEdge(edges, root, file, null, m[3]);
      }
    }
  } else if (ext === '.rs') {
    const useRe = /use\s+crate::([A-Za-z0-9_:]+)/g;
    let m;
    while ((m = useRe.exec(text))) {
      const spec = m[1].replace(/::/g, '/');
      const target = resolveRelative(file, `./${spec}.rs`);
      addEdge(edges, root, file, target, spec);
    }
  } else if (['.cpp', '.cc', '.cxx', '.c', '.h', '.hpp', '.hh'].includes(ext)) {
    const includeRe = /#include\s+["]+)[">]/g;
    let m;
    while ((m = includeRe.exec(text))) {
      const spec = m[1];
      if (spec.startsWith('.')) {
        const resolved = path.resolve(dir, spec);
        addEdge(edges, root, file, fs.existsSync(resolved) ? resolved : null, spec);
      }
    }
  } else if (ext === '.java') {
    const importRe = /import\s+([a-zA-Z0-9_.]+);/g;
    let m;
    while ((m = importRe.exec(text))) {
      const spec = m[1];
      addEdge(edges, root, file, null, spec);
    }
  }
}

export function buildImportGraph(repoRoot = process.cwd()): Array {
  const edges: Edge[] = [];
  const files = fg.sync(FILE_GLOB, {
    cwd: repoRoot,
    ignore: IGNORE,
    absolute: true,
  });

  for (const file of files) {
    try {
      scanFile(repoRoot, file, edges);
    } catch (error) {
      console.warn(`[buildImportGraph] Failed to parse ${file}:`, (error).message);
    }
  }

  return edges;
}

