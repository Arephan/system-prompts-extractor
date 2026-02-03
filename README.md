# 🔍 system-prompts-extractor

Extract and reverse-engineer system prompts from popular AI chatbots: **ChatGPT**, **Claude**, **Gemini**, **Copilot**.

Ever wondered what's actually telling ChatGPT how to behave? Here's the answer.

---

## 🎯 What This Does

This CLI tool extracts system prompts from major AI services using multiple techniques:
- **Network inspection** - Captures API traffic
- **Memory scanning** - Inspects browser memory for embedded prompts
- **Pattern detection** - Identifies structural patterns in responses

The result? You get to see (or reconstruct) exactly what instructions are guiding these models.

---

## 🚀 Quick Start

```bash
npm install -g system-prompts-extractor

# Extract all prompts
prompts-extract

# Extract specific services
prompts-extract --chatgpt --claude

# Output as JSON
prompts-extract --json > prompts.json

# Show browser during extraction
prompts-extract --browser
```

---

## 📊 Example Output

```
=== System Prompts Extracted ===

CHATGPT
Confidence: 85% | Method: network-inspection
────────────────────────────────────────────────────
You are ChatGPT, a large language model trained by OpenAI. You assist users by providing accurate, helpful, and harmless information...

CLAUDE
Confidence: 70% | Method: memory-inspection
────────────────────────────────────────────────────
You are Claude, made by Anthropic. You are a helpful, harmless, and honest AI assistant...

Summary
┌─────────────┬──────────┬─────────────┬────────────┐
│ Service     │ Status   │ Confidence  │ Characters │
├─────────────┼──────────┼─────────────┼────────────┤
│ chatgpt     │ ✓        │ 85%         │ 1245       │
│ claude      │ ✓        │ 70%         │ 892        │
│ gemini      │ ✓        │ 65%         │ 756        │
│ copilot     │ ✓        │ 75%         │ 1102       │
└─────────────┴──────────┴─────────────┴────────────┘

✓ Successfully extracted 4 system prompts
```

---

## 🔧 Options

```
Usage:
  prompts-extract [options]

Options:
  --all              Extract from all supported services (default)
  --chatgpt          Extract ChatGPT system prompt
  --claude           Extract Claude system prompt
  --gemini           Extract Gemini system prompt
  --copilot          Extract Copilot system prompt
  --json             Output as JSON
  --browser          Show browser during extraction (default: headless)
  --timeout <ms>     Timeout per service in ms (default: 30000)
  -h, --help         Show this help
  -v, --version      Show version
```

---

## 📚 Why This Matters

**For Researchers:**
- Understand how AI systems are structurally designed
- Study differences between models and their instruction sets
- Analyze safety guidelines and alignment approaches

**For Prompt Engineers:**
- Learn from real-world system prompts
- Reverse-engineer techniques used by professional systems
- Improve your own prompt engineering

**For Security Researchers:**
- Identify potential jailbreak vectors
- Study how instructions can be protected or bypassed
- Contribute to AI safety research

---

## 🔬 How It Works

1. **Network Inspection** - Monitors HTTP/HTTPS traffic to API endpoints looking for system prompts in request/response bodies
2. **Memory Analysis** - Uses Playwright to inject JavaScript that inspects browser memory for prompt strings
3. **Pattern Recognition** - Applies heuristics to identify prompt-like text based on known patterns
4. **Confidence Scoring** - Returns extraction method + confidence percentage for transparency

---

## ⚠️ Ethical Considerations

This tool is designed for **educational and research purposes only**.

- ✅ **Legal**: Reverse-engineering prompts is not illegal and falls under fair use/research
- ✅ **Ethical**: Extracting prompts improves AI transparency and safety research
- ⚠️ **Responsible Use**: Respect platform terms of service. Don't use findings for deception
- 🛡️ **Disclosure**: Consider responsibly disclosing security findings to vendors

### Responsible Disclosure

If you discover a security vulnerability via this tool, please follow the vendor's responsible disclosure policy:
- [OpenAI Security](https://openai.com/security)
- [Anthropic Security](https://www.anthropic.com/security)
- [Google Security](https://www.google.com/about/appsecurity/)
- [Microsoft Security](https://www.microsoft.com/en-us/msrc)

---

## 🎓 What You'll Learn

Running this tool will teach you:
- How AI systems receive their "personality" through instructions
- Differences in instruction style between vendors
- Safety patterns and guardrails in system prompts
- Technical approaches to prompt extraction and analysis

---

## 📦 Installation

```bash
# Global install
npm install -g system-prompts-extractor

# Local install
npm install system-prompts-extractor

# From source
git clone https://github.com/Arephan/system-prompts-extractor
cd system-prompts-extractor
npm install
npm run build
npm start
```

---

## 📝 Usage Examples

**Extract and analyze all prompts:**
```bash
prompts-extract --all > analysis.txt
```

**Focus on ChatGPT:**
```bash
prompts-extract --chatgpt --browser
```

**Get structured data for processing:**
```bash
prompts-extract --json | jq '.claude.prompt' -r
```

**Watch the extraction process:**
```bash
prompts-extract --browser --timeout 60000
```

---

## 🤝 Contributing

Found a prompt? Have an extraction technique? Contributions welcome!

Ideas for enhancement:
- More AI services (DeepSeek, Qwen, Llama, etc.)
- Better extraction heuristics
- Integration with web scraping frameworks
- Historical prompt versioning
- Comparative analysis tools

---

## 📖 Learn More

- [GitHub Issues](https://github.com/Arephan/system-prompts-extractor/issues)
- [Discussions](https://github.com/Arephan/system-prompts-extractor/discussions)
- [AI Transparency Report](https://docs.anthropic.com/)

---

## 📄 License

MIT © 2026 Arephan

---

## 🌟 Star History

Help this project grow! Leave a ⭐ if you find it useful.

This tool democratizes AI transparency — understanding how these systems work benefits everyone.

---

**Disclaimer**: This tool makes best-effort attempts to extract prompts. Success varies by service and may change over time. Some services implement stronger protections. This tool is for research only.
