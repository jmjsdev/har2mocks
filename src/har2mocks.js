#!/usr/bin/env node

const { convertHarToMocks } = require("./convertHarToMocks");
const { cleanDirectory } = require("./cleanDirectory");

const args = process.argv.slice(2);
const options = {
  clean: false,
  cypress: false,
  msw: false,
};

const [harFilePath, outputDir] = args.filter((arg) => !arg.startsWith("--"));
const flags = args.filter((arg) => arg.startsWith("--")).map((flag) => flag.slice(2));

flags.forEach((flag) => (options[flag] = true));

if (!harFilePath || !outputDir) {
  console.error("Usage: node index.js [--clean] [--cypress] [--msw] <har_file_path> <output_directory>");
  process.exit(1);
}

if (options.clean) {
  console.log("Cleaning output directory...");
  cleanDirectory(outputDir);
}

convertHarToMocks(harFilePath, outputDir, options.cypress, options.msw);
