

var util = require('./util');


util.series(["npm run build","karma --no-auto-watch start"], function(err){

    if(err)
    {
        console.log(err);
        process.exit(1);
    }

    process.exit(0);
});

