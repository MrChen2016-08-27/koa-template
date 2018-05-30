module.exports = {
    server: {
        host: 'localhost',
        port: 8080,
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
        /^\/public/,
        /^\/api\/user\/register/,
        /^\/api\/user\/login/,
        /^\/api\/user\/getKey/,
    ]
};