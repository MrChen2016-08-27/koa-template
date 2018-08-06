const router = require('koa-router')()
const Test = require('../../controller/test');
router.prefix('/test');

router.get('/testPage', Test.testPage);

module.exports = router;
