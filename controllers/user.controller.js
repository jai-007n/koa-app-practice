const { User, validateUser } = require('../database/models/User');
const _ = require('lodash');
const { errorBag } = require('../lib/helpers');
const bcrypt = require('bcryptjs');

async function createUser(ctx) {

    let { error } = validateUser(ctx.request.body);
    if (error) {
        ctx.status = 422;
        ctx.body = errorBag(error);
        return ctx
    }

    try {
        let sendResult = _.pick(ctx.request.body, ['first_name', 'last_name', 'email', 'password'])
        let user = new User(sendResult);
        user = await user.save();

        return ctx.body = {
            status: true,
            code: 200,
            message: "User created",
            user: user
        }


    } catch (ex) {
        return ctx.body = {
            status: false,
            code: 400,
            message: ex.message,

        }
    }
}

async function getUser(ctx) {
    const result = await User.findById(ctx.params.id)

    if (!result) return ctx.body = {
        status: false,
        code: 404,
        message: "The User with the given ID was not found.",
    };
    try {
        ctx.body = {
            status: true,
            code: 200,
            message: "User fetche",
            user: result
        };
    } catch (ex) {
        ctx.body == {
            status: false,
            code: 500,
            message: ex.message,
        };
    }
}


async function deleteUser(ctx) {
    try {
        const result = await User.findByIdAndDelete(ctx.params.id)
        if (!result) return ctx.body = {
            status: false,
            code: 404,
            message: "The User name with the given ID was not found.",
        };

        return ctx.body = {
            status: true,
            code: 200,
            message: "user deleted",
            user: result
        };
    } catch (ex) {
        return ctx.body = {
            status: true,
            code: 500,
            message: ex.message,
        };
    }
}

async function updateUser(ctx) {
    let { error } = validateUser(ctx.request.body);
    if (error) {
        ctx.status = 422;
        ctx.body = errorBag(error);
        return ctx
    }

    try {
        let sendResult = _.pick(ctx.request.body, ['first_name', 'last_name', 'email'])
        let user = await User.findByIdAndUpdate(ctx.params.id, {
            $set: sendResult
        }, { new: true, select: "+password" })
        const newPassword = ctx.request.body?.password
        if (newPassword) {
            let validPassword = await bcrypt.compare(newPassword, user.password);
            if (!validPassword) {
                user.password = ctx.request.body.password;
                user.save();
            }
        }

        return ctx.body = {
            status: true,
            code: 202,
            message: "user updated",
            user: user
        }
    } catch (ex) {
        return ctx.body = {
            status: false,
            code: 500,
            message: ex.message,

        }
    }


}

async function listAllUser(ctx) {
    const pageNumber = parseInt(ctx?.query.page) || 1;
    const pageSize = parseInt(ctx?.query.offset) || 16;
    const skip = Number((pageNumber - 1) * pageSize)
    let totalCount = 1


    try {
        let queryTry = User.find();
        let countDocuments = User.countDocuments({});
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
            message: "User List",
            list: result, pageNumber,
            totalPages: Math.ceil(totalCount / pageSize)
        };
    } catch (ex) {
        return ctx.body = {
            status: false,
            code: 400,
            message: ex.message,

        };
    }
}

module.exports.createUser = createUser
module.exports.getUser = getUser
module.exports.deleteUser = deleteUser
module.exports.updateUser = updateUser
module.exports.listAllUser = listAllUser