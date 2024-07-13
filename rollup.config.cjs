const json = require("@rollup/plugin-json");
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const compiler = require("@ampproject/rollup-plugin-closure-compiler");

module.exports = {
  input: "src/index.js",
  output: {
    name: "LangsPage",
    file: "langsPage.min.js",
    format: "umd",
    exports: "named",
    globals: {
      util: "util",
      stream: "stream",
      path: "path",
      http: "http",
      https: "https",
      url: "url",
      assert: "assert",
      tty: "tty",
      os: "os",
      zlib: "zlib",
      events: "events",
      fs: "fs",
    },
  },
  plugins: [
    commonjs(),
    compiler(),
    json(),
    nodeResolve({
      preferBuiltins: true,
      browser: true,
    }),
  ],
  external: [
    "http",
    "https",
    "url",
    "assert",
    "stream",
    "zlib",
    "util",
    "events",
    "path",
    "fs",
  ],
};
