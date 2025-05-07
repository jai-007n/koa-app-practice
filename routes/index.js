const Router = require('@koa/router');
const { libConfig } = require("../lib/config")

const defaultRouter = require('./default')
const userRouter = require('./user')
const serviceRouter = require('./service')


function initializeRoutes(app) {

    if (libConfig.routes?.user) {
        console.log("user routes calling")
        app.use(userRouter.routes())
            .use(userRouter.allowedMethods());
    }

    if (libConfig.routes?.service) {
        console.log("service routes calling")
        app.use(serviceRouter.routes())
            .use(serviceRouter.allowedMethods());
    }

    if (libConfig.routes?.default) {
        console.log("default routes calling")
        app.use(defaultRouter.routes())
            .use(defaultRouter.allowedMethods());;
    }
}



module.exports.initializeRoutes = initializeRoutes;
