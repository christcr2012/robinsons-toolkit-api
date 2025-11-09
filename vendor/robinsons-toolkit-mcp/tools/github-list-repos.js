// vendor/robinsons-toolkit-mcp/tools/github-list-repos.js
// List GitHub repositories for a user or organization

const https = require("https");

module.exports = async function githubListRepos(args) {
  const { owner, type = "all", sort = "updated", per_page = 30 } = args || {};
  
  if (!owner) {
    throw new Error("owner is required");
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is required");
  }

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: `/users/${owner}/repos?type=${type}&sort=${sort}&per_page=${per_page}`,
      method: "GET",
      headers: {
        "User-Agent": "Robinson-Toolkit-API",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      
      res.on("data", (chunk) => {
        data += chunk;
      });
      
      res.on("end", () => {
        try {
          const repos = JSON.parse(data);
          
          if (res.statusCode !== 200) {
            reject(new Error(`GitHub API error: ${repos.message || data}`));
            return;
          }
          
          // Return formatted response
          resolve({
            content: [{
              type: "text",
              text: JSON.stringify(repos, null, 2)
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

    req.end();
  });
};
