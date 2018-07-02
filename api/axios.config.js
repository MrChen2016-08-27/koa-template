const axios = require('axios');
const config = require('../config');
const ApiError = require('../config/ApiError');
const store = require('../tool/redis');

const instance = axios.create({
    baseURL: config.api.baseUrl,
    timeout: 60000,
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (e) {
    console.log(e);
    throw new ApiError(e.response.data.code, e.response.data.message);
});

module.exports = instance;
