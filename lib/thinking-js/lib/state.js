/**
 * Shared state store for thinking tools
 * Provides session-based state management across all tools
 */

;
::${k.convoId}`;
  }

  get(k: SessionKey): KV {
    return this.cache.get(this.key(k)) ?? {};
  }

  set(k: SessionKey, v: KV){
    this.cache.set(this.key(k), v);
  }

  update(k: SessionKey, updater: (v: KV) => KV): KV {
    const cur = this.get(k);
    this.set(k, updater(cur));
    return this.get(k);
  }

  clear(k: SessionKey){
    this.cache.delete(this.key(k));
  }

  clearAll(){
    this.cache.clear();
  }
}

export const state = new StateStore();

