const router = require('koa-router')()
const user = require('./user');

router.prefix('/api')
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


router.use(user.routes(), user.allowedMethods());

module.exports = router
