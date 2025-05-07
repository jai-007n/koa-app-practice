const { Service,validateService } = require('../database/models/service');
const _ = require('lodash');
const {errorBag} = require('../lib/helpers')

async function createService(ctx) {

    let { error } = validateService(ctx.request.body);
    if (error) {
        ctx.status=422;
        ctx.body=errorBag(error);
        return ctx
    }
    
    try {
        let sendResult = _.pick(ctx.request.body, ['name'])
        let service = new Service(sendResult);

        service = await service.save();

        return ctx.body = {
            status: true,
            code: 200,
            message: "service created",
            service: service
        }


    } catch (ex) {
        return ctx.body={
            status: false,
            code: 400,
            message: ex.message,
            service: ""
        }
    }
}

async function getService(ctx) {
    const result = await Service.findById(ctx.params.id)

    if (!result) return ctx.body={
        status: false,
        code: 404,
        message: "The service with the given ID was not found.",
    };
    try {
        ctx.body={
            status: true,
            code: 200,
            message: "service fetche",
            service: result
        };
    } catch (ex) {
        ctx.body=={
            status: false,
            code: 500,
            message: ex.message,
        };
    }
}


async function deleteService(ctx) {
    try {
        const result = await Service.findByIdAndDelete(ctx.params.id)
        if (!result) return ctx.body={
            status: false,
            code: 404,
            message: "The service name with the given ID was not found.",
        };

        return ctx.body={
            status: true,
            code: 200,
            message: "servie deleted",
            service: result
        };
    } catch (ex) {
        return ctx.body={
            status: true,
            code: 500,
            message: ex.message,
        };
    }
}

async function updateService(ctx) {
    let { error } = validateService(ctx.request.body);
    if (error) {
        ctx.status=422;
        ctx.body=errorBag(error);
        return ctx
    }

    try {
        let sendResult = _.pick(ctx.request.body, ['name'])
        const service = await Service.findByIdAndUpdate(ctx.params.id, {
            $set: sendResult
        }, { new: true })

        return ctx.body = {
            status: true,
            code: 202,
            message: "service updated",
            service: service
        }
    } catch (ex) {
        return ctx.body={
            status: false,
            code: 500,
            message: ex.message,
            service: ""
        }
    }


}

async function listAllService(ctx) {
    const pageNumber = parseInt(ctx?.query.page) || 1;
    const pageSize = parseInt(ctx?.query.offset) || 16;
    const skip = Number((pageNumber - 1) * pageSize)
    let totalCount = 1

   
    try {
        let queryTry = Service.find();
        let countDocuments = Service.countDocuments({});
        if (ctx?.query.name !== undefined && ctx?.query.name !== '' && ctx?.query.name !== 'null') {
            queryTry = queryTry.and([{
                $or: [{ name: new RegExp(ctx?.query.name, 'i') }]
            }]);
            countDocuments = countDocuments.and({
                $or: [{ name: new RegExp(ctx?.query.name, 'i') }]
            });
        }
        queryTry = queryTry.skip(skip)
            .limit(pageSize)
            .sort({ name: 1 })

        totalCount = await countDocuments
        const result = await queryTry
       
       return ctx.body={
            status: true,
            code: 200,
            count: result.length,
            message: "Service List",
            list: result, pageNumber,
            totalPages: Math.ceil(totalCount / pageSize)
        };
    } catch (ex) {
       return ctx.body={
            status: false,
            code: 400,
            message: ex.message,
            list: ''
        };
    }
}

module.exports.createService = createService
module.exports.getService = getService
module.exports.deleteService = deleteService
module.exports.updateService = updateService
module.exports.listAllService = listAllService