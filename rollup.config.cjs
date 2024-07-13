const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const compiler = require("@ampproject/rollup-plugin-closure-compiler");

module.exports = {
  input: "src/index.js",
  output: {
    name: "LangsPage",
    file: "langsPage.min.js",
    format: "umd",
  },
  plugins: [resolve(), commonjs(), compiler()],
};
