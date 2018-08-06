const router = require('koa-router')();
const Org = require('../../controller/organization');
router.prefix('/org');

router.get('/list/get', Org.getOrganizationList);
router.post('/add', Org.addOrganization);
router.post('/update', Org.updateOrganization);
router.get('/details', Org.getOrgDetails);

module.exports = router;