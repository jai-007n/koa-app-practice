import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
   
});

export const Service = mongoose.model('Service', UserSchema);