const path = require("path");
const fs = require("fs");
const { createServer } = require("vite");
const browserify = require("browserify");

const port = 3000;
const host = "127.0.0.1";

const run = () => {
  const targetFilePath = path.join(__dirname, "./plugins.jsx");
  const destFilePath = path.join(__dirname, "./plugins.js");
  browserify(targetFilePath)
    .transform("babelify", {
      plugins: [["@babel/plugin-transform-react-jsx", { pragma: "h" }]],
    })
    .bundle()
    .pipe(fs.createWriteStream(destFilePath));
  createServer({
    configFile: false,
    root: __dirname,
    host,
    server: { port },
  }).then((server) => {
    server.listen().then(() => {
      server.printUrls();
      console.info("[INFO] Press Ctrl+c if you want to close the server.");
    });
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
