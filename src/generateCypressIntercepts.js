const fs = require("fs");
const path = require("path");

function generateCypressIntercepts(apiList, outputDir) {
  let interceptCode = `// Cypress intercepts for mocked APIs\n\n`;

  apiList.forEach(({ path: apiPath, method }) => {
    const fixturePath = `${apiPath}/${method}.json`.replace(/^\//, "");
    interceptCode += `cy.intercept('${method}', '${apiPath}', { fixture: '${fixturePath}' });\n`;
  });

  const cypressFilePath = path.join(outputDir, "cypress-intercept.js");
  fs.writeFileSync(cypressFilePath, interceptCode);

  console.log(`\nCypress intercept file generated: ${cypressFilePath}`);
}

module.exports = { generateCypressIntercepts };
