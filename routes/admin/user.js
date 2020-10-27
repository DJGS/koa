let router = require('koa-router')();

router.get('/list', async (ctx) => {
    ctx.body = 'demo';
});

module.exports = router.routes();
