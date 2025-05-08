const jwt = require('jsonwebtoken');
const { User } = require('../database/models/User');
const bcrypt = require('bcryptjs');
const config = require('config');

async function login(ctx) {
    try {
        const { email, password } = ctx.request.body;
        let user = await User.findOne({ email: new RegExp(email, 'i') }).select("+password");
        if (!user) {
            ctx.status = 401;
            return ctx.body = {
                status: false,
                code: 401,
                message: 'invalid_email_or_password',
            }
        } 

        let validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            ctx.status = 401;
            return ctx.body = {
                status: false,
                code: 401,
                message: 'invalid_email_or_password',
            }
        }
        const JWT_SECRET = config.get('JWT_PRIVATE_KEY');
        // Generate JWT
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        // Set JWT as a cookie (or session storage)
        ctx.cookies.set('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 });

        ctx.status = 200;
        return ctx.body = {
            status: false,
            code: 200,
            token,
            message: "User login Successfully"
        }
    } catch (ex) {
        ctx.status = 500;
        return ctx.body = {
            status: false,
            code: 500,
            message: ex.message,
        }
    }
}



async function logout(ctx) {
    // Clear the JWT cookie or invalidate session
    ctx.cookies.set('jwt', '', { httpOnly: true, secure: false, maxAge: 0 }); // Clear the cookie
    ctx.status = 204;
    ctx.body = { message: 'Logout successfully' };
}



module.exports.login = login
module.exports.logout = logout