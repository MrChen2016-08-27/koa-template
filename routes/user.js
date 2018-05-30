const router = require('koa-router')()
const User = require('../controller/user');
router.prefix('/user')

router.post('/login', User.login); 

router.get('/getKey', User.getKey);


module.exports = router
