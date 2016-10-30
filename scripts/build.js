
var util = require('./util');
var argv = require('minimist')(process.argv.slice(2));
var sass = require('node-sass');
var path = require("path");
var fs = require("fs-extra");

var subCommand;
if(argv._ && argv._.length > 0) //look for release build
{
    subCommand = argv._[0].toLowerCase();
    if(subCommand === "release")
    {
        process.env.NODE_ENV = "production";
        buildRelease();
    }
    else if(subCommand == "typescript")
    {
        buildTypescript(function(err){
            if(err)
                process.exit(1);
            else
                process.exit(0);
        });
    }

}
else // will build both sass and typescript in the src directory
{
    util.exec("npm run clean", function (err) {

        if(err)
        {
            console.log(err);
            process.exit(1);
        }

        buildTypescript(function(err){
            util.finishTask(null,err,true);
        });

    });

}

function buildTypescript(cb,isRelease){

    var cmd = "tsc";

    if(subCommand !== "typescript")
    {
        cmd = cmd + " -p src/api"; // only need to build api as client code is taken care by webpack
    }

    if(!isRelease)
        cmd = cmd + " --sourceMap";

    util.exec(cmd, function (err) {

        util.finishTask(cb,err,true);
    });

}

function bundleFiles(cb){

    util.exec("webpack -p",function(err) {
        if(err)
            cb(err);
        else
        {
            cb();
        }
    });
}

function buildRelease(){

    util.exec("npm run clean", function (err) {

        var distDir = path.resolve("./dist");


        util.callTasksInSeries(
            [
                {fn:buildTypescript,
                    args:[true]
                },
                {fn:bundleFiles}

            ]
            ,function(err){
                util.finishTask(null,err,true);
            });

    });
}