// vendor/robinsons-toolkit-mcp/tools/neon-list-projects.js
// List Neon PostgreSQL projects

const https = require("https");

module.exports = async function neonListProjects(args) {
  const { limit = 10 } = args || {};

  const apiKey = process.env.NEON_API_KEY;
  if (!apiKey) {
    throw new Error("NEON_API_KEY environment variable is required");
  }

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "console.neon.tech",
      path: `/api/v2/projects?limit=${limit}`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/json"
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      
      res.on("data", (chunk) => {
        data += chunk;
      });
      
      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          
          if (res.statusCode !== 200) {
            reject(new Error(`Neon API error: ${response.message || data}`));
            return;
          }
          
          resolve({
            content: [{
              type: "text",
              text: JSON.stringify(response.projects, null, 2)
            }]
          });
        } catch (err) {
          reject(new Error(`Failed to parse Neon response: ${err.message}`));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(`Neon API request failed: ${err.message}`));
    });

    req.end();
  });
};
