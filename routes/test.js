const router = require('koa-router')()
const Test = require('../controller/test');
router.prefix('/test');

router.get('/https', Test.testHttps);

module.exports = router;
