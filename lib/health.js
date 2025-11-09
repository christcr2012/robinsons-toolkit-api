"use strict";
/**
 * Toolkit Health Check
 *
 * Validates that all tools in the toolkit have valid names and schemas.
 * Helps diagnose "NULL tools" and "invalid name" errors.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolkit_health = toolkit_health;
const NAME_RE = /^[A-Za-z0-9._-]{1,64}$/;
/**
 * Validate all tools and return health report
 */
async function toolkit_health(tools) {
    const invalid = [];
    const categories = {};
    tools.forEach((t, i) => {
        // Track categories
        const category = t.name?.split("_")[0] || "unknown";
        categories[category] = (categories[category] || 0) + 1;
        // Validate tool
        if (!t || typeof t !== "object") {
            invalid.push({ index: i, name: t?.name, reason: "not an object" });
            return;
        }
        if (!t.name || typeof t.name !== "string") {
            invalid.push({ index: i, name: t?.name, reason: "missing or invalid name" });
            return;
        }
        if (!NAME_RE.test(t.name)) {
            invalid.push({ index: i, name: t.name, reason: "name doesn't match ^[A-Za-z0-9._-]{1,64}$" });
            return;
        }
        if (!t.inputSchema || typeof t.inputSchema !== "object") {
            invalid.push({ index: i, name: t.name, reason: "missing or invalid inputSchema" });
            return;
        }
        if (!t.description || typeof t.description !== "string") {
            invalid.push({ index: i, name: t.name, reason: "missing or invalid description" });
            return;
        }
    });
    return {
        total: tools.length,
        valid: tools.length - invalid.length,
        invalid_count: invalid.length,
        sample_invalid: invalid.slice(0, 20),
        categories,
    };
}
