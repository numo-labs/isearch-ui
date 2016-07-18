const libContext = require.context('../lib/', true, /\.test.js$/);
libContext.keys().forEach(libContext);

const testContext = require.context('.', true, /\.test.js$/);
testContext.keys().forEach(testContext);
