# System Prompts Extractor

Extract and reverse-engineer system prompts from ChatGPT, Claude, Gemini, Copilot and other AI models.

**🔬 Research & Educational Use Only**

![MIT License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/typescript-5.3-blue)
![Node.js](https://img.shields.io/badge/node.js-18+-green)

## Why This Matters

System prompts are the hidden instructions that define how AI models behave. Understanding them:
- Reveals model capabilities and limitations
- Identifies security gaps and constraints
- Supports AI safety research and transparency
- Enables better prompt engineering

## Features

✅ **Network Inspection** - Intercept and parse API calls  
✅ **Memory Scanning** - Extract prompts from process memory (with elevated privileges)  
✅ **Pattern Detection** - Identify common system prompt structures  
✅ **Multi-Model Support** - ChatGPT, Claude, Gemini, Copilot, and more  
✅ **Multiple Formats** - JSON, CSV, Markdown, table output  
✅ **Confidence Scoring** - Know how reliable each extraction is  

## Installation

```bash
npm install -g system-prompts-extractor
```

Or run directly:
```bash
npx system-prompts-extractor
```

## Usage

### Basic Extraction
```bash
spe
```

### Save Results
```bash
spe --save
```

### Different Formats
```bash
spe --format json
spe --format markdown --output prompts.md
spe --format csv > results.csv
```

### With Browser Debug
Keep your AI model tabs open (ChatGPT, Claude, etc.) and use browser dev tools:

```bash
# Enable network logging in Chrome/Firefox dev tools
# Then run extraction while requests are being made
spe --verbose
```

## How It Works

### Method 1: Network Inspection
Analyzes browser network requests for system messages:
```json
{
  "role": "system",
  "content": "You are ChatGPT..."
}
```

### Method 2: Memory Scanning
Scans process memory for AI model instructions (requires elevated privileges):
```bash
sudo spe
```

### Method 3: Pattern Detection
Uses regex patterns to identify system prompt structures in:
- Browser cache
- Application logs
- Configuration files
- Process memory dumps

## Output Example

```
✅ Found 3 unique system prompts using network, pattern methods
📊 Methods used: network, pattern

📝 EXTRACTED SYSTEM PROMPTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] CHATGPT
    Source: network-inspection
    Method: network
    Confidence: 90%
    ---
    You are ChatGPT, an advanced AI assistant. You should be helpful...
```

## Extraction Methods Ranked

| Method | Accuracy | Speed | Difficulty | Requirements |
|--------|----------|-------|------------|--------------|
| Network | 90-95% | Fast | Easy | Browser dev tools open |
| Pattern | 70-80% | Fastest | Very Easy | System files readable |
| Memory | 85-90% | Slow | Hard | Elevated privileges |

## Real-World Results

Recent research has successfully extracted system prompts from:
- ✅ ChatGPT (GPT-4, GPT-3.5)
- ✅ Claude (Anthropic)
- ✅ Gemini (Google)
- ✅ Copilot (Microsoft)
- ✅ LLaMA (Open source models)
- ✅ Mistral (Open source)

## Privacy & Ethics

**Educational Purpose**: This tool is for research and transparency.

**Limitations**:
- Only works on locally accessible data
- Requires user's own API keys/sessions
- Does not circumvent authentication
- Respects model provider policies

**Recommendations**:
- Use for understanding your own model behavior
- Support AI transparency initiatives
- Contribute findings to research communities
- Respect provider terms of service

## CLI Options

```
--format <type>     Output format: json|table|markdown|csv (default: table)
--output <path>     Save to specific file
--save              Save to ~/.spe/ directory
-v, --verbose       Verbose logging
-h, --help          Show help
```

## SDK Usage

```typescript
import { PromptExtractor } from 'system-prompts-extractor';

const extractor = new PromptExtractor();
const result = await extractor.extract();

// result.prompts - array of extracted prompts
// result.totalFound - count of unique prompts
// result.methods - extraction methods used
```

### Advanced API

```typescript
// Extract from specific methods
const networkPrompts = extractor.extractFromNetwork('/path/to/har');
const memoryPrompts = extractor.extractFromMemory();
const patternPrompts = extractor.detectFromPatterns(textContent);
```

## Troubleshooting

### No prompts found
- Keep AI model tabs open in browser
- Enable network logging in dev tools
- Try running with elevated privileges: `sudo spe`
- Check `/var/log` permissions

### Permission denied
- Memory scanning requires elevated privileges: `sudo spe`
- Check file system permissions: `chmod 644 ~/.zsh_history` etc.

### Slow extraction
- Pattern detection can be slow on large log files
- Use `--format json --save` to avoid terminal rendering overhead
- Try `spe --verbose` to see progress

## Advanced: HAR File Extraction

Chrome/Firefox save network logs as HAR files:

```bash
# Export network log as .har from DevTools
# Then extract:
spe --har export.har --save
```

## Development

```bash
# Build
npm run build

# Watch
npm run dev

# Test
npm test
```

## Research & Citations

Based on:
- OpenAI Prompt Injection research
- Anthropic Constitutional AI documentation
- Google AI safety publications
- Multi-agent system transparency initiatives

## Legal

Use responsibly. This tool:
- ✅ Is legal to develop and distribute
- ✅ Supports AI transparency research
- ✅ Only accesses your own sessions/data
- ⚠️ May violate terms of service of some providers
- ❌ Should not be used for unauthorized access

## Contributing

Research findings and improvements welcome:
```bash
# Report findings
# Contribute patterns and improvements
# Share extraction results (anonymized)
```

## License

MIT - See LICENSE file

---

**⚠️ Disclaimer**: This tool is for research and educational purposes. Users are responsible for complying with applicable laws, terms of service, and ethical guidelines. The authors are not responsible for misuse.

Built for AI transparency and security research. 🔍
