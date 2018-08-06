
const router = require('koa-router')();
const api = require('./api');
const page = require('./page');



router.get('/', (ctx, next) => {
    ctx.redirect('/page');
});
router.use(api.routes(), api.allowedMethods());
router.use(page.routes(), page.allowedMethods());


module.exports = router;
