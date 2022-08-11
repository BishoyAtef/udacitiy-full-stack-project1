import express from 'express';
import jimp from 'jimp';
import multer from 'multer';
require('dotenv').config();

const app = express();
const port = 8000;

const storage = multer.diskStorage({
    destination: (req, file, cb):void => {
        cb(null, `assets/full`)
    },
    filename: (req, file, cb):void => {
        //store image in .png format
        cb(null, file.originalname.substring(0, file.originalname.lastIndexOf('.'))+'_full.png');
    }
});

const fileFilter = (req:express.Request, file:Express.Multer.File, cb:Function):void => {
    //specify the accepted file types .jpep and .png only 
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') 
        cb(null, true); //save the image
    else cb(null, false); //don't throw error and simply ignore the image 
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5, //maximum image size 5MB
    },
    fileFilter: fileFilter
});

app.listen(port, () => {
    console.log(`app started listening at ${port}`);
});

app.post('/api/images/upload', upload.single('fullimage'), (req, res) => {
    if(req.file === undefined) res.status(400).send("please choose an image");
    else res.send("images saved successfuly");
});

app.get('/api/images', async (req, res) => {
    try {
        const image = await jimp.read(`${process.cwd()}/assets/full/${req.query.filename}_full.png`);
        const width: number = parseInt(req.query.width as string);
        const height: number = parseInt(req.query.height as string);
        image.resize(width, height, (err) => {
            //handling invalide parameter for the resizer
            if (err) throw err;
        })
        .write(`${process.cwd()}/assets/thumb/${req.query.filename}_thumb.png`); //store resized image in .png format
        res.sendFile(`${process.cwd()}/assets/thumb/${req.query.filename}_thumb.png`);
    } catch(error:unknown) {
        if(error instanceof Error) res.status(400).send(error.message);
        else res.send("invalid parameters");
    }
});

export default app;