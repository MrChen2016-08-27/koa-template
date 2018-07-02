const axios = require('./axios.config');

axios.defaults.headers.post['Content-Type'] = 'application/json';
// 登录
exports.login = async ({ username, password }) => {
    return axios.post('/user/login', { username, password });
}

// 新增用户
exports.addUser = async (params) => {
    return axios.post('/user/add', params);
}

// 用户列表
exports.getUserList =  async(params) => {
    return axios.get('/user/list/get/', { params });
}