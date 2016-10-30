
var util = require('./util');
var argv = require('minimist')(process.argv.slice(2));
var sass = require('node-sass');
var path = require("path");
var fs = require("fs-extra");

var cpy = require("cpy");
var distDir = path.resolve("./dist");
var tempDir = path.resolve("./temp");

if(argv._ && argv._.length > 0) //look for release build
{
    var subCommand = argv._[0].toLowerCase();
    if(subCommand === "release")
    {
        process.env.NODE_ENV = "production";
        buildRelease();
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

    var cmd = "tsc -p src/api"; // only need to build api as client code is taken care by webpack

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

function copyAssetsAndServerFiles(cb,distDir){

    cpy(["src/api/**/*",
        "!src/api/tsconfig.json",
        "!src/api/**/*.ts",
         "src/client/**/*",
        "!src/client/index.html",
        "!src/client/**/*.js",
        "!src/client/**/*.ts",
        "!src/**/*.scss"],distDir,{cwd:process.cwd(),parents: true, nodir: true}).then(function(){

        util.finishTask(cb)

    },function(err){

        util.finishTask(cb,err)
    })

}

function copyFromTempDir(dist) {
    fs.copySync(tempDir+"/src",dist);
    fs.removeSync(tempDir);
}


function buildRelease(){

    util.exec("npm run clean", function (err) {

        var distDir = path.resolve("./dist");


        util.callTasksInSeries(
            [
                {fn:buildTypescript,
                    args:[true]
                },

                {fn:bundleFiles},

                {fn:copyAssetsAndServerFiles,
                    args:[tempDir]
                }
            ]
            ,function(err){

                if(!err)
                {
                    copyFromTempDir(distDir);
                }

                util.finishTask(null,err,true);
            });

    });
}