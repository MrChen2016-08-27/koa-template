// const jwt = require('jsonwebtoken');
const config = require('../config');
const Rsa = require('../tool/rsa');
const userApi = require('../api/user');
const { appRouter } = require("./role/menus");

function filterAuthMenus (authObj, list) {
    let results = [];
    for (let i in authObj) {
        let nowObj = list.find(item => item.id == i);
        if ((typeof authObj[i] == "object") && authObj[i] != null) {
            nowObj.children = filterAuthMenus(authObj[i], nowObj.children);
            if (nowObj.children.length > 0) {
                results.push(nowObj);
            }
        } else if (authObj[i] == 1) {
            results.push(nowObj);
        }
    }
    return results;
}

exports.addAdmin = async (ctx, next) => {
    var user = {};
    user.username = "admin";
    user.password = "111111";
    user.orgId = -1;
    user.type = 0;
    user.parentId = 0;
    user.roleIdList = [1];
    const res = await userApi.addUser(user);
    ctx.rest(res.data);
}

exports.login = async (ctx, next) => {
    let { username, password } = ctx.request.body;
    password = Rsa.decrypKey(ctx.session, password);
    const res = await userApi.login({username, password});
    ctx.session.user = {
        username
    };
    ctx.rest(res.data);
    // 模拟
    // if (userName === 'admin' && passWord === 'admin') {
    //     ctx.session.user = {
    //         userName,
    //     };
    //     ctx.rest({
    //         message: '登录成功'
    //     });
    // } else {
    //     throw new ctx.ApiError('user_not_exist');
    // }
}


exports.addUser = async (ctx, next) => {
    const params = ctx.request.body;
    const res = await userApi.addUser(params);
    ctx.rest(res.data);
}

exports.getKey = async (ctx, next) => {
    Rsa.initClientKey(ctx.session);
    ctx.rest({
        key: Rsa.getKey(ctx.session)
    });
}

exports.getUserList = async (ctx, next) => {
    const { pageNumber, pageSize } = ctx.request.query;
    const res = await userApi.getUserList({ pageNumber, pageSize });
    ctx.rest(res.data);
}

exports.getUserSession = async (ctx, next) => {
    const userInfo = ctx.session.user;
    // 模拟 userInfo right;
    const right = {
        '1': {
            '1': 1
        }
    };
    let menus = filterAuthMenus(right, appRouter);
    ctx.rest({
        ...userInfo,
        menus
    });
};

exports.getRoleList = async (ctx, next) => {
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

exports.getRoleMenus = async (ctx, next) => {
    let { id } = ctx.query;
    ctx.rest({
        list: appRouter,
        rights: {}
    });
}

