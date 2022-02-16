import express from 'express';
import imagesRouter from './imagesRouter';

const routes = express.Router();
// router for images
routes.use('/api/images', imagesRouter);
// general route
routes.get('/', (req, res): void => {
  res.send('Welcome');
});
export default routes;
