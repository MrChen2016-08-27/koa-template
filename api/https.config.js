const https = require('https');

module.exports = function getOption (config) {
    const options = {
        hostname: '',
        port: 443,
        path: '',
        method: config.method,
        key: '',
        cert: ''
    };
    return new https.Agent(options);
}