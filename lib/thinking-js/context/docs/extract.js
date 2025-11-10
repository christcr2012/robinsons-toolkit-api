import crypto from 'node:crypto';
import path from 'node:path';
import { DocRecord, DocType } from './types.js';

const TYPE_PATTERNS: Array = [
  ['plan', /(plan|planning|roadmap|proposal)/i],
  ['design', /(design|architecture|adr)/i],
  ['rfc', /\brfc\b/i],
  ['decision', /(decision\s*record|adr)/i],
  ['completion', /(completion|final\s*report|wrap[-\s]*up|deliverables)/i],
  ['postmortem', /(post[-\s]*mortem|incident|lesson[s]? learned|root cause)/i],
  ['retro', /(retrospective|retro)/i],
  ['changelog', /(changelog|release\s*notes)/i],
  ['spec', /\b(spec|specification|contract|api)\b/i],
  ['readme', /\breadme\b/i],
  ['status', /(status\s*report|progress|weekly|daily)/i]
];

function frontmatter(text) {
  const m = text.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (!m) return {};
  const obj: Record = {};
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+?)\s*$/);
    if (mm) obj[mm[1].toLowerCase()] = mm[2];
  }
  return obj;
}

function firstHeading(text) {
  const m = text.match(/^\s*#\s+(.+)$/m);
  return m ? m[1].trim() : '';
}

function firstParagraph(text) {
  const noFM = text.replace(/^---[\s\S]*?---/, '');
  const m = noFM.trim().split(/\n{2,}/).find(x => x.trim().length > 40);
  return m ? m.trim().slice(0, 800) : '';
}

function fileTypeHint(file): DocType | undefined {
  const base = path.basename(file).toLowerCase();
  for (const [t, re] of TYPE_PATTERNS) {
    if (re.test(base)) return t;
  }
  return undefined;
}

function label(text): DocType {
  for (const [t, re] of TYPE_PATTERNS) {
    if (re.test(text)) return t;
  }
  return 'other';
}

function detectStatus(text) {
  const m = text.match(/status\s*[:\-]\s*(draft|approved|in[-\s]?progress|done|deprecated)/i);
  if (!m) return 'unknown';
  const norm = m[1].toLowerCase().replace(/\s+/g, '-');
  if (norm.startsWith('in-')) return 'in-progress';
  return (['draft','approved','done','deprecated'].includes(norm) ? norm : 'unknown');
}

function detectVersion(text) {
  const m = text.match(/\b(v(?:ersion)?\s*[:\-]?\s*)(\d+\.\d+(?:\.\d+)?)/i);
  return m ? m[2] : undefined;
}

function detectDate(text) {
  const m = text.match(/\b(20\d{2}[-\/.](?:0?[1-9]|1[0-2])[-\/.](?:0?[1-9]|[12]\d|3[01]))\b/);
  return m ? m[1].replace(/[\/.]/g,'-') : undefined;
}

function extractTasks(text) {
  const tasks: Array = [];
  const re = /^[ \t]*[-*]\s+\[( |x)\]\s+(.+)$/gmi;
  let mm; while ((mm = re.exec(text))) tasks.push({ text: mm[2].trim(), done: mm[1].toLowerCase()==='x' });
  return tasks;
}

function extractLinks(file, text) {
  const links: Array = [];
  // code paths in backticks or plain
  const code = /`([^`]+?\.(?:ts|tsx|js|jsx|py|go|java|rs))`|((?:^|[\s(])[^`'"]+?\.(?:ts|tsx|js|jsx|py|go|java|rs))/gmi;
  let m; while((m = code.exec(text))) {
    const ref = (m[1] || m[2] || '').trim();
    if (ref) links.push({ kind:'code', ref });
  }
  // issues (#123 or GH urls)
  const issue = /#\d{2,6}\b|https?:\/\/github\.com\/[^/\s]+\/[^/\s]+\/issues\/\d+/gmi;
  while((m = issue.exec(text))) links.push({ kind:'issue', ref: m[0] });
  // bare urls for context
  const url = /https?:\/\/[^\s)]+/gmi;
  while((m = url.exec(text))) links.push({ kind:'url', ref: m[0] });
  return links;
}

export function extractDocRecord(file, text): DocRecord {
  const fm = frontmatter(text);
  const t0 = fileTypeHint(file);
  const title = fm.title || firstHeading(text) || path.basename(file);
  const summary = fm.summary || firstParagraph(text);
  const type = (fm.type as DocType) || t0 || label(title + '\n' + summary);
  const status = (fm.status) || detectStatus(text);
  const version = fm.version || detectVersion(text);
  const date = fm.date || detectDate(text);
  const tasks = extractTasks(text);
  const links = extractLinks(file, text);
  const id = crypto.createHash('sha1').update(file + ':' + title).digest('hex');
  const tags = (fm.tags || '').split(',').map((x)=>x.trim()).filter(Boolean);
  return { id, uri:file, title, type, status, version, date, summary, tags, tasks, links };
}

