const fs = require("fs");
const path = require("path");

function generateFileTree(dir, prefix = "") {
  const files = fs.readdirSync(dir);
  let tree = "";
  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const isDirectory = stats.isDirectory();

    tree += `${prefix}${isLast ? "└── " : "├── "}${file}\n`;

    if (isDirectory) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      tree += generateFileTree(filePath, newPrefix);
    }
  });
  return tree;
}

module.exports = { generateFileTree };
