const multer = require('koa-multer');
const fs = require('fs');
const path = require('path');

module.exports = {
    server: {
        port: 3000,
    },
    api: {
        baseUrl: '',
        baseUrl2: '',
        baseUrl3: ''
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        ttl: 7200
    },
    // jwt: {
    //     secret: 'node-secret',
    //     expiresIn: '24h',
    //     path: [
    //         /^\/public/,
    //         /^\/api\/user\/register/,
    //         /^\/api\/user\/login/,
    //         /^\/api\/user\/getKey/,
    //     ]
    // },
    apiFilter: [
        // /^\/^(api)+/,
        /^\/api/,
        /^\/api\/user\/admin/,
        /^\/public/,
        /^\/api\/user\/register/,
        /^\/api\/user\/login/,
        /^\/api\/user\/getKey/,
        /^\/api\/user\/list/,
        /^\/api\/user\/add/,
    ],
    "file": {
        "wwww": "/file_dist",
        "local": "public/file_dist"
    },
    "image": {
        "wwww": "/img_dist",
        "local": "public/img_dist"
    },
    upload: {
        file: 'public/file_dist'
    },
    // 资源配置, 路径相对于/middleware
    resource: {
        context: 'xxx',
        public: 'public',
    }
};