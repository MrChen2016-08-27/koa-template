
const router = require('koa-router')();
const ratelimit = require('koa-ratelimit');
const Redis = require("../tool/redis");
const api = require('./api');
const page = require('./page');


// 对post请求的频率监控
router.post('/*', ratelimit({
    db: Redis,
    duration: 60000,
    errorMessage: '短时间内访问的频率过高',
    id: (ctx) => ctx.ip,
    headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total'
    },
    max: 10,
    disableHeader: false,
}));

router.get('/', (ctx, next) => {
    ctx.redirect('/page');
});
router.use(api.routes(), api.allowedMethods());
router.use(page.routes(), page.allowedMethods());

module.exports = router;
