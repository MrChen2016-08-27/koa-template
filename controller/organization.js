const orgApi = require('../api/organization');

exports.getOrganizationList = async (ctx, next) => {
    const res = await orgApi.getOrganizationList();
    ctx.rest(res.data);
}

exports.addOrganization = async (ctx, next) => {
    const params = ctx.request.body;
    params.ctime = Date.now();
    const res = await orgApi.addOrganization(params);
    ctx.rest(res.data);
}

exports.updateOrganization = async (ctx, next) => {
    const params = ctx.request.body;
    params.mtime = Date.now();
    delete params.children;
    const res = await orgApi.updateOrganization(params);
    ctx.rest(res.data);
}

exports.getOrgDetails = async (ctx, next) => {
    const { id } = ctx.request.query;
    const res = await orgApi.getOrgDetails(id);
    ctx.rest(res.data);
}