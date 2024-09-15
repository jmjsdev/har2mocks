const fs = require("fs");
const path = require("path");
const { parseResponseContent } = require("./parseResponse");
const { generateFileTree } = require("./fileTree");
const { printApiTable } = require("./apiTable.js");
const { generateCypressIntercepts } = require("./generateCypressIntercepts");
const { generateMSWHandlers } = require("./generateMSWHandlers");

function convertHarToMocks(harFilePath, outputDir, generateCypress, generateMSW) {
  const harData = JSON.parse(fs.readFileSync(harFilePath, "utf8"));
  const apiSet = new Set();

  harData.log.entries.forEach(({ request, response }) => {
    const { method, url } = request;
    const pathname = new URL(url).pathname;

    if (isValidApiPath(pathname)) {
      const responseContent = parseResponseContent(response);
      if (responseContent !== null) {
        const outputPath = path.join(outputDir, pathname, `${method}.json`);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, JSON.stringify(responseContent, null, 2));
        apiSet.add(JSON.stringify({ path: pathname, method }));
      }
    }
  });

  const apiList = Array.from(apiSet)
    .map(JSON.parse)
    .sort((a, b) => a.path.localeCompare(b.path) || a.method.localeCompare(b.method));

  console.log("\nAPI List:");
  printApiTable(apiList);

  console.log("\nGenerated File Tree:");
  console.log(generateFileTree(outputDir));

  if (generateCypress) generateCypressIntercepts(apiList, outputDir);
  if (generateMSW) generateMSWHandlers(apiList, outputDir);
}

function isValidApiPath(pathname) {
  const excludedFiles = ["manifest.json", "robots.txt", "sitemap.xml"];
  return !excludedFiles.some((file) => pathname.endsWith(file)) && !pathname.endsWith(".json");
}

module.exports = { convertHarToMocks };
