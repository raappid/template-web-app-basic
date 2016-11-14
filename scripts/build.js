
var util = require('./util');
var sass = require('node-sass');
var path = require("path");
var fs = require("fs-extra");
var projectConfig = require("../project.config");


util.exec("npm run clean", function (err) {

    if(err)
    {
        console.log(err);
        process.exit(1);
    }

    var tasks;

    if(process.env.NODE_ENV === "production")
    {
        tasks = [
            {fn:buildTypescript,
                args:[true]
            },
            {fn:bundleFiles}

        ]
    }
    else if(process.env.NODE_ENV === "build-all") // will build all typescript and sass files
    {

        tasks = [
            {fn:buildTypescript,args:[false,true]},
            {fn:buildSASS}
        ];
    }
    else
    {
        tasks = [
            {fn:buildTypescript}
        ];

    }

    util.callTasksInSeries(tasks,function(err){

        util.finishTask(null,err,true);
    })

});

function buildSASS(cb) {

    var mainSassFilePath = projectConfig.srcClientDir+"/assets/styles/main.scss";
    var outFilePath = projectConfig.srcClientDir+"/assets/styles/main.css";

    sass.render({
        file: mainSassFilePath
    },function(error, result){

        if(!error)
        {
            fs.writeFile(outFilePath,result.css,"utf8",function(err){

                util.finishTask(cb,err,true);

            });
        }
        else
        {
            util.finishTask(cb,error,true);
        }

    });

}

function buildTypescript(cb,isRelease,buildAll){

    var cmd = "tsc";

    if(!buildAll)
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
