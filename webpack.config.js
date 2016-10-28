

// Look in ./config folder for webpack.dev.js
var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
module.exports = {
  entry: {

    'main': './src/client/main.ts'

  },
  output: {

    path: path.resolve("./dist"),

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
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
    ]
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    })
  ],
  devServer: {
    port: PORT,
    host: HOST
  },
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};