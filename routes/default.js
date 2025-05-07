const Router = require('@koa/router');
const {libConfig}=require("../lib/config")


const defaultRouter = new Router({
    prefix:libConfig.api?.prefix 
});



defaultRouter.get('/ping', (ctx) => {
    console.log(`ℹ️ - Ping route: ${Date.now()}`);
    ctx.body = 'catch all with use';
    ctx.status = 201;
    // res.status(200).json({
    //     message: '✅ - Pong: test successfully'
    // });
});

defaultRouter.get('/pong', (ctx) => {
    console.log(`ℹ️ - Ping route: ${Date.now()}`);
    ctx.body = 'catch all with use';
    ctx.status = 201;
    // res.status(200).json({
    //     message: '✅ - Pong: test successfully'
    // });
});

defaultRouter.get('/check', (ctx) => {
    console.log(`ℹ️ - Ping route: ${Date.now()}`);
    ctx.body = 'catch all with use';
    ctx.status = 201;
    // res.status(200).json({
    //     message: '✅ - Pong: test successfully'
    // });
}); 

// // Catch all route for the ping (only allow get)
// defaultRouter.all('/ping', (req, res) => {
//     const code = 405;
//     return res.status(code).json({
//         code, 
//         message: `${req.method} method not allowed for route ${req.url}`
//     });
// });

// // Catch all 404 not found route
// defaultRouter.all('*', (req, res) => {
//     const code = 404;
//     return res.status(code).json({
//         code,
//         message: `${req.url} not found`
//     });
// });

module.exports= defaultRouter

