let Koa = require('koa');
let bodyParser = require('koa-bodyparser');
let Session = require('koa-session');
let Static = require('koa-static');
let router = require('koa-router')();
// 引入路由
let admin = require('./routes/admin');

// 初始化app
let app = new Koa();

// 静态资源
app.use(Static('public'));
// body解析
app.use(bodyParser());

// 设置session
app.keys = ['koa'];
let sessionConfig = {
    key: 'koa:session',
    // 过期时间
    maxAge: 60 * 1000 * 60,
    overwrite: true,
    // 签名
    signed: true,
    renew: true,
};
app.use(Session(sessionConfig, app));

// 启动路由
router.use('/admin', admin);
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
