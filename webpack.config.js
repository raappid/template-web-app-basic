

var projectConfig = require("./project.config");

var METADATA = {
  env:process.env.NODE_ENV,
  isProduction:process.env.NODE_ENV == 'production',
  isTest:process.env.NODE_ENV == 'test',
};

const loaders = require("./webpack/loaders")(METADATA);
const plugins = require("./webpack/plugins")(METADATA);

var devEntries = [  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
  'webpack/hot/dev-server'
];

var entry = {
  'main': [
    projectConfig.srcClientDirMain
  ]
};

if(!METADATA.isTest)
{
  entry.main = entry.main.concat([
    projectConfig.srcClientDirIndex,
    projectConfig.srcClientDirMainCSS
  ])
}

var output = {
  path: projectConfig.distClientDir,
  filename: '[name].js'
};

var resolve = {
  extensions: [ '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  modules: [
    "src",
    "node_modules"
  ]
};

var node = {
  global: true,
  crypto: 'empty',
  process: true,
  module: false,
  clearImmediate: false,
  setImmediate: false
};


if(!METADATA.isProduction)
{

  output.sourceMapFilename = '[name].map';

  //adding dev entries
  for(var key in entry)
  {
    entry[key] = entry[key].concat(devEntries)
  }

}


module.exports = {
  entry:entry,
  output: output,
  resolve: resolve,
  module: {
    loaders: loaders
  },
  plugins: plugins,
  node: node
};