import express from 'express';
import apiRoutes from './routes';

const app = express();
const port = 3000;

// app.use(express.static("public"));

app.use('/api', apiRoutes);
app.get('/', (req, res) => {
    res.sendFile(process.env.PWD + '/public/index.html');
});

app.listen(port, 'localhost', () => {
    console.log('SERVER INIT......');
});

export default app;
