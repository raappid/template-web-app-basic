
var path = require("path");

const config = {};

var rootDir = path.resolve("./");

var srcDir = rootDir + "/src";
var distDir = rootDir + "/dist";

var clientDir = "client";
var apiDir = "api";

config.rootDir = rootDir;
config.distDir = distDir;

config.srcDir = srcDir;
config.srcClientDir = srcDir + '/' + clientDir;
config.srcClientDirMain = srcDir + '/' + clientDir + "/main.ts";
config.srcClientDirIndex = srcDir + '/' + clientDir + "/index.html";
config.srcApiDir = srcDir + '/' + apiDir;

config.distClientDir = distDir + '/' + clientDir;
config.distClientDirMain = distDir + '/' + clientDir + "/main.js";
config.distClientDirIndex = distDir + '/' + clientDir + "/index.html";
config.distApiDir = distDir + '/' + apiDir;

module.exports = config;