// vendor/robinsons-toolkit-mcp/tools/github-create-issue.js
// Create a GitHub issue

const https = require("https");

module.exports = async function githubCreateIssue(args) {
  const { owner, repo, title, body, labels, assignees } = args || {};
  
  if (!owner || !repo || !title) {
    throw new Error("owner, repo, and title are required");
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is required");
  }

  const payload = JSON.stringify({
    title,
    body: body || "",
    labels: labels || [],
    assignees: assignees || []
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: `/repos/${owner}/${repo}/issues`,
      method: "POST",
      headers: {
        "User-Agent": "Robinson-Toolkit-API",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      
      res.on("data", (chunk) => {
        data += chunk;
      });
      
      res.on("end", () => {
        try {
          const issue = JSON.parse(data);
          
          if (res.statusCode !== 201) {
            reject(new Error(`GitHub API error: ${issue.message || data}`));
            return;
          }
          
          resolve({
            content: [{
              type: "text",
              text: `Created issue #${issue.number}: ${issue.html_url}`
            }]
          });
        } catch (err) {
          reject(new Error(`Failed to parse GitHub response: ${err.message}`));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(`GitHub API request failed: ${err.message}`));
    });

    req.write(payload);
    req.end();
  });
};
