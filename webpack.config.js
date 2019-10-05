const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  }
};
