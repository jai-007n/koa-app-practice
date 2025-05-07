const mongoose =require("mongoose");

const { Schema } = mongoose;

const ServicePhotoSchema = new Schema({
    image_name: {
        type: String,
        required: true,
    }
   
});

module.exports.ServicePhoto = mongoose.model('ServicePhoto', ServicePhotoSchema);