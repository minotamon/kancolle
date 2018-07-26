const path = require("path")
// open: false do not open browser
module.exports = {
  mode: 'development',
  devServer: {
    contentBase: "./public",
    watchContentBase: true,
    port: 9000,
    open: false,
  },
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'public'),
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
