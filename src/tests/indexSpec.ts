import supertest from 'supertest';
import app from '../index';
import { resize, imagesPath } from '../routes/api/images';
import { promises as fs } from 'fs';

describe('this is endpoints tests', () => {
    beforeEach(():void => {
        console.log('\n_____________________________________\n');
    });

    beforeAll(():void => {
        console.log('\n*************************************\n');
    });

    afterAll(():void => {
        console.log('\n*************************************\n');
    });

    const request = supertest(app);

    it('expects status 200 from /', async ():Promise<void> => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it('expects status with specifying width and height to /api/images', async ():Promise<void> => {
        const response = await request.get(
            '/api/images?image=armored&width=500&height=500'
        );
        expect(response.status).toBe(200);
    });

    //edge case

    it('expects status 200 event without providing width or height.', async ():Promise<void> => {
        const response = await request.get(
            '/api/images?image=armored&width=&height='
        );
        expect(response.status).toBe(200);
    });
});

describe('these test are for the resize function.', ():void => {
    const image = 'armored',
        width = 500,
        height = 500,
        outputFile = `${imagesPath}/resized/${image}_${width}_${height}.jpg`,
        fullImgPth = `${imagesPath}/fullsize/${image as string}_full.jpg`;

    it('expects photo to be saved in the resized directory.', async ():Promise<void> => {
        await resize(fullImgPth, width, height, outputFile);
        const resizedList = await fs.readdir(`${imagesPath}/resized`);
        expect(resizedList).toContain(`${image}_${width}_${height}.jpg`);
    });
});

it('something', () => {
    expect(5).toBe(5);
});
