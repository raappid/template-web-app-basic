Error.stackTraceLimit = Infinity;


var appContext = require.context('./tests', true, /\.spec\.tsx?$|.test\.tsx?$/);

appContext.keys().forEach(appContext);
