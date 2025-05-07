import mongoose from "mongoose";
import validate from "validate.js";

const constraints = {
    email: () => ({
        presence: { allowEmpty: false },
        email: true
    }),
    name: () => {

        const regex = "[\-\'A-Za-z ]+";

        return {
            presence: { allowEmpty: false },
            type: 'string',
            format: {
                pattern: regex,
                flags: 'i'
            }
        };
    }
}

const { Schema } = mongoose;

const UserSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        validate: {
            validator: name => !validate.single(name, constraints.name),
            message: props => `${props.value} is not a valid first name`
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: name => !validate.single(name, constraints.name),
            message: props => `${props.value} is not a valid last name`
        }
    }
    ,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: email => !validate.single(email, constraints.email),
            message: props => `${props.value} is not a valid email address`
        }
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

export const User = mongoose.model('User', UserSchema);