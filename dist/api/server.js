"use strict";
var path = require("path");
var express = require('express');
var server;
var env = process.env.NODE_ENV || "development";
var staticPath = path.resolve("./");
function start(port, plugins) {
    var httpPort = port;
    if (!httpPort || httpPort === 0) {
        httpPort = 3000;
    }
    var app = express();
    if (plugins) {
        plugins.forEach(function (plugin) {
            app.use(plugin);
        });
    }
    if (env === "development") {
        app.use(express.static("./"));
        app.use(express.static("src/client"));
        app.use('/node_modules', express.static('node_modules'));
    }
    else {
        app.use(express.static("dist/client"));
    }
    server = app.listen(httpPort);
    console.log("Server started at port: " + port);
    return server;
}
exports.start = start;
function close() {
    server.close();
}
exports.close = close;
if (env !== "development") {
    start(process.env.PORT);
}
