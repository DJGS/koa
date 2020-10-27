let router = require('koa-router')();
let user = require('./admin/user');

router.get('/', async (ctx) => {
    ctx.body = '后台管理首页';
});

router.use('/user', user);

module.exports = router.routes();
