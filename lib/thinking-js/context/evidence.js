/**
 * Evidence Store - Track evidence and findings across thinking tools
 */

import path from 'node:path';
import fs from 'node:fs';



export class EvidenceStore {
  private items: Map = new Map();
  private evidenceDir;

  constructor(private workspaceRoot) {
    this.evidenceDir = path.join(workspaceRoot, '.robctx', 'evidence');
  }

  /**
   * Add evidence item
   */
  async add(source, data, meta?: Record){
    const id = `${source}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const item: EvidenceItem = {
      id,
      source,
      timestamp: Date.now(),
      data,
      meta,
    };

    this.items.set(id, item);

    // Optionally persist to disk
    try {
      await this.persist(item);
    } catch (error) {
      console.error('[EvidenceStore] Failed to persist:', error);
    }

    return id;
  }

  /**
   * Get evidence by ID
   */
  get(id): EvidenceItem | undefined {
    return this.items.get(id);
  }

  /**
   * Get all evidence from a source
   */
  getBySource(source): EvidenceItem[] {
    return Array.from(this.items.values()).filter((item) => item.source === source);
  }

  /**
   * Get all evidence
   */
  getAll(): EvidenceItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Upsert evidence item (add or update by ID)
   */
  async upsert(id, item: Partial){
    const existing = this.items.get(id);
    const merged: EvidenceItem = existing
      ? { ...existing, ...item, id, timestamp: Date.now() }
      : {
          id,
          source: item.source ?? 'unknown',
          timestamp: Date.now(),
          data: item.data ?? {},
          meta: item.meta,
          title: item.title,
          snippet: item.snippet,
          uri: item.uri,
          score: item.score,
          tags: item.tags,
          group: item.group,
          raw: item.raw,
        };

    this.items.set(id, merged);

    try {
      await this.persist(merged);
    } catch (error) {
      console.error('[EvidenceStore] Failed to persist:', error);
    }

    return id;
  }

  /**
   * Find evidence by query
   */
  async find(query: {
    source?;
    group?;
    tag?;
    text?;
  }){
    const text = query.text?.toLowerCase();
    return Array.from(this.items.values()).filter((item) => {
      if (query.source && item.source !== query.source) return false;
      if (query.group && item.group !== query.group) return false;
      if (query.tag && !(item.tags ?? []).includes(query.tag)) return false;
      if (text) {
        const titleMatch = (item.title ?? '').toLowerCase().includes(text);
        const snippetMatch = (item.snippet ?? '').toLowerCase().includes(text);
        const dataMatch = JSON.stringify(item.data).toLowerCase().includes(text);
        if (!titleMatch && !snippetMatch && !dataMatch) return false;
      }
      return true;
    });
  }

  /**
   * Clear all evidence
   */
  clear(){
    this.items.clear();
  }

  /**
   * Persist evidence to disk
   */
  private async persist(item: EvidenceItem){
    if (!fs.existsSync(this.evidenceDir)) {
      fs.mkdirSync(this.evidenceDir, { recursive: true });
    }

    const filePath = path.join(this.evidenceDir, `${item.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(item, null, 2));
  }

  /**
   * Load evidence from disk
   */
  async load(){
    if (!fs.existsSync(this.evidenceDir)) return;

    const files = fs.readdirSync(this.evidenceDir);
    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      try {
        const filePath = path.join(this.evidenceDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const item: EvidenceItem = JSON.parse(content);
        this.items.set(item.id, item);
      } catch (error) {
        console.error(`[EvidenceStore] Failed to load ${file}:`, error);
      }
    }
  }
}

