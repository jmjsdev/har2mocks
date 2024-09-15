const fs = require("fs");
const path = require("path");

function generateMSWHandlers(apiList, outputDir) {
  const imports = apiList
    .map(({ path: apiPath, method }) => {
      const relativeMockPath = path.join(apiPath, `${method}.json`).replace(/^\//, "");
      const mockName = `${method.toLowerCase()}${apiPath.replace(/\W/g, "_")}Mock`;
      return `import ${mockName} from './${relativeMockPath}';`;
    })
    .join("\n");

  const handlers = apiList
    .map(({ path: apiPath, method }) => {
      const mockName = `${method.toLowerCase()}${apiPath.replace(/\W/g, "_")}Mock`;
      return `
  http.${method.toLowerCase()}('${apiPath}', () => {
    return HttpResponse.json(${mockName});
  }),`;
    })
    .join("\n");

  const mswHandlersContent = `
// This file contains handlers for Mock Service Worker (MSW) version 2.x
import { http, HttpResponse } from 'msw'

${imports}

export const handlers = [${handlers}
]
`;

  // Generate JavaScript file
  const jsOutputPath = path.join(outputDir, "msw-handlers.js");
  fs.writeFileSync(jsOutputPath, mswHandlersContent);
  console.log(`MSW handlers JavaScript file generated at: ${jsOutputPath}`);
}

module.exports = { generateMSWHandlers };
