const Koa = require('koa');
const router = require('./src/router/router');
const router_old = require('./src/router/router_old');
const BodyParser = require('koa-bodyparser');
require('./src/model/db');
const app = new Koa();

// 解析请求体
app.use(BodyParser());

// 捕获异常
app.use(require('./src/middleware/filter'));

// 应用路由
app.use(router.routes())
    .use(router.allowedMethods());

// 旧版路由
app.use(router_old.routes())
    .use(router_old.allowedMethods());

// 监听端口
app.listen(9001);

app.on('error', (err, ctx) => {
    console.log(err);
})
