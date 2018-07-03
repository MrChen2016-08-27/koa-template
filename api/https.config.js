const https = require('https');
const config = require('../config');

module.exports = function getOption (configs) {
    const options = {
        hostname: '',
        port: config.https.port,
        path: '',
        method: configs.method,
        key: config.https.key,
        cert: config.https.cert
    };
    return new https.Agent(options);
}