const axios = require('./axios.config');
const config = require('../config');
const store = require('../tool/redis');

// 获取第三方token
exports.getToken = async () => {
    return axios.get(config.api.baseUrl2 + 'login', {
        params: {

        }
    });

}