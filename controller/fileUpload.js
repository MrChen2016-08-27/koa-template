const _ = require('lodash');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

/**
 *
 */
exports.uploadFile = async (ctx, next) => {
    ctx.rest({
        fileName: ctx.req.file.path
    });
};


/**
 *
 */
exports.uploadImage = async (ctx, next) => {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = config.image.local; //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(ctx.request, function (err, fields, files) {
        //
        if (err) {
            ctx.rest({result: 1, message: err});
        } else {
            var fileName = files.uploadImage.path;
            fileName = fileName.replace(/\\/g, "/");
            fileName = fileName.substring(fileName.lastIndexOf("/"));
            var downloadFilePath = config.image.wwww + fileName;
            //var localFilePath = config.image.local + "/" + files.uploadImage.name;
            //fs.renameSync(files.uploadImage.path, localFilePath);
            ctx.rest({result: 0, filePath: downloadFilePath, fileName: fileName});
        }
    });
};


