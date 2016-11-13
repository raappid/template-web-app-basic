
var util = require('./util');

util.exec("npm run build-release",function(error){


    if(error)
    {
        console.log(error);
        process.exit(1)
    }
    else
    {
        if(process.env.NODE_ENV === "CI")
        {
            util.exec("firebase deploy --token $FIREBASE_TOKEN",function(error){

                if(error)
                {
                    console.log(error);
                    process.exit(1)
                }

                process.exit(0);
            })
        }
        else
        {
            process.exit(0);
        }

    }
});

