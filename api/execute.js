// api/execute.js
// Robinson's Toolkit API - Execute endpoint
// Uses vendored runtime (no MCP deps)

let UnifiedToolkitRef = null;

function loadToolkitSync() {
  try {
    // Prefer vendored runtime for zero-deps
    const mod = require("../vendor/robinsons-toolkit-mcp");
    return mod.UnifiedToolkit || (mod.default && mod.default.UnifiedToolkit) || mod;
  } catch (e) {
    // Optional: try npm package if you later publish it
    try {
      const mod = require("robinsons-toolkit-mcp");
      return mod.UnifiedToolkit || (mod.default && mod.default.UnifiedToolkit) || mod;
    } catch {
      throw e;
    }
  }
}

async function getUnifiedToolkit() {
  if (!UnifiedToolkitRef) {
    const UnifiedToolkit = loadToolkitSync();
    UnifiedToolkitRef = (typeof UnifiedToolkit === "function")
      ? new UnifiedToolkit()
      : UnifiedToolkit;
  }
  return UnifiedToolkitRef;
}

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

    const key = req.headers["x-api-key"];
    if (process.env.API_KEY && key !== process.env.API_KEY)
      return res.status(401).json({ error: "Unauthorized" });

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { tool, args } = body;
    if (!tool) return res.status(400).json({ error: "Missing `tool`" });

    const tk = await getUnifiedToolkit();
    const exec = tk.executeToolInternal || tk.execute || tk.run;
    if (!exec) return res.status(500).json({ error: "Toolkit has no execute method" });

    const result = await exec.call(tk, tool, args || {});
    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: (err && err.message) || String(err) });
  }
};
