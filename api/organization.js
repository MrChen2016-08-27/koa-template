const axios = require('./axios.config');

axios.defaults.headers.post['Content-Type'] = 'application/json';
// 组织架构列表
exports.getOrganizationList = async () => {
    const params = { _: Date.now() };
    return axios.get('/org/node/list/get', { params });
}


// 新建组织架构
exports.addOrganization = async (params) => {
    return axios.post('/org/add', params);
}

// 修改组织架构
exports.updateOrganization = async (params) => {
    return axios.post('/org/update', params);
}

// 获取指定组织
exports.getOrgDetails = async (id) => {
    return axios.get(`/org/get/${id}`);
}
