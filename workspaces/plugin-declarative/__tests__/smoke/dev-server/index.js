const path = require("path");
const fs = require("fs");
const budo = require("budo");
const { Blob } = require("node:buffer");

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
  })
    .on("connect", () => {
      console.log(`Listening on http://${host}:${port}`);
    })
    .on("exit", () => {
      fs.unlinkSync(destFilePath);
    });
};

module.exports = {
  run,
};
