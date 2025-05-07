const Router = require('@koa/router');
const {libConfig}=require("../lib/config")

const userRouter = new Router({
    prefix:libConfig.api?.prefix +'/user'
});



userRouter.get('/user123', (ctx) => {
    console.log(`ℹ️ - User route: ${Date.now()}`);
    ctx.body = 'catch all with user';
    ctx.status = 201;
});

userRouter.post('/user', (ctx) => {
    console.log(`ℹ️ - User route: ${Date.now()}`);
    ctx.body = 'catch all with user';
    ctx.status = 201;
});

module.exports= userRouter