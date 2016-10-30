
module.exports = function(config) {
    config.set({
        basePath: '',
        autoWatch: true,

        singleRun: false,
        frameworks: ['jasmine'],

        files:['test/**/*.spec.ts','test/**/*.test.ts'],

        reporters: ['coverage','mocha','kjhtml'],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage'],
            'test/**/*.ts': ['webpack','sourcemap'],
            'test/**/*.tsx': ['webpack','sourcemap']
        },

        webpack: require("./webpack.config"),

        coverageReporter: {
            dir : 'coverage/',
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcovonly', subdir: 'lcov' },
                { type: 'cobertura', subdir: 'cobertura' }
            ]
        }
    });
};