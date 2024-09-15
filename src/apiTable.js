function printApiTable(apiList) {
  const maxLength = Math.max(...apiList.map((api) => api.path.length));

  console.log("| API" + " ".repeat(maxLength - 3) + " | Method |");
  console.log("|" + "-".repeat(maxLength + 2) + "|--------|");

  apiList.forEach((api) => {
    const padding = " ".repeat(maxLength - api.path.length);
    console.log(`| ${api.path}${padding} | ${api.method.padEnd(6)} |`);
  });
}

module.exports = { printApiTable };
