// const jwt = require('jsonwebtoken');
const config = require('../config');
const Rsa = require('../tool/rsa');


exports.login = async (ctx, next) => {
    let { userName, passWord } = ctx.request.body;
    passWord = Rsa.decrypKey(ctx.session, passWord);
    // 模拟
    if (userName === 'admin' && passWord === 'admin') {
        ctx.session.user = {
            userName,
        };
        ctx.rest({
            message: '登录成功'
        });
    } else {
        throw new ctx.ApiError('user_not_exist');
    }
}

exports.getKey = async (ctx, next) => {
    Rsa.initClientKey(ctx.session);
    ctx.rest({
        key: Rsa.getKey(ctx.session)
    });
}