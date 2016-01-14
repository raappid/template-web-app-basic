module.exports = function(config) {
    config.set({
        basePath: '',
        autoWatch: false,
        frameworks: ['jasmine','steal-npm'],

        steal:{
          files:['src/**/*',"test/**/*.js.map","test/**/*.ts"],
          testFiles:['test/**/*.js']
        },


        browsers: ['Chrome'], // , 'Firefox'],

        reporters: ['progress', 'coverage'],
        preprocessors: { '*.js': ['coverage'] },

        singleRun: true,

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