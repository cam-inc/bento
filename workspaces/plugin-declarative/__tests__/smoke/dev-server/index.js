const path = require("path");
const fs = require("fs");
const budo = require("budo");

const port = 3000;
const host = "127.0.0.1";

const run = () => {
  const targetFilePath = path.join(__dirname, "./plugins.jsx");
  const targetFileContents = fs.readFileSync(targetFilePath).toString();
  const destFilePath = path.join(__dirname, "./plugins.js");
  const compiled = require("@babel/core").transformSync(targetFileContents, {
    plugins: [["@babel/plugin-transform-react-jsx", { pragma: "h" }]],
  });
  fs.writeFileSync(destFilePath, compiled.code);
  budo(destFilePath, {
    live: true,
    stream: process.stdout,
    port,
    host,
  }).on("connect", () => {
    console.info("[INFO] Press Ctrl+c if you want to stop the server.");
  });
  process.on("SIGINT", () => {
    if (fs.existsSync(destFilePath)) {
      try {
        fs.unlinkSync(destFilePath);
        console.info("[INFO] Delete the file transpiled.");
      } catch (e) {
        console.error(e);
        process.exit(1);
      } finally {
        console.info("[INFO] Server is stopped.");
      }
    } else {
      process.exit(0);
    }
  });
};

module.exports = {
  run,
};
