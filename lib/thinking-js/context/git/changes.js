import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';

const ex = promisify(execFile);

;

async function insideGit(root) {
  try { 
    await ex('git', ['rev-parse', '--is-inside-work-tree'], { cwd: root }); 
    return true; 
  } catch { 
    return false; 
  }
}

export async function gitChangesSince(root, prevHead?){
  const set: ChangeSet = { 
    head: undefined, 
    prev: prevHead, 
    added: [], 
    modified: [], 
    deleted: [], 
    untracked: [] 
  };
  
  if (!(await insideGit(root))) return set;

  try { 
    set.head = (await ex('git', ['rev-parse', 'HEAD'], { cwd: root })).stdout.trim(); 
  } catch {}
  
  // committed changes since prevHead
  if (prevHead && set.head && prevHead !== set.head) {
    const out = (await ex('git', ['diff', '--name-status', `${prevHead}..HEAD`], { cwd: root })).stdout;
    for (const line of out.split(/\r?\n/).filter(Boolean)) {
      const [t, p] = line.split(/\s+/, 2);
      if (t === 'A') set.added.push(p);
      else if (t === 'M') set.modified.push(p);
      else if (t === 'D') set.deleted.push(p);
      else set.modified.push(p);
    }
  }
  
  // uncommitted changes
  try {
    const m = (await ex('git', ['ls-files', '-m'], { cwd: root })).stdout.split(/\r?\n/).filter(Boolean);
    const u = (await ex('git', ['ls-files', '-o', '--exclude-standard'], { cwd: root })).stdout.split(/\r?\n/).filter(Boolean);
    set.modified.push(...m);
    set.untracked.push(...u);
  } catch {}

  // de-dup
  const uniq = (a) => Array.from(new Set(a));
  set.added = uniq(set.added);
  set.modified = uniq(set.modified);
  set.deleted = uniq(set.deleted);
  set.untracked = uniq(set.untracked);
  return set;
}

// Non-git fallback: compare mtime+size with meta
export async function fsDiffFallback(
  root, 
  files, 
  metaMap: Record
) {
  const added = [], modified = [], deleted = [];
  const known = new Set(Object.keys(metaMap));
  
  for (const f of files) {
    const p = path.join(root, f);
    try {
      const st = await fs.stat(p);
      if (!metaMap[f]) {
        added.push(f);
      } else if (st.mtimeMs !== metaMap[f].mtimeMs || st.size !== metaMap[f].size) {
        modified.push(f);
      }
      known.delete(f);
    } catch {}
  }
  
  for (const gone of known) {
    deleted.push(gone);
  }
  
  return { added, modified, deleted };
}

