const Koa = require("koa");
const koaRouter = require("koa-router");
const koaStatic = require("koa-static");
const koaLogger = require("koa-logger");
const koaJson = require("koa-json");
const jwt = require("koa-jwt");
const koaBodyparser = require("koa-bodyparser");

const compress = require("koa-compress");
const path = require("path");
const fs = require("fs");
const app = new Koa();

const auth = require("./routes/auth")

const router = koaRouter();

app.use(compress());
app.use(koaLogger());
app.use(koaJson());
app.use(koaBodyparser());

// 跨域设置
const corsOptions = {
    'origin': '',
    'credentials': true,
    'maxAge': 3600
};

app.use(Kcors(corsOptions));

app.use(koaStatic(path.resolve(__dirname, "./")));

router.get("*", async (ctx, next) => {
    ctx.type = "html",
        ctx.body = fs.readFileSync(path.resolve('./html/index.html'), 'utf-8')


});

// 所有走/api/打头的请求都需要经过jwt验证。
// router.use('/api', jwt({ secret: db.jwtSecret }), apiRouter.routes()); 

router.use('/api', auth.routes());

app.use(router.routes()).use(router.allowedMethods());

// 错误监听
app.on('err', err => {
    log.error('server error', err)
})

app.listen(8001, () => {
    console.log("server run on  localhost:8001");
})