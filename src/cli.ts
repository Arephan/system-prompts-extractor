#!/usr/bin/env node

import { PromptExtractor } from './index';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

async function main() {
  const args = process.argv.slice(2);
  
  const format = (args.includes('--format') ? args[args.indexOf('--format') + 1] : 'table') as 'json' | 'table' | 'markdown';
  const shouldSave = args.includes('--save');
  const output = args.includes('--output') ? args[args.indexOf('--output') + 1] : undefined;

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
system-prompts-extractor v1.0.0
Extract system prompts from AI models

Usage: spe [options]

Options:
  --format <type>    Output format: json|table|markdown (default: table)
  --save            Save to ~/.spe/
  --output <path>   Save to specific file
  -h, --help        Show help
`);
    process.exit(0);
  }

  try {
    const extractor = new PromptExtractor();
    const result = await extractor.extract();

    // Display
    if (format === 'json') {
      console.log(JSON.stringify(result, null, 2));
    } else if (format === 'markdown') {
      console.log('# System Prompts Extraction Report');
      console.log(`**Total:** ${result.prompts.length}`);
      console.log(`**Methods:** ${result.methods.join(', ')}\n`);
      result.prompts.forEach((p, i) => {
        console.log(`## ${i+1}. ${p.model}`);
        console.log(`- Source: ${p.source}`);
        console.log(`- Confidence: ${(p.confidence * 100).toFixed(0)}%\n\`\`\`\n${p.prompt}\n\`\`\`\n`);
      });
    } else {
      console.log(`\n✅ ${result.summary}`);
      console.log(`📊 Methods: ${result.methods.join(', ')}\n`);
      result.prompts.forEach((p, i) => {
        console.log(`[${i+1}] ${p.model}`);
        console.log(`    ${p.prompt.slice(0, 80)}...\n`);
      });
    }

    // Save if requested
    if (shouldSave || output) {
      const outputDir = join(homedir(), '.spe');
      if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
      
      const filepath = output || join(outputDir, `extraction-${Date.now()}.json`);
      writeFileSync(filepath, JSON.stringify(result, null, 2));
      console.log(`\n💾 Saved to: ${filepath}`);
    }

    process.exit(result.prompts.length > 0 ? 0 : 1);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);
