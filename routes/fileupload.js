const router = require('koa-router')();
const FileUpload = require('../controller/fileUpload.js');
const getMulterUpload = require('../tool/upload');

router.prefix('/upload');


router.post('/file', getMulterUpload().single('file'), FileUpload.uploadFile);
router.post('/img', FileUpload.uploadImage);

module.exports = router;