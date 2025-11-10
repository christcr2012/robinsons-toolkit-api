/**
 * Agent Converter - IMPROVED
 * Removes ALL TypeScript syntax including optional properties and type imports
 */

const fs = require('fs');
const path = require('path');

console.log('Converting Agent files to JavaScript (improved)...\n');

let totalConverted = 0;
let totalBytes = 0;

function convertDirectory(dir, outputDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(dir, entry.name);
    const relativePath = sourcePath.replace(/\\/g, '/').split('lib/agents/')[1];
    
    if (entry.isDirectory()) {
      const newOutputDir = path.join(outputDir, entry.name);
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir, { recursive: true });
      }
      convertDirectory(sourcePath, newOutputDir);
    } else if (entry.name.endsWith('.ts')) {
      let tsContent = fs.readFileSync(sourcePath, 'utf-8');
      
      // Multi-pass conversion for thorough type removal
      let jsContent = tsContent;
      
      // Pass 1: Remove type-only imports
      jsContent = jsContent
        .replace(/import\s+type\s+\{[^}]+\}\s+from\s+['"][^'"]+['"]\s*;?\s*/g, '')
        .replace(/,\s*type\s+\w+/g, '') // Remove 'type X' from import lists
        .replace(/\{\s*type\s+(\w+)\s*\}/g, '{ $1 }') // Remove 'type' keyword from imports
        .replace(/import\s+\{[^}]*\}\s+from\s+['"]@modelcontextprotocol\/sdk[^'"]*['"]\s*;?\s*/g, '');
      
      // Pass 2: Remove interface and type definitions
      jsContent = jsContent
        .replace(/^export\s+interface\s+\w+\s*\{[^}]*\}/gm, '')
        .replace(/^export\s+type\s+\w+\s*=[^;]+;/gm, '')
        .replace(/^interface\s+\w+\s*\{[^}]*\}/gm, '')
        .replace(/^type\s+\w+\s*=[^;]+;/gm, '');
      
      // Pass 3: Remove type annotations from variables and parameters
      jsContent = jsContent
        .replace(/:\s*any\[\]/g, '')
        .replace(/:\s*(string|number|boolean|any|void|unknown|Error)\[\]/g, '')
        .replace(/:\s*(string|number|boolean|any|void|Promise<[^>]+>|OllamaClient|PromptBuilder|GenerateRequest|GenerateResult|GenerateOptions|ModelConfig|ValidationResult|PipelineResult|OutputFile|ModelSelectionCriteria)\s*([,;=\)\{])/g, '$2')
        .replace(/(\w+)\s*:\s*(string|number|boolean|any|void|Promise<[^>]+>)\s*([,\)\{=])/g, '$1$3')
        .replace(/\)\s*:\s*(string|number|boolean|any|void|Promise<[^>]+>|ValidationResult|PipelineResult|GenerateResult)\s*\{/g, ') {');
      
      // Pass 4: Remove optional property syntax
      jsContent = jsContent
        .replace(/(\w+)\?:/g, '$1:') // Remove ? from optional properties
        .replace(/\?:/g, ':'); // Remove standalone ?:
      
      // Pass 5: Remove type assertions
      jsContent = jsContent
        .replace(/\s+as\s+const/g, '')
        .replace(/\s+as\s+(string|number|boolean|any|Error|unknown)/g, '')
        .replace(/\((\w+)\s+as\s+(string|number|boolean|any|Error|unknown)\)/g, '$1');
      
      // Pass 6: Remove generics
      jsContent = jsContent
        .replace(/<[^>]+>/g, '');
      
      // Pass 7: Fix imports
      jsContent = jsContent
        .replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1.js'");
      
      const jsFileName = entry.name.replace('.ts', '.js');
      const outputPath = path.join(outputDir, jsFileName);
      
      fs.writeFileSync(outputPath, jsContent, 'utf-8');
      
      totalConverted++;
      totalBytes += jsContent.length;
      
      console.log(`✓ ${relativePath} → ${jsFileName}`);
    }
  }
}

const sourceDir = path.join('lib', 'agents');
const outputDir = path.join('lib', 'agents-js');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

convertDirectory(sourceDir, outputDir);

console.log(`\n✅ Converted ${totalConverted} files`);
console.log(`📦 Total size: ${(totalBytes / 1024).toFixed(2)} KB`);
