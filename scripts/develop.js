

var util = require('./util');
var gaze = require('gaze');
var connect = require('connect');
var serveStatic = require('serve-static');
var http = require('http');
var path = require('path');
var tinylr = require('tiny-lr')();
var chokidar = require('chokidar');
var tinylrPort = 2000;
var httpPort = 3000;
var app;

util.exec("npm run build",function(){

    serve();

    //watch for html file changes
    myWatch(["**/*.html"],reload);
});


function serve(){

    app = connect();

    app.use(require('connect-livereload')({
        port: tinylrPort,
        serverPort: httpPort
    }));

    app.use(serveStatic(path.resolve("./")));

    tinylr.listen(tinylrPort);
    http.createServer(app).listen(httpPort);

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
    console.log(filePaths);
    chokidar.watch(filePaths).on('change', cb);
}

process.on("exit",function(){
    http.close();
});