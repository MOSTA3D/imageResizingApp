import express from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';

const images = express.Router();

export const imagesPath = `${process.env.PWD}/images/`;

export async function resize(
    fullImgPth: string,
    width: unknown,
    height: unknown,
    outputFile: string
) : Promise<void>{
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

async function check(req:express.Request, res:express.Response, next:Function):Promise<void>{
    const fullImgPth = `${imagesPath}/fullsize/`;
    const list = await fs.readdir(fullImgPth);
    const width:unknown = req.query.width;
    const height:unknown = req.query.height;
    const dfMessage = '<img src="https://pbs.twimg.com/media/EtvYqf1XIAM2RcP.jpg" /><br />';
    if(height&&width){
        if(isNaN(Number(width as string))||isNaN(Number(height as string))){
            res.send(`${dfMessage} you must provide width and height in numbers only.`)
        }
        else if(list.includes(`${req.query.image as string}_full.jpg`)){
            next();
        }else{
            res.send(`${dfMessage} you must stick with the images available, get back to root for more information<br/><a href='/'>click</a>`)
        }
    }
    else res.send(`${dfMessage} <h1>provide width AND height , both u must.</h1>`);
}

images.get('/', check, async (req:express.Request, res:express.Response):Promise<void> => {
    // there is error happened while destructuring, even if i specify the object types
    const width: unknown = req.query.width;
    const height: unknown = req.query.height;
    const image: unknown = req.query.image;
    const outputFile = `${imagesPath}/resized/${image}_${width}_${height}.jpg`;
    const fullImgPth = `${imagesPath}/fullsize/${image as string}_full.jpg`;
    // const {height, width}:{height: unknown, width: unknown} = req.query;

    const imagesList: string[] = await fs.readdir(`${imagesPath}/resized`);
    if (!imagesList.includes(`${image}_${width}_${height}.jpg`)) {
            resize(fullImgPth, width, height, outputFile).then(() => {
                res.sendFile(outputFile);
            });
    } else {
        res.sendFile(outputFile);
    }
});

images.get('/names', async (req:express.Request, res:express.Response):Promise<void> => {
    const list:string[] = await fs.readdir(`${imagesPath}/fullsize`);
    res.send(list.map((el:string):string => el.split('_')[0]));
});

export default images;
