import express from 'express';
import images from './api/images';

const apiRoutes = express.Router();

apiRoutes.use('/images', images);

export default apiRoutes;
