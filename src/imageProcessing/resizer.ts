import sharp from "sharp";
import path from "path";

const resize = async (
    filename: string,
    imagepath: string,
    width: number,
    height: number
): Promise<void> => {
    const resizedimagepath: string = path.join(
        "./assets/thumb",
        ((((filename + width) as string) + height) as string) + ".jpg"
    );
    await sharp(imagepath)
        .resize(width, height, {
            fit: sharp.fit.cover,
        })
        .toFile(resizedimagepath);
};

export default resize;
