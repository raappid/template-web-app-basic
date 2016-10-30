

var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var projectConfig = require("../project.config");

var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
];


module.exports = function (metadata) {

    var htmlWebPackPlugin =   new HtmlWebpackPlugin({
        template: projectConfig.srcClientDirIndex,
        chunksSortMode: 'dependency',
        metadata: metadata,
        inject: 'body'
    });

    plugins.push(htmlWebPackPlugin);

    if(!metadata.isProduction)
    {
        plugins = plugins.concat([
            new webpack.SourceMapDevToolPlugin({
                filename: null, // if no value is provided the sourcemap is inlined
                test: /\.(ts|js)($|\?)/i // process .js and .ts files only
            }),
            new webpack.HotModuleReplacementPlugin()
        ]);
    }
    else
    {
        plugins.push(new ExtractTextPlugin("./assets/styles/[name].css"));
    }

    return plugins;
};
