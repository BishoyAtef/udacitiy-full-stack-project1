import resize from '../../imageProcessing/resizer';
import path from 'path';

describe('Test image processing module', () => {
    const filename:string = 'flower';
    const width:number = 100;
    const height:number = 100;
    const imagePath:string = path.join('./assets/full', 'flower.jpg');
    it('should work fine', async () => {
        await expectAsync(resize(filename, imagePath, width, height)).toBeResolved();
    });
    it('should reject promise with an error in case of invalid dimention', async () => {
        await expectAsync(resize(filename, imagePath, -100, 200)).toBeRejectedWithError();
        await expectAsync(resize(filename, imagePath, 0, 200)).toBeRejectedWithError();
    });
    it('should reject promise with an error in case for corrupted image path', async() => {
        const badImagePath:string = path.join('./asstesss/full', 'pic.jpg');
        await expectAsync(resize(filename, badImagePath, width, height)).toBeRejectedWithError();
        await expectAsync(resize(filename, '', width, height)).toBeRejectedWithError();
    });
}); 