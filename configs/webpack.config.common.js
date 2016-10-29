

// Look in ./config folder for webpack.dev.js
var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry:{
    'main': [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
      'webpack/hot/dev-server',
      "./src/client/main.ts"
    ]
  },
  output: {

    path: path.resolve("./dist/client"),

    filename: '[name].js',

    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: [ '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modules: [
      "src",
      "node_modules"
    ]
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
      },
      { test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },

      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};