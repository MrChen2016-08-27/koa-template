const testApi  = require('../api/test');

exports.testHttps = async (ctx, next) => {
    const res = await testApi.testHttps();
    ctx.rest(res);
};