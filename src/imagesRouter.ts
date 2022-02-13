import express from 'express';
import fileSystem from './fileSystem.js';

const imagesRouter = express.Router();

imagesRouter.get('/', async (req, res) => {
    await validateReq(req.query)
})

const validateReq = async (query: query) => {
    if (! await fileSystem.checkImage(query.fileName)) {
        return 'filename may be wrong'
    }
}

interface query{
    fileName?: string;
    width?: number;
    height?: number;
}
export default imagesRouter;