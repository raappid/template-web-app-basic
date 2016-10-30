

const ExtractTextPlugin = require('extract-text-webpack-plugin');
var projectConfig = require("../project.config");

var loaders = [


    { test: /\.tsx?$/,
        loader: 'awesome-typescript-loader?tsconfig=' + projectConfig.rootDir+"/tsconfig.json"
    },

    {
        test: /\.html$/,
        loader: "underscore-template-loader" // loaders: ['underscore-template-loader'] is also perfectly acceptable.
    }

];



module.exports = function (metadata) {

    if(!metadata.isProduction)
    {
        loaders.push({

            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        });

    }
    else
    {
        loaders.push({
            test: /\.scss$/,
            loaders: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader','sass-loader']})
        });

    }
    return loaders;
};