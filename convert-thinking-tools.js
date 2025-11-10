/**
 * Thinking Tools Converter
 * Converts ALL thinking tools from TypeScript MCP to JavaScript REST API
 * - Removes MCP dependencies
 * - Removes TypeScript types
 * - Keeps all logic intact
 */

const fs = require('fs');
const path = require('path');

console.log('Converting Thinking Tools to JavaScript...\n');

let totalConverted = 0;
let totalBytes = 0;

// Recursively convert all .ts files in lib/thinking
function convertDirectory(dir, outputDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(dir, entry.name);
    const relativePath = sourcePath.replace(/\\/g, '/').split('lib/thinking/')[1];
    
    if (entry.isDirectory()) {
      const newOutputDir = path.join(outputDir, entry.name);
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir, { recursive: true });
      }
      convertDirectory(sourcePath, newOutputDir);
    } else if (entry.name.endsWith('.ts')) {
      const tsContent = fs.readFileSync(sourcePath, 'utf-8');
      
      // Convert TypeScript to JavaScript
      let jsContent = tsContent
        // Remove type imports
        .replace(/import\s+type\s+\{[^}]+\}\s+from\s+['"][^'"]+['"]\s*;?\s*/g, '')
        // Remove MCP SDK imports
        .replace(/import\s+\{[^}]*\}\s+from\s+['"]@modelcontextprotocol\/sdk[^'"]*['"]\s*;?\s*/g, '')
        // Remove type annotations from function parameters
        .replace(/(\w+)\s*:\s*(string|number|boolean|any|void|Promise<[^>]+>|ServerContext|FrameworkInit|FrameworkStepInput|CallToolResult|Entry)\s*([,\)\{=])/g, '$1$3')
        // Remove return type annotations
        .replace(/\)\s*:\s*(string|number|boolean|any|void|Promise<[^>]+>|ServerContext|CallToolResult)\s*\{/g, ') {')
        // Remove 'as const'
        .replace(/\s+as\s+const/g, '')
        // Remove type assertions
        .replace(/\s+as\s+(string|number|boolean|any|ServerContext)/g, '')
        // Remove interface/type definitions
        .replace(/^(export\s+)?(interface|type)\s+\w+[^;{]*[;{][^}]*\}/gm, '')
        // Change .ts imports to .js
        .replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1.js'")
        // Remove type parameters from generics
        .replace(/<[^>]+>/g, '')
        ;
      
      const jsFileName = entry.name.replace('.ts', '.js');
      const outputPath = path.join(outputDir, jsFileName);
      
      fs.writeFileSync(outputPath, jsContent, 'utf-8');
      
      totalConverted++;
      totalBytes += jsContent.length;
      
      console.log(`✓ ${relativePath} → ${jsFileName}`);
    }
  }
}

// Convert all files
const sourceDir = path.join('lib', 'thinking');
const outputDir = path.join('lib', 'thinking-js');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

convertDirectory(sourceDir, outputDir);

console.log(`\n✅ Converted ${totalConverted} files`);
console.log(`📦 Total size: ${(totalBytes / 1024).toFixed(2)} KB`);
