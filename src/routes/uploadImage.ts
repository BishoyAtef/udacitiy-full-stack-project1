import { Request, Response } from "express";

const uploadImage = (req: Request, res: Response): void => {
    if (req.file === undefined) res.status(400).send("please choose an image");
    else res.send("images saved successfuly");
};

export default uploadImage;
