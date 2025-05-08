const Router = require('@koa/router');
const { libConfig } = require("../lib/config")
const userController = require('../controllers/user.controller');
const {auth} = require('../middleware/auth')
const userRouter = new Router({
    prefix: libConfig.api?.prefix + '/user'
});

userRouter.get('/:id', auth,userController.getUser);
userRouter.get('/list/all', userController.listAllUser);
userRouter.post('/',auth, userController.createUser);
userRouter.put('/:id', auth,userController.updateUser);
userRouter.del('/:id', userController.deleteUser);


module.exports = userRouter