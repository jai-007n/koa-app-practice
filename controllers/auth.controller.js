
const { User } = require('../database/models/User');

async function login(ctx){
    try {
        let user = await User.findOne({email: new RegExp(req.body.email, 'i')});
        if (!user) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: req.t('invalid_email_or_password'),
            });
        }

        let userLessPassword = await User.findOne({email: new RegExp(req.body.email, 'i')})
            .populate({
                path: 'roles',
                options: {
                    populate: {
                        path: 'roles',
                    }
                }
            })
            .select('-password')

        let responseMessage = await commonLoginPanel(user, userLessPassword, req, res, "User login Successfully")
        if (responseMessage.status)
            return res.status(200).json(responseMessage);
        else
            return res.status(400).json(responseMessage);
    } catch (ex) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: ex.message,
        });
    }
}