
const router = require('koa-router')();
const user = require('./user');
const test = require('./test');
const organization = require('./organization');
const fileupload = require('./fileupload');

router.prefix('/api');
// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

router.get('/', async (ctx, next) => {
  ctx.rest({
    title: 'hello koa2'
  });
})


router.get('/auth', async (ctx, next) => {
  ctx.rest({
    title: '权限验证'
  });
})

router.get('/logout', async (ctx, next) => {
  ctx.session.user = null;
  ctx.rest({
    title: '注销成功'
  });
})


router.use(fileupload.routes(), user.allowedMethods());
router.use(user.routes(), user.allowedMethods());
router.use(organization.routes(), organization.allowedMethods());
router.use(test.routes(), test.allowedMethods());

module.exports = router;
