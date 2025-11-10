import { loadDocs } from '../context/store.js';

function normTitle(s){ 
  return s.toLowerCase().replace(/\s+/g,' ').replace(/[^\w ]+/g,'').trim(); 
}

export const docsDupesDescriptor = {
  name: 'docs_find_duplicates',
  description: 'Find near-duplicate docs by normalized title and date; flag older as deprecated.',
  inputSchema: { type: 'object', additionalProperties: false }
};

export async function docsDupesTool(_: {}, ctx){
  await ctx.ctx.ensureIndexed();
  const docs = loadDocs();
  const map = new Map();
  for (const d of docs) {
    const key = normTitle(d.title || d.uri.split('/').pop()!);
    map.set(key, [...(map.get(key)||[]), d]);
  }
  const out = [];
  for (const [key, arr] of map) if (arr.length > 1) {
    const sorted = arr.sort((a,b)=> (b.date||'').localeCompare(a.date||''));
    out.push({ title:key, canonical: sorted[0].uri, duplicates: sorted.slice(1).map(x=>x.uri) });
  }
  return { content: [{ type:'text', text: JSON.stringify(out, null, 2) }] };
}

