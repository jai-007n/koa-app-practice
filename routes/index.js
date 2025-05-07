const Router = require('@koa/router');
const { libConfig } = require("../lib/config")

const defaultRouter = require('./default')
const userRouter = require('./user')


function initializeRoutes(app) {
    // const router = new Router({
    //     prefix:libConfig.api?.prefix 
    //  });

    if (libConfig.routes?.user) {
        console.log("user routes calling")
        console.log(userRouter)
        app.use(userRouter.routes())
            .use(userRouter.allowedMethods());
    }

    if (libConfig.routes?.service) {
        console.log("otp routes calling")
        // otpRoutes(router);
    }

    if (libConfig.routes?.default) {
        console.log("default routes calling")
        app.use(defaultRouter.routes())
            .use(defaultRouter.allowedMethods());;
    }
}



module.exports.initializeRoutes = initializeRoutes;
