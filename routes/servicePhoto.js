const servicePhotoController = require('../controllers/servicePhoto.controller');
const Router = require('@koa/router');
const {libConfig}=require("../lib/config")

const servicePhotoRouter = new Router({
    prefix:libConfig.api?.prefix +'/servicePhoto'
});

const fs = require("fs");
const multer = require('@koa/multer');
const maxSize = 5 * 1024 * 1024;


// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("public/images/uploads")) {
                    fs.mkdirSync("public/images/uploads", 0766, function (err) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }
        cb(null, './public/images/uploads/'); // Destination folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});



let uploadFile = multer({
    storage: storage,
    limits: {fileSize: maxSize},
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new multer.MulterError('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single("service_photo");



servicePhotoRouter.get('/:id',servicePhotoController.getServicePhoto);
servicePhotoRouter.get('/list/all',servicePhotoController.listAllServicePhoto);
servicePhotoRouter.post('/',uploadFile,servicePhotoController.createServicePhoto);
servicePhotoRouter.put('/:id',uploadFile,servicePhotoController.updateServicePhoto);
servicePhotoRouter.del('/:id',servicePhotoController.deleteServicePhoto);

module.exports= servicePhotoRouter