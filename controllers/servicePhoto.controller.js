const { ServicePhoto, validateServicePhoto } = require('../database/models/servicePhoto');
const _ = require('lodash');
const { errorBag } = require('../lib/helpers')

async function createServicePhoto(ctx) {

    try {
        let servicePhoto = new ServicePhoto({
            image_name: ctx.file.filename
        });

        servicePhoto = await servicePhoto.save();

        return ctx.body = {
            status: true,
            code: 200,
            message: "servicePhoto created",
            servicePhoto: servicePhoto
        }


    } catch (ex) {
        return ctx.body = {
            status: false,
            code: 400,
            message: ex.message,
            servicePhoto: ""
        }
    }
}

async function getServicePhoto(ctx) {
    const result = await ServicePhoto.findById(ctx.params.id)

    if (!result) return ctx.body = {
        status: false,
        code: 404,
        message: "The servicePhoto with the given ID was not found.",
    };
    try {
        ctx.body = {
            status: true,
            code: 200,
            message: "servicePhoto fetche",
            servicePhoto: result
        };
    } catch (ex) {
        ctx.body == {
            status: false,
            code: 500,
            message: ex.message,
        };
    }
}


async function deleteServicePhoto(ctx) {
    try {
        const result = await ServicePhoto.findByIdAndDelete(ctx.params.id)
        if (!result) return ctx.body = {
            status: false,
            code: 404,
            message: "The servicePhoto name with the given ID was not found.",
        };

        return ctx.body = {
            status: true,
            code: 200,
            message: "servie deleted",
            servicePhoto: result
        };
    } catch (ex) {
        return ctx.body = {
            status: true,
            code: 500,
            message: ex.message,
        };
    }
}

async function updateServicePhoto(ctx) {
    try {
        let sendResult = _.pick(ctx.request.body, ['name'])
        const servicePhoto = await ServicePhoto.findByIdAndUpdate(ctx.params.id, {
            $set: { image_name: ctx.file.filename }
        }, { new: true })

        return ctx.body = {
            status: true,
            code: 202,
            message: "servicePhoto updated",
            servicePhoto: servicePhoto
        }
    } catch (ex) {
        return ctx.body = {
            status: false,
            code: 500,
            message: ex.message,
            servicePhoto: ""
        }
    }


}

async function listAllServicePhoto(ctx) {
    const pageNumber = parseInt(ctx?.query.page) || 1;
    const pageSize = parseInt(ctx?.query.offset) || 16;
    const skip = Number((pageNumber - 1) * pageSize)
    let totalCount = 1


    try {
        let queryTry = ServicePhoto.find();
        let countDocuments = ServicePhoto.countDocuments({});
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

        return ctx.body = {
            status: true,
            code: 200,
            count: result.length,
            message: "ServicePhoto List",
            list: result, pageNumber,
            totalPages: Math.ceil(totalCount / pageSize)
        };
    } catch (ex) {
        return ctx.body = {
            status: false,
            code: 400,
            message: ex.message,
            list: ''
        };
    }
}

module.exports.createServicePhoto = createServicePhoto
module.exports.getServicePhoto = getServicePhoto
module.exports.deleteServicePhoto = deleteServicePhoto
module.exports.updateServicePhoto = updateServicePhoto
module.exports.listAllServicePhoto = listAllServicePhoto