const Koa = require("koa");
const koaRouter = require("koa-router");
const koaStatic = require("koa-static");
const compress = require("koa-compress");
const path = require("path");
const fs = require("fs");
const app = new Koa();

app.use(compress());
app.use(koaStatic(path.resolve(__dirname,"./")));
const router = koaRouter();

router.get("*",async(ctx,next)=>{
    ctx.type="html",
    ctx.body=fs.readFileSync(path.resolve('./html/index.html'),'utf-8')
    
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8001,()=>{
    console.log("server run on  localhost:8001");
})