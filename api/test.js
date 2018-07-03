const axios = require('./axios.config');
const crypto = require('crypto');
const httpsConfig = require('./https.config');

exports.testHttps = async () => {
    const content = '';
    const sign = crypto.createHash('md5').update(content).digest("hex");

    return axios({
        method: 'GET',
        url: '',
        headers: {
            sign
        },
        httpsAgent: httpsConfig({ method: 'GET' }),
        params: {
            qtype: 1,
            kw: '测试',
            page: 1,
            pageSize: 20,
        }
    });
}