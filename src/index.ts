import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import resize from "./imageProcessing/resizer";

const app = express();
const port = 8000;

const myStorage = multer.diskStorage({
    destination: (
        req: express.Request,
        file: Express.Multer.File,
        cb: CallableFunction
    ): void => {
        cb(null, `assets/full`);
    },
    filename: (req: express.Request, file: Express.Multer.File, cb): void => {
        //store image in .png format
        cb(
            null,
            file.originalname.substring(0, file.originalname.lastIndexOf(".")) +
                ".jpg"
        );
    },
});

const fileFilter = (
    req: express.Request,
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

app.listen(port, () => {
    console.log(`app started listening at ${port}`);
});

app.post(
    "/api/images/upload",
    upload.single("fullimage"),
    (req: express.Request, res: express.Response): void => {
        if (req.file === undefined)
            res.status(400).send("please choose an image");
        else res.send("images saved successfuly");
    }
);

app.get(
    "/api/images",
    async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const imagepath: string = path.join(
                "./assets/full",
                req.query.filename + ".jpg"
            );
            const resizedimagepath: string = path.join(
                "./assets/thumb",
                (((((req.query.filename as string) +
                    req.query.width) as string) + req.query.height) as string) +
                    ".jpg"
            );
            if (!fs.existsSync(resizedimagepath)) {
                const width: number = parseInt(req.query.width as string);
                const height: number = parseInt(req.query.height as string);
                await resize(
                    req.query.filename as string,
                    imagepath,
                    width,
                    height
                );
                fs.createReadStream(resizedimagepath).pipe(res.status(200));
            } else {
                fs.createReadStream(resizedimagepath).pipe(res.status(200));
            }
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).send(error.message);
            else res.status(400).send("invalid parameters");
        }
    }
);

export default app;
