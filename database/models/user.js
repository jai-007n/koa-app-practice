const mongoose = require("mongoose");
const Joi = require('joi');

const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    }
    ,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    created: Number,
    updated: Number,
    active: { type: Boolean, default: true },
});

UserSchema.pre('save', function (next) {
    const now = Date.now();
    const doc = this;
    doc.updated = now
    if (!doc.created) {
        doc.created = now;
    }
    if (next) next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updated: Date.now() })
    if (next) next();
});


function validateUser(user) {
    const schema = Joi.object({
        first_name: Joi.string().min(1).max(50).
            // .regex(/^[a-zA-Z0-9()'*#^$@ _.\s-]*$/).
            required().messages({
                "string.base": `name should be a type of string`,
                "string.pattern.base": `name should contain only letters,numbers and $,@,*,^,#.`,
                "string.min": `name should be  at least 1 characters long.`,
                "string.max": `name should not be greater than 50 characters.`,
                "string.empty": `name must contain a value.`,
                "any.required": `name is a required.`
            }),
    })
    return schema.validate(user, {abortEarly: false,allowUnknown:true})
}

module.exports.User = mongoose.model('User', UserSchema);
module.exports.validateUser =validateUser;