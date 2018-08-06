const router = require('koa-router')();
const user = require('./api/user');
// const test = require('./api/test');
// const organization = require('./api/organization');
const fileupload = require('./api/fileupload');

router.prefix('/api');

router.get('/', async (ctx, next) => {
    ctx.rest({
      title: 'hello koa2'
    });
});
  
  
router.get('/auth', async (ctx, next) => {
  ctx.rest({
    title: '权限验证'
  });
});
  
  router.get('/logout', async (ctx, next) => {
    ctx.session.user = null;
    ctx.rest({
      title: '注销成功'
    });
  })
  
  
  router.use(fileupload.routes(), fileupload.allowedMethods());
  router.use(user.routes(), user.allowedMethods());
//   router.use(organization.routes(), organization.allowedMethods());
//   router.use(test.routes(), test.allowedMethods());
  
  module.exports = router;