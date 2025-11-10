/**
 * Agent Converter - COMPREHENSIVE
 * Removes ALL TypeScript syntax including private/public/protected keywords
 */

const fs = require('fs');
const path = require('path');

console.log('Converting Agent files to JavaScript (comprehensive)...\n');

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
      let content = fs.readFileSync(sourcePath, 'utf-8');
      
      // COMPREHENSIVE multi-pass conversion
      
      // Pass 1: Remove type-only imports and MCP imports
      content = content
        .replace(/import\s+type\s+\{[^}]+\}\s+from\s+['"][^'"]+['"]\s*;?\s*/g, '')
        .replace(/,\s*type\s+\w+/g, '')
        .replace(/\{\s*type\s+(\w+)\s*\}/g, '{ $1 }')
        .replace(/import\s+\{[^}]*\}\s+from\s+['"]@modelcontextprotocol\/sdk[^'"]*['"]\s*;?\s*/g, '');
      
      // Pass 2: Remove interface and type definitions (multi-line aware)
      content = content
        .replace(/^export\s+interface\s+\w+\s*\{[\s\S]*?\n\}/gm, '')
        .replace(/^export\s+type\s+\w+\s*=[\s\S]*?;/gm, '')
        .replace(/^interface\s+\w+\s*\{[\s\S]*?\n\}/gm, '')
        .replace(/^type\s+\w+\s*=[\s\S]*?;/gm, '');
      
      // Pass 3: Remove access modifiers
      content = content
        .replace(/\b(private|public|protected|readonly)\s+/g, '');
      
      // Pass 4: Remove type annotations (comprehensive)
      content = content
        // Array types
        .replace(/:\s*\w+\[\]/g, '')
        // Generic types
        .replace(/:\s*Map<[^>]+>/g, '')
        .replace(/:\s*Promise<[^>]+>/g, '')
        .replace(/:\s*Array<[^>]+>/g, '')
        // Simple types
        .replace(/:\s*(string|number|boolean|any|void|unknown|Error|null|undefined)\s*([,;=\)\{])/g, '$2')
        // Custom types (common ones)
        .replace(/:\s*(OllamaClient|PromptBuilder|GenerateRequest|GenerateResult|GenerateOptions|ModelConfig|ValidationResult|PipelineResult|OutputFile|ModelSelectionCriteria)\s*([,;=\)\{])/g, '$2')
        // Return types
        .replace(/\)\s*:\s*\w+\s*\{/g, ') {')
        .replace(/\)\s*:\s*Promise<[^>]+>\s*\{/g, ') {');
      
      // Pass 5: Remove optional property syntax
      content = content
        .replace(/(\w+)\?:/g, '$1:')
        .replace(/\?:/g, ':');
      
      // Pass 6: Remove type assertions
      content = content
        .replace(/\s+as\s+const/g, '')
        .replace(/\s+as\s+\w+/g, '')
        .replace(/\((\w+)\s+as\s+\w+\)/g, '$1');
      
      // Pass 7: Remove all remaining generics
      content = content
        .replace(/<[^>]+>/g, '');
      
      // Pass 8: Fix imports
      content = content
        .replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1.js'");
      
      // Pass 9: Clean up empty lines (more than 2 consecutive)
      content = content.replace(/\n\n\n+/g, '\n\n');
      
      const jsFileName = entry.name.replace('.ts', '.js');
      const outputPath = path.join(outputDir, jsFileName);
      
      fs.writeFileSync(outputPath, content, 'utf-8');
      
      totalConverted++;
      totalBytes += content.length;
      
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
