


module.exports = function (options) {

    var testConfig = Object.assign({},require("./dev.config")(options));

    delete testConfig.entry;

    return testConfig;
};