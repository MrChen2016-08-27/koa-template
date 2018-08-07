const router = require('koa-router')()
const Test = require('../../controller/test');
router.prefix('/test');

router.get('/', Test.testPage);

module.exports = router;
