// vendor/robinsons-toolkit-mcp/tools/vercel-list-projects.js
// List Vercel projects

const https = require("https");

module.exports = async function vercelListProjects(args) {
  const { limit = 20 } = args || {};

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    throw new Error("VERCEL_TOKEN environment variable is required");
  }

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.vercel.com",
      path: `/v9/projects?limit=${limit}`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
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
            reject(new Error(`Vercel API error: ${response.error?.message || data}`));
            return;
          }
          
          resolve({
            content: [{
              type: "text",
              text: JSON.stringify(response.projects, null, 2)
            }]
          });
        } catch (err) {
          reject(new Error(`Failed to parse Vercel response: ${err.message}`));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(`Vercel API request failed: ${err.message}`));
    });

    req.end();
  });
};
