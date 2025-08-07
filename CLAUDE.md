# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CLI tool called `@jmjs/har2mocks` that converts HAR (HTTP Archive) files to JSON mock files. It can also generate Cypress intercepts and MSW (Mock Service Worker) handlers for testing purposes.

## Commands

### Running the CLI
```bash
# Development/testing
node index.js [options] <har_file_path> <output_directory>

# As installed CLI
har2mocks [options] <har_file_path> <output_directory>
```

### Publishing
```bash
npm run publish  # Publishes to npm with public access
```

### Options
- `--clean`: Clean the output directory before generating mocks
- `--cypress`: Generate Cypress intercepts in `cypress-intercept.js`
- `--msw`: Generate MSW handlers in `msw-handlers.js`

## Architecture

### Entry Points
- `index.js`: Shebang entry point that requires the main module
- `src/har2mocks.js`: Main CLI entry point that parses arguments and orchestrates the conversion

### Core Modules
- `src/convertHarToMocks.js`: Main conversion logic that reads HAR files and generates mock files
  - Filters API paths (excludes manifest.json, robots.txt, sitemap.xml, and .json files)
  - Creates directory structure matching API paths
  - Generates JSON mock files named by HTTP method

- `src/parseResponse.js`: Parses HAR response content and handles different content types

- `src/cleanDirectory.js`: Handles cleaning the output directory when --clean flag is used

- `src/apiTable.js`: Generates formatted table output of API endpoints

- `src/fileTree.js`: Generates visual file tree representation of created mock files

- `src/generateCypressIntercepts.js`: Creates Cypress fixture intercepts

- `src/generateMSWHandlers.js`: Creates MSW v2.x handlers with proper imports

### Key Implementation Details

When processing HAR files:
1. Each API endpoint creates a directory structure matching its path
2. Response data is saved as `{METHOD}.json` in the appropriate directory
3. Duplicate API calls are deduplicated using a Set
4. Invalid paths (manifest.json, robots.txt, etc.) are filtered out

The tool generates:
- JSON mock files organized by API path
- Optional Cypress intercept file with fixture references
- Optional MSW handlers file with dynamic imports and handler definitions

## Code Style

- Uses CommonJS modules (`require`/`module.exports`)
- Prettier configured with 120 character line width
- No test framework currently configured