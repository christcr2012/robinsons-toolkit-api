/**
 * Credit Optimizer Converter - COMPREHENSIVE
 * Removes ALL TypeScript syntax
 */

const fs = require('fs');
const path = require('path');

console.log('Converting Credit Optimizer files to JavaScript...\n');

let totalConverted = 0;
let totalBytes = 0;

const sourceDir = path.join('lib', 'optimizer');
const outputDir = path.join('lib', 'optimizer-js');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const sourcePath = path.join(sourceDir, file);
  let content = fs.readFileSync(sourcePath, 'utf-8');
  
  // COMPREHENSIVE conversion
  content = content
    // Remove type imports and MCP imports
    .replace(/import\s+type\s+\{[^}]+\}\s+from\s+['"][^'"]+['"]\s*;?\s*/g, '')
    .replace(/,\s*type\s+\w+/g, '')
    .replace(/\{\s*type\s+(\w+)\s*\}/g, '{ $1 }')
    .replace(/import\s+\{[^}]*\}\s+from\s+['"]@modelcontextprotocol\/sdk[^'"]*['"]\s*;?\s*/g, '')
    // Remove interface and type definitions
    .replace(/^export\s+interface\s+\w+\s*\{[\s\S]*?\n\}/gm, '')
    .replace(/^export\s+type\s+\w+\s*=[\s\S]*?;/gm, '')
    .replace(/^interface\s+\w+\s*\{[\s\S]*?\n\}/gm, '')
    .replace(/^type\s+\w+\s*=[\s\S]*?;/gm, '')
    // Remove access modifiers
    .replace(/\b(private|public|protected|readonly)\s+/g, '')
    // Remove type annotations
    .replace(/:\s*\w+\[\]/g, '')
    .replace(/:\s*Map<[^>]+>/g, '')
    .replace(/:\s*Promise<[^>]+>/g, '')
    .replace(/:\s*Array<[^>]+>/g, '')
    .replace(/:\s*(string|number|boolean|any|void|unknown|Error|null|undefined)\s*([,;=\)\{])/g, '$2')
    .replace(/\)\s*:\s*\w+\s*\{/g, ') {')
    .replace(/\)\s*:\s*Promise<[^>]+>\s*\{/g, ') {')
    // Remove optional property syntax
    .replace(/(\w+)\?:/g, '$1:')
    .replace(/\?:/g, ':')
    // Remove type assertions
    .replace(/\s+as\s+const/g, '')
    .replace(/\s+as\s+\w+/g, '')
    .replace(/\((\w+)\s+as\s+\w+\)/g, '$1')
    // Remove generics
    .replace(/<[^>]+>/g, '')
    // Fix imports
    .replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1.js'")
    // Clean up empty lines
    .replace(/\n\n\n+/g, '\n\n');
  
  const jsFileName = file.replace('.ts', '.js');
  const outputPath = path.join(outputDir, jsFileName);
  
  fs.writeFileSync(outputPath, content, 'utf-8');
  
  totalConverted++;
  totalBytes += content.length;
  
  console.log(`✓ ${file} → ${jsFileName}`);
}

console.log(`\n✅ Converted ${totalConverted} files`);
console.log(`📦 Total size: ${(totalBytes / 1024).toFixed(2)} KB`);
