

const ExtractTextPlugin = require('extract-text-webpack-plugin');

var loaders = [


    { test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
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