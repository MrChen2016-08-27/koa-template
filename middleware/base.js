const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const session = require('koa-session-redis');
// const koaJwt = require('koa-jwt');
const config = require('../config');

// 基本中间件
function base(app) {
    // middlewares
    app.use(bodyparser({
        enableTypes:['json', 'form', 'text']
    }))
    app.use(json())
    app.use(logger())
    app.use(require('koa-static')(__dirname + '/public'))

    app.use(views(__dirname + '/views', {
        extension: 'pug'
    }))

    // logger
    app.use(async (ctx, next) => {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })

    app.use(helmet());

    // koa-session-redis
    app.keys = ['app secret'];
    app.use(session({
        store: {
            host: config.redis.host,
            port: config.redis.port,
            ttl: config.redis.ttl
        }
    }));

    // jwt-koa
    // app.use(koaJwt({ secret: config.jwt.secret }).unless({ path: config.jwt.path }));
}

module.exports = base;