import resize from '../../imageProcessing/resizer';
import path from 'path';

describe('Test image processing module', () => {
    const filename:string = 'pic';
    const width:number = 100;
    const height:number = 100;
    const imagePath:string = path.join('./asstes/full', 'pic.jpg');
    it('should reject promise with an error in case of invalid dimention', async () => {
        await expectAsync(resize(filename, imagePath,-100, 200)).toBeRejectedWithError();
        await expectAsync(resize(filename, imagePath, 0, 200)).toBeRejectedWithError();
    });
    it('should reject promise with an error in case for corrupted image path', async() => {
        const badImagePath:string = path.join('./asstesss/full', 'pic.jpg');
        await expectAsync(resize(filename, badImagePath, width, height)).toBeRejectedWithError();
        await expectAsync(resize(filename, '', width, height)).toBeRejectedWithError();
    });
    it('should reject promise with an error in case for wrong file name', async() => {
        const badFilename:string = 'picc';
        await expectAsync(resize(badFilename, imagePath, width, height)).toBeRejectedWithError();
        await expectAsync(resize(badFilename, imagePath, width, height)).toBeRejectedWithError();
    });
}); 