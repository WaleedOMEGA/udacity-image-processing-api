import express from 'express';
import fileSystem from './fileSystem.js';
import query from './query.js'
const imagesRouter = express.Router();

imagesRouter.get('/', async (req, res): Promise<void> => {
    const message: null | string = await validateReq(req.query);
    if (message) {
        res.send(message);
        return;
    }
});

const validateReq = async (query: query): Promise<null | string> => {
    const width: number = parseInt(query.width || '');
    const height: number = parseInt(query.height || '');
  if (!(await fileSystem.checkImage(query.fileName))) {
    return 'filename may be wrong';
    }
    if (!query.width && !query.height) {
        return null
    }
    if (Number.isNaN(width) || width < 1 || Number.isNaN(height) || height < 1) {
    return 'width and height must be positive numbers'
}
    return null
};


export default imagesRouter;