"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTools = validateTools;
const NAME_RE = /^[A-Za-z0-9:_-]{1,64}$/;
function validateTools(tools) {
    if (!Array.isArray(tools))
        return [];
    const seen = new Set();
    const ok = [];
    for (const t of tools) {
        if (!t || typeof t !== "object")
            continue;
        const name = String(t.name || "").trim();
        if (!NAME_RE.test(name))
            continue;
        // normalize empty/null schemas to {}
        let inputSchema = t.inputSchema ?? {};
        if (inputSchema === null || typeof inputSchema !== "object")
            inputSchema = {};
        // de-dupe by name
        if (seen.has(name))
            continue;
        seen.add(name);
        ok.push({ ...t, name, inputSchema });
    }
    // keep stable for deterministic diffs
    ok.sort((a, b) => a.name.localeCompare(b.name));
    return ok;
}
