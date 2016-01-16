
var util = require('./util');
var argv = require('minimist')(process.argv.slice(2));
var sass = require('node-sass');
var path = require("path");
var fs = require("fs-extra");

if(argv._ && argv._.length > 0) //look release build
{
    var subCommand = argv._[0].toLowerCase();
    switch(subCommand)
    {
        case "ts":
        {
           buildTypescript();
           break;
        }
        case "sass":
        {
            buildSASS();
            break;
        }
        case "release":
        {
            buildRelease();
        }
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
        buildTypescript();
        buildSASS();
    });

}

function buildSASS(isRelease) {

    var result = sass.renderSync({
        file: path.resolve("./src/client/systems/view_system/styles/main.scss")
    });

    fs.writeFileSync(path.resolve("./src/client/systems/view_system/styles/main.css"), result.css,"utf8");
}

function buildTypescript(isRelease){

    var cmd = "tsc";

    if(isRelease)
        cmd = cmd + " -p src --outDir dist";

    util.exec(cmd, function (err) {

        if(err)
        {
            console.log(err);
            process.exit(1);
        }
    });

}

function buildRelease(){

}