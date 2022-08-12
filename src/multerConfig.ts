import { Request } from "express";
import multer from "multer";

const myStorage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: CallableFunction
    ): void => {
        cb(null, `assets/full`);
    },
    filename: (req: Request, file: Express.Multer.File, cb): void => {
        //store image in .png format
        cb(
            null,
            file.originalname.substring(0, file.originalname.lastIndexOf(".")) +
                ".jpg"
        );
    },
});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: CallableFunction
): void => {
    //specify the accepted file types .jpep and .png only
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    )
        cb(null, true); //save the image
    else cb(null, false); //don't throw error and simply ignore the image
};

const upload = multer({
    storage: myStorage,
    limits: {
        fileSize: 1024 * 1024 * 5, //maximum image size 5MB
    },
    fileFilter: fileFilter,
});

export default upload;
