function parseResponseContent(response) {
  const contentType = response.content.mimeType;
  const text = response.content.text;

  if (contentType.includes("application/json") && text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      return null;
    }
  }
  return null;
}

module.exports = { parseResponseContent };
