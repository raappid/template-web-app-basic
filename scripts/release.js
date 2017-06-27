
const util = require('./util');

if(process.env.RELEASE_TYPE) //look release build
{

    let cmd = "npm version " + process.env.RELEASE_TYPE;

    util.series([

        "npm test",

        ["git fetch","fetch all branches"],

        ["git checkout master","checked out master branch"],

        ["git checkout production","checked out production branch"],
        ["git merge --no-ff --no-edit production master", "merging from Master"],

        [cmd,"increasing version number and tagging"],

        "git push -u --follow-tags",

        ['git checkout master',"checked out master branch.."],

        "git merge --no-ff --no-edit master production",

        "git push",

        ['git branch -D production',"production branch deleted..release Done!!"]

    ],function(err){
        if(err)
        {
            console.log(err);
            process.exit(1);
        }

        process.exit(0);
    });

}
else
{
    console.log("\n Cannot Recognize the type of release");

    process.exit(1);
}