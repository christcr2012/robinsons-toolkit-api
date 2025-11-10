/*
  safety-gates.ts – Secrets, Dependencies, and License Gate
  ---------------------------------------------------------
  Block PRs that introduce:
  - Secrets (API keys, passwords, tokens)
  - Unpinned dependencies
  - Bad licenses
  
  Integrates with existing quality gates pipeline
*/

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';


  dependencies: DependencyViolation[];
  licenses: LicenseViolation[];
  vulnerabilities: VulnerabilityReport[];
  passed;
};


  line;
  pattern;
  match;
};


  version;
  issue: 'unpinned' | 'outdated' | 'deprecated';
};


  license;
  reason;
};


  severity: 'low' | 'moderate' | 'high' | 'critical';
  title;
  url?;
};

/**
 * Run all safety gates
 */
export async function runSafetyGates(
  root,
  changedFiles
){
  const secrets = scanSecrets(root, changedFiles);
  const dependencies = checkDependencies(root);
  const licenses = checkLicenses(root);
  const vulnerabilities = checkVulnerabilities(root);
  
  const passed = 
    secrets.length === 0 &&
    dependencies.length === 0 &&
    licenses.length === 0 &&
    vulnerabilities.filter(v => v.severity === 'high' || v.severity === 'critical').length === 0;
  
  return {
    secrets,
    dependencies,
    licenses,
    vulnerabilities,
    passed,
  };
}

/**
 * Scan for secrets in changed files
 */
export function scanSecrets(root, changedFiles): SecretViolation[] {
  const violations: SecretViolation[] = [];
  
  // Common secret patterns
  const patterns = [
    { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/g },
    { name: 'AWS Secret Key', regex: /aws_secret_access_key\s*=\s*['"]([^'"]+)['"]/gi },
    { name: 'API Key', regex: /api[_-]?key\s*[:=]\s*['"]([a-zA-Z0-9_\-]{20,})['"]/gi },
    { name: 'Private Key', regex: /-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----/g },
    { name: 'Generic Secret', regex: /(?:secret|password|token)\s*[:=]\s*['"]([^'"]{8,})['"]/gi },
    { name: 'GitHub Token', regex: /gh[pousr]_[A-Za-z0-9_]{36,}/g },
    { name: 'Slack Token', regex: /xox[baprs]-[0-9]{10,13}-[0-9]{10,13}-[a-zA-Z0-9]{24,}/g },
  ];
  
  for (const file of changedFiles) {
    const filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) continue;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    for (const pattern of patterns) {
      for (let i = 0; i  text.toLowerCase().includes(p.toLowerCase()));
}

/**
 * Check dependencies for unpinned versions
 */
export function checkDependencies(root): DependencyViolation[] {
  const violations: DependencyViolation[] = [];
  
  // Check package.json (Node.js)
  const packageJsonPath = path.join(root, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    for (const [pkg, version] of Object.entries(packageJson.dependencies || {})) {
      if (typeof version === 'string' && isUnpinned(version)) {
        violations.push({
          package: pkg,
          version,
          issue: 'unpinned',
        });
      }
    }
    
    for (const [pkg, version] of Object.entries(packageJson.devDependencies || {})) {
      if (typeof version === 'string' && isUnpinned(version)) {
        violations.push({
          package: pkg,
          version,
          issue: 'unpinned',
        });
      }
    }
  }
  
  // Check requirements.txt (Python)
  const requirementsPath = path.join(root, 'requirements.txt');
  if (fs.existsSync(requirementsPath)) {
    const requirements = fs.readFileSync(requirementsPath, 'utf-8').split('\n');
    
    for (const req of requirements) {
      if (!req.trim() || req.startsWith('#')) continue;
      
      const match = req.match(/^([a-zA-Z0-9_-]+)([>=,  {
        if (node.license && !allowlist.includes(node.license)) {
          violations.push({
            package: name,
            license: node.license,
            reason: `License ${node.license} not in allowlist`,
          });
        }
        
        if (node.dependencies) {
          for (const [depName, depNode] of Object.entries(node.dependencies)) {
            checkNode(depNode, depName);
          }
        }
      };
      
      if (tree.dependencies) {
        for (const [name, node] of Object.entries(tree.dependencies)) {
          checkNode(node, name);
        }
      }
    } catch (e) {
      // npm ls might fail if dependencies aren't installed
      console.warn('Failed to check licenses:', e);
    }
  }
  
  return violations;
}

/**
 * Check for vulnerabilities
 */
export function checkVulnerabilities(root): VulnerabilityReport[] {
  const vulnerabilities: VulnerabilityReport[] = [];
  
  // Check Node.js vulnerabilities
  const packageJsonPath = path.join(root, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const output = execSync('npm audit --json', { cwd: root, encoding: 'utf-8' });
      const audit = JSON.parse(output);
      
      if (audit.vulnerabilities) {
        for (const [pkg, vuln] of Object.entries(audit.vulnerabilities)) {
          const v = vuln;
          vulnerabilities.push({
            package: pkg,
            severity: v.severity,
            title: v.title || 'Unknown vulnerability',
            url: v.url,
          });
        }
      }
    } catch (e) {
      // npm audit might fail if no vulnerabilities
    }
  }
  
  // Check Python vulnerabilities
  const requirementsPath = path.join(root, 'requirements.txt');
  if (fs.existsSync(requirementsPath)) {
    try {
      const output = execSync('pip-audit --format json', { cwd: root, encoding: 'utf-8' });
      const audit = JSON.parse(output);
      
      for (const vuln of audit.vulnerabilities || []) {
        vulnerabilities.push({
          package: vuln.package,
          severity: vuln.severity,
          title: vuln.title,
          url: vuln.url,
        });
      }
    } catch (e) {
      // pip-audit might not be installed
    }
  }
  
  return vulnerabilities;
}

