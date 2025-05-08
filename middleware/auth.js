const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.auth = async (ctx, next) => {

    let token = ctx.request?.header['Authorization'];
    if (!token) {
        token = ctx.cookies.get('jwt');

        if (!token) {
            ctx.status = 401;
            return ctx.body = {
                status: false,
                code: 401,
                message: "Unauthenticated user",
            }
        }
    }

    try {
        const decoded = jwt.verify(token, config.get('JWT_PRIVATE_KEY'));
        ctx.user = decoded;
        await next();

    } catch (ex) {
        return ctx.body = {
            status: false,
            code: 401,
            message: "Unauthenticated user",
        }
    }
}