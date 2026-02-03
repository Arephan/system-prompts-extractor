import chalk from "chalk";
import Table from "cli-table3";
import ora from "ora";
import { extractSystemPrompts } from "./extractor.js";
import { parseArgs } from "./args.js";

export async function run(args: string[]) {
  const parsed = parseArgs(args.slice(2));

  if (parsed.help) {
    printHelp();
    return;
  }

  if (parsed.version) {
    console.log("system-prompts-extractor v1.0.0");
    return;
  }

  const spinner = ora("Extracting system prompts...").start();

  try {
    const results = await extractSystemPrompts({
      chatgpt: parsed.chatgpt,
      claude: parsed.claude,
      gemini: parsed.gemini,
      copilot: parsed.copilot,
      all: parsed.all,
      headless: !parsed.browser,
      timeout: parsed.timeout,
    });

    spinner.succeed("Extraction complete!");

    if (parsed.json) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }

    displayResults(results);
  } catch (error) {
    spinner.fail(chalk.red("Extraction failed"));
    throw error;
  }
}

function displayResults(results: any) {
  console.log("\n" + chalk.bold.cyan("=== System Prompts Extracted ===\n"));

  for (const [service, data] of Object.entries(results)) {
    if (!data || !(data as any).success) continue;

    const prompt = (data as any).prompt || "Not found";
    const confidence = ((data as any).confidence || 0).toFixed(2);
    const method = (data as any).method || "unknown";

    console.log(chalk.bold.yellow(`\n${service.toUpperCase()}`));
    console.log(chalk.gray(`Confidence: ${confidence}% | Method: ${method}`));
    console.log(chalk.gray("─".repeat(60)));

    // Truncate long prompts for display
    const displayPrompt = prompt.length > 400 ? prompt.substring(0, 400) + "..." : prompt;
    console.log(displayPrompt);
    console.log();
  }

  // Summary table
  const table = new Table({
    head: [
      chalk.cyan("Service"),
      chalk.cyan("Status"),
      chalk.cyan("Confidence"),
      chalk.cyan("Characters"),
    ],
    style: { head: [], border: ["cyan"] },
    colWidths: [15, 12, 12, 15],
  });

  for (const [service, data] of Object.entries(results)) {
    const status = (data as any).success ? chalk.green("✓") : chalk.red("✗");
    const confidence = ((data as any).confidence || 0).toFixed(0) + "%";
    const length = ((data as any).prompt || "").length;

    table.push([service, status, confidence, length.toString()]);
  }

  console.log("\n" + chalk.bold.cyan("Summary"));
  console.log(table.toString());

  const totalSuccess = Object.values(results).filter((r: any) => r.success).length;
  console.log(
    chalk.green(`\n✓ Successfully extracted ${totalSuccess} system prompts`)
  );
}

function printHelp() {
  console.log(`
${chalk.bold("system-prompts-extractor")} - Reverse-engineer AI system prompts

${chalk.bold("Usage:")}
  prompts-extract [options]

${chalk.bold("Options:")}
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

${chalk.bold("Examples:")}
  $ prompts-extract --all                    # Extract all prompts
  $ prompts-extract --chatgpt --claude       # Extract ChatGPT and Claude
  $ prompts-extract --json > prompts.json    # Save as JSON
  $ prompts-extract --browser --timeout 60000 # Show browser, longer timeout

${chalk.bold("Ethical Note:")}
  This tool is for educational and research purposes. It helps understand how AI
  systems are constructed. Always respect the terms of service of each platform.

${chalk.bold("Disclaimer:")}
  System prompts may change. Some extractions may fail or be incomplete.
  Use for analysis and learning only.
`);
}

export const program = { run };
