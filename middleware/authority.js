const config = require('../config');
// const koaJwt = require('koa-jwt');

module.exports = function(app) {
    app.use(async (ctx, next) => {
        await apiSessionControl(ctx, next, ctx.request.path);
    });
    // token
    // app.use(koaJwt({ secret: config.jwt.secret }).unless({ path: config.apiFilter }));
}

// session验证控制权限
const apiSessionControl = async (ctx, next, path) => {
    const { session } = ctx;
    const result = config.apiFilter.find(api => api.test(path));
    if (result) {
        await next();
    } else if (session.user) {
        await next();
    } else {
        ctx.response.status = 401;
        ctx.response.body = '没有权限访问';
    }
}
