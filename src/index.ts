import express from 'express';
import apiRoutes from './routes';

const app = express();
const port = 3000;

app.use('/api', apiRoutes);
app.get('/', (req:express.Request, res:express.Response):void => {
    res.sendFile(process.env.PWD + '/public/index.html');
});

app.get("*", (req:express.Request, res:express.Response):void=>{
    res.redirect("/");
})

app.listen(port, 'localhost', ():void => {
    console.log('SERVER INIT......');
});

export default app;
