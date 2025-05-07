const Router = require('@koa/router');
const {libConfig}=require("../lib/config")
const userController = require('../controllers/user.controller');

const userRouter = new Router({
    prefix:libConfig.api?.prefix +'/user'
});

userRouter.get('/:id',userController.getUser);
userRouter.get('/list/all',userController.listAllUser);
userRouter.post('/',userController.createUser);
userRouter.put('/:id',userController.updateUser);
userRouter.del('/:id',userController.deleteUser);


module.exports= userRouter