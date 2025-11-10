// @ts-ignore - jsdom types not available
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { request } from 'undici';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { embedBatch } from './embedding.js';
import { saveChunk, saveEmbedding, saveStats, getStats } from './store.js';

const root = process.env.CTX_ROOT || '.robinson/context';

function sha(s){
  return crypto.createHash('sha1').update(s).digest('hex');
}

async function fetchHTML(url){
  const ua = process.env.CTX_WEB_USER_AGENT || 'RobinsonContext/1.0';
  const r = await request(url, {
    headers: { 'user-agent': ua }
  });
  
  if (r.statusCode >= 400) throw new Error('HTTP ' + r.statusCode);
  return await r.body.text();
}

export async function ingestUrls(urls, tags = []){
  const MAXCH = parseInt(process.env.CTX_MAX_CHARS_PER_CHUNK || '1200', 10);
  let n = 0;
  
  for (const u of urls) {
    const html = await fetchHTML(u);
    const dom = new JSDOM(html, { url: u });
    const reader = new Readability(dom.window.document);
    const art = reader.parse();
    const text = (art?.textContent || '').trim();
    
    if (!text) continue;
    
    const idbase = sha(u + ':' + (art?.title || ''));
    const words = text.split(/\s+/);
    
    // chunk by chars
    const chunks: { text; start; end: number }[] = [];
    let buf = [];
    let idx = 0;
    
    for (const w of words) {
      buf.push(w);
      if (buf.join(' ').length >= MAXCH) {
        chunks.push({
          text: buf.join(' '),
          start: idx,
          end: idx + buf.length
        });
        idx += buf.length;
        buf = [];
      }
    }
    
    if (buf.length) {
      chunks.push({
        text: buf.join(' '),
        start: idx,
        end: idx + buf.length
      });
    }
    
    const embs = await embedBatch(chunks.map(c => c.text));
    
    for (let i = 0; i  decodeURIComponent(x[1]));
  
  return urls;
}

