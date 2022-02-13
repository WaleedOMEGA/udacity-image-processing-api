import express from 'express';
import imagesRouter from './imagesRouter.js';

const routes = express.Router();
routes.use('/api/images', imagesRouter);
routes.get('/', (req, res) => {
    res.send('hello world')
})
export default routes;