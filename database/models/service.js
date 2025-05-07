const mongoose = require("mongoose");
const Joi = require('joi');

const { Schema } = mongoose;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

function validateService(service) {
    const schema = Joi.object({
      
        name: Joi.string().min(5).max(1000).
            // .regex(/^[a-zA-Z0-9()'*#^$@ _.\s-]*$/).
            required().messages({
                "string.base": `name should be a type of string`,
                "string.pattern.base": `name should contain only letters,numbers and $,@,*,^,#.`,
                "string.min": `name should be  at least 5 characters long.`,
                "string.max": `name should not be greater than 1000 characters.`,
                "string.empty": `name must contain a value.`,
                "any.required": `name is a required.`
            }),
    })
    return schema.validate(service, {abortEarly: false})
}

module.exports.Service = mongoose.model('Service', ServiceSchema);
exports.validateService = validateService;