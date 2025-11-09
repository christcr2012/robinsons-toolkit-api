// vendor/robinsons-toolkit-mcp/tools/openai-list-models.js
// List OpenAI models

const https = require("https");

module.exports = async function openaiListModels(args) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is required");
  }

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.openai.com",
      path: "/v1/models",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
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
            reject(new Error(`OpenAI API error: ${response.error?.message || data}`));
            return;
          }
          
          // Sort models by ID for easier reading
          const models = response.data.sort((a, b) => a.id.localeCompare(b.id));
          
          resolve({
            content: [{
              type: "text",
              text: JSON.stringify(models, null, 2)
            }]
          });
        } catch (err) {
          reject(new Error(`Failed to parse OpenAI response: ${err.message}`));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(`OpenAI API request failed: ${err.message}`));
    });

    req.end();
  });
};
