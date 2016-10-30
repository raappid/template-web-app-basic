

const ExtractTextPlugin = require('extract-text-webpack-plugin');

var loaders = [

    /*  {
     test: /\.html$/,
     loader: "html" // loaders: ['html] is also perfectly acceptable.
     },*/

    { test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
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