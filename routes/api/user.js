const router = require('koa-router')()
const User = require('../../controller/user');
router.prefix('/user');

router.post('/login', User.login);

router.get('/getKey', User.getKey);

router.get('/list/get', User.getUserList);
router.get('/session', User.getUserSession);

router.post('/add', User.addUser);

router.get('/admin', User.addAdmin);

router.get('/role/list', User.getRoleList);
router.get('/role/menus', User.getRoleMenus);

module.exports = router;
