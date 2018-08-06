const testApi  = require('../api/test');

exports.testHttps = async (ctx, next) => {
    const res = await testApi.testHttps();
    ctx.rest(res);
};


exports.testPage = async (ctx, next) => {
    await ctx.render('test', {
        title: 'hello world'
    });
}