import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import resize from "../imageProcessing/resizer";

const resizeImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const imagepath: string = path.join(
            "./assets/full",
            req.query.filename + ".jpg"
        );
        const resizedimagepath: string = path.join(
            "./assets/thumb",
            (((((req.query.filename as string) + req.query.width) as string) +
                req.query.height) as string) + ".jpg"
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
};

export default resizeImage;
