const serviceController = require('../controllers/service.controller');
const Router = require('@koa/router');
const {libConfig}=require("../lib/config")

const serviceRouter = new Router({
    prefix:libConfig.api?.prefix +'/service'
});



serviceRouter.get('/:id',serviceController.getService);
serviceRouter.get('/list/all',serviceController.listAllService);
serviceRouter.post('/',serviceController.createService);
serviceRouter.put('/:id',serviceController.updateService);
serviceRouter.del('/:id',serviceController.deleteService);

module.exports= serviceRouter