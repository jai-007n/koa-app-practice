const Router = require('@koa/router');
const {libConfig}=require("../lib/config")
const authController = require('../controllers/auth.controller');

const authRouter = new Router({
    prefix:libConfig.api?.prefix +'/auth'
});

authRouter.post('/login',authController.login);
authRouter.post('/logout',authController.logout);

module.exports= authRouter