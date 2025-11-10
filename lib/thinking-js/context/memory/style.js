import fs from 'fs/promises';
import { BehaviorMemory } from './behavior.js';
const IDENTIFIER_REGEX = /[A-Za-z_][A-Za-z0-9_-]{3,}/g;

function isCamelCase(id){
  return /^[a-z]+[A-Za-z0-9]*$/.test(id) && /[A-Z]/.test(id);
}

function isSnakeCase(id){
  return /^[a-z0-9]+(_[a-z0-9]+)+$/.test(id);
}

function isPascalCase(id){
  return /^[A-Z][A-Za-z0-9]+$/.test(id) && /[a-z]/.test(id);
}

function isKebabCase(id){
  return /^[a-z0-9]+(-[a-z0-9]+)+$/.test(id);
}

export class StyleLearner {
  constructor(private readonly behavior: BehaviorMemory) {}

  async analyze(files){
    if (!files.length) return null;

    const sampleSize = Math.min(files.length, parseInt(process.env.RCE_STYLE_SAMPLE ?? '180', 10));
    const sample = files.slice(0, sampleSize);

    const counts = { camel: 0, snake: 0, pascal: 0, kebab: 0 };
    const examples = {
      camel: new Set(),
      snake: new Set(),
      pascal: new Set(),
      kebab: new Set(),
    } as Record>;

    let singleQuotes = 0;
    let doubleQuotes = 0;
    let tabIndents = 0;
    let spaceIndents = 0;
    const indentSizes = new Map();
    let relativeImports = 0;
    let absoluteImports = 0;

    for (const file of sample) {
      try {
        const text = await fs.readFile(file, 'utf8');
        const trimmed = text.slice(0, 8000);

        const identifiers = trimmed.match(IDENTIFIER_REGEX) ?? [];
        for (const id of identifiers.slice(0, 60)) {
          if (isCamelCase(id)) {
            counts.camel++;
            if (examples.camel.size  0 && size  = [
      { key: 'camel', count: counts.camel },
      { key: 'snake', count: counts.snake },
      { key: 'pascal', count: counts.pascal },
      { key: 'kebab', count: counts.kebab },
    ].sort((a, b) => b.count - a.count);

    if (totalIdentifiers > 0 && ranking[0].count > 0) {
      namingPreference =
        ranking[0].key === 'camel'
          ? 'camelCase'
          : ranking[0].key === 'snake'
            ? 'snake_case'
            : ranking[0].key === 'pascal'
              ? 'pascalCase'
              : 'kebab-case';
      namingConfidence = ranking[0].count / totalIdentifiers;
      if (namingConfidence  spaceIndents * 1.2) {
      indentStyle = 'tabs';
    } else if (spaceIndents >= tabIndents) {
      indentStyle = spaceIndents === 0 ? 'mixed' : 'spaces';
    }

    let indentSize: number | undefined;
    if (indentStyle === 'spaces' && indentSizes.size) {
      const [size] = Array.from(indentSizes.entries()).sort((a, b) => b[1] - a[1])[0];
      indentSize = size;
    }

    let quoteStyle: StyleMemory['quoteStyle'] = 'unknown';
    if (singleQuotes === 0 && doubleQuotes === 0) {
      quoteStyle = 'unknown';
    } else if (singleQuotes > doubleQuotes * 1.1) {
      quoteStyle = 'single';
    } else if (doubleQuotes > singleQuotes * 1.1) {
      quoteStyle = 'double';
    } else {
      quoteStyle = 'mixed';
    }

    let importStyle: StyleMemory['importStyle'];
    if (relativeImports === 0 && absoluteImports === 0) {
      importStyle = undefined;
    } else if (relativeImports > absoluteImports * 1.2) {
      importStyle = 'relative';
    } else if (absoluteImports > relativeImports * 1.2) {
      importStyle = 'absolute';
    } else {
      importStyle = 'mixed';
    }

    const keywords = identifierExamples.slice(0, 6);

    const style: StyleMemory = {
      namingPreference,
      namingConfidence,
      identifierExamples,
      indentStyle,
      indentSize,
      quoteStyle,
      importStyle,
      keywords,
      updatedAt: new Date().toISOString(),
    };

    this.behavior.updateStyle(style);
    return style;
  }
}
