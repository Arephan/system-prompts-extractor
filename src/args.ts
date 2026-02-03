interface ParsedArgs {
  chatgpt?: boolean;
  claude?: boolean;
  gemini?: boolean;
  copilot?: boolean;
  all?: boolean;
  json?: boolean;
  browser?: boolean;
  timeout?: number;
  help?: boolean;
  version?: boolean;
}

export function parseArgs(args: string[]): ParsedArgs {
  const result: ParsedArgs = {
    all: true,
    browser: false,
    timeout: 30000,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--help" || arg === "-h") {
      result.help = true;
    } else if (arg === "--version" || arg === "-v") {
      result.version = true;
    } else if (arg === "--json") {
      result.json = true;
    } else if (arg === "--browser") {
      result.browser = true;
    } else if (arg === "--all") {
      result.all = true;
      result.chatgpt = result.claude = result.gemini = result.copilot = false;
    } else if (arg === "--chatgpt") {
      result.all = false;
      result.chatgpt = true;
    } else if (arg === "--claude") {
      result.all = false;
      result.claude = true;
    } else if (arg === "--gemini") {
      result.all = false;
      result.gemini = true;
    } else if (arg === "--copilot") {
      result.all = false;
      result.copilot = true;
    } else if (arg === "--timeout") {
      result.timeout = parseInt(args[++i], 10);
    }
  }

  return result;
}
