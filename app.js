let Koa = require('koa');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
let Static = require('koa-static');
let Session = require('koa-session');

let app = new Koa();

let router = new Router();

// 获取get传值 ctx.query ctx.querystring
router.get('/demo', async (ctx) => {
    // 设置cookie 无法直接设置中文
    ctx.cookies.set('username', 'zhangsan', {
        // 过期时间
        maxAge: 60 * 1000,
    });

    ctx.session.token = '1234';

    ctx.body = 'demo';
});

// 动态路由 ctx.params
router.get('/info/:id', async (ctx) => {
    console.log(ctx.cookies.get('username'));
    ctx.body = ctx.params.id;

    console.log(ctx.session.token);
});

// 应用级中间键
app.use(async (ctx, next) => {
    await next();

    if (ctx.status === 404) {
        ctx.body = '未找到您访问的页面';
    } else {
        console.log(ctx.url);
    }
});

// 接收post提交请求 ctx.request.body
router.post('/add', async (ctx) => {
    ctx.body = ctx.request.body;
});

// 静态资源中间键 可配置多个
app.use(Static('static'));

// 设置session
app.keys = ['gss'];
let sessionConfig = {
    key: 'gss:session',
    autoCommit: true,
    // 过期时间
    maxAge: 60 * 1000 * 60,
    overwrite: true,
    // 签名
    signed: true,
    // 更新
    rolling: false,
    // 快要到期在设置
    renew: true,
    sameSite: null,
};

app.use(Session(sessionConfig, app));

// 启动路由
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
