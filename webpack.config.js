const path = require("path")
module.exports = {
  mode: 'development',
  devServer: {
    contentBase: "./target",
    watchContentBase: true,
    port: 9000,
    open: true,
  },
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'target'),
    filename: "bundle.js",
  },
  resolve: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
}
