
path = require("path");
var util = require('./util');
var tinylr = require('tiny-lr')();
var chokidar = require('chokidar');
var tinylrPort = 2000;
var httpPort = 3000;


var server;
var webpackConfig = require("../webpack.config");

util.exec("cross-env NODE_ENV=development webpack-dev-server --progress --profile --watch",function(){

    console.log("Server Started at: " + "http://"+webpackConfig.devServer.host+":"+webpackConfig.devServer.port);

});


function serve(){

    server = require("../src/server");


    var reloadPlugin = require('connect-livereload')({
        port: tinylrPort,
        serverPort: httpPort
    });


    tinylr.listen(tinylrPort);

    server.start(httpPort,[reloadPlugin]);




    console.log('Server running at http://localhost:' + httpPort);
}

function reload(filePath){
    tinylr.changed({
        body: {
            files: [path.resolve('./' + filePath)]
        }
    });
}

function myWatch(filePaths,cb){
    chokidar.watch(filePaths).on('change', cb);
}

