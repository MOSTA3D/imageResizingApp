import express from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import { exec } from 'child_process';

const images = express.Router();

export const imagesPath = `${process.env.PWD}/images/`;

export async function resize(
    fullImgPth: string,
    width: unknown,
    height: unknown,
    outputFile: string
) {
    try {
        await sharp(fullImgPth)
            .resize({
                height: Number(height as string),
                width: Number(width as string),
            })
            .toFile(outputFile);
    } catch (err) {
        console.log(err);
    }
}

images.get('/', async (req, res) => {
    // there is error happened while destructuring, even if i specify the object types
    const width: unknown = req.query.width;
    const height: unknown = req.query.height;
    const image: unknown = req.query.image;
    const outputFile = `${imagesPath}/resized/${image}_${width}_${height}.jpg`;
    const fullImgPth = `${imagesPath}/fullsize/${image as string}_full.jpg`;
    // const {height, width}:{height: unknown, width: unknown} = req.query;

    const imagesList: string[] = await fs.readdir(`${imagesPath}/resized`);
    if (!imagesList.includes(`${image}_${width}_${height}.jpg`)) {
        if (!!height && !!width) {
            resize(fullImgPth, width, height, outputFile).then(() => {
                res.sendFile(outputFile);
            });
            // res.send(await )
            // sharp(fullImgPth)
            //     .resize({
            //         height: Number(height as string),
            //         width: Number(width as string),
            //     })
            //     .toFile(outputFile)
            //     .then(() => {
            //         res.sendFile(outputFile);
            //     })
            //     .catch((err) => console.log('error from resizing: ', err));
        } else {
            res.send('<img src="https://pbs.twimg.com/media/EtvYqf1XIAM2RcP.jpg" /><br /><h1>provide width AND height , both u must.</h1>');
        }
    } else {
        res.sendFile(outputFile);
        console.log('from else.');
    }
});

images.get('/names', (req, res) => {
    exec(`ls ${imagesPath}/fullsize`, (err, stdout) => {
        res.send(stdout.split('\n').map((el) => el.split('_')[0]));
    });
    console.log('from api names');
});

export default images;
