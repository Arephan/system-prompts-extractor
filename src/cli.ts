#!/usr/bin/env node

import { program } from "./index.js";
import chalk from "chalk";

async function main() {
  try {
    await program.run(process.argv);
  } catch (error) {
    console.error(chalk.red("Error:"), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
