const testApi  = require('../api/test');

exports.testHttps = async (ctx, next) => {
    const res = await testApi.testHttps();
    ctx.rest(res);
};


exports.testPage = async (ctx, next) => {
    await ctx.render('test', {
        title: '测试'
    });
}

exports.testRoleList = async (ctx, next) => {
    const list = [
        {
            id: '1',
            name: '超级管理员',
        },
        {
            id: '2',
            name: '管理员',
        },
    ];
    ctx.rest({
        list
    });
}