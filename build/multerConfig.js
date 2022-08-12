"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var myStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets/full");
    },
    filename: function (req, file, cb) {
        //store image in .png format
        cb(null, file.originalname.substring(0, file.originalname.lastIndexOf(".")) +
            ".jpg");
    },
});
var fileFilter = function (req, file, cb) {
    //specify the accepted file types .jpep and .png only
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg")
        cb(null, true); //save the image
    else
        cb(null, false); //don't throw error and simply ignore the image
};
var upload = (0, multer_1.default)({
    storage: myStorage,
    limits: {
        fileSize: 1024 * 1024 * 5, //maximum image size 5MB
    },
    fileFilter: fileFilter,
});
exports.default = upload;
