import express from 'express';
import fileSystem from './fileSystem';
import query from './query';
const imagesRouter = express.Router();

// main api
imagesRouter.get('/', async (req, res): Promise<void> => {
  const message: null | string = await validateReq(req.query);
  if (message) {
    res.send(message);
    return;
  }
  let error: null | string = '';

  // create thumb if not exist
  if (!(await fileSystem.checkThumb(req.query))) {
    error = await fileSystem.createThumb(req.query);
  }

  // Handle image processing error
  if (error) {
    res.send(error);
    return;
  }

  // Retrieve appropriate image path and display image
  const path: null | string = await fileSystem.getPath(req.query);
  if (path) {
    res.sendFile(path);
  } else {
    res.send('we encountered an error');
  }
});

// validate params given
const validateReq = async (query: query): Promise<null | string> => {
  const width: number = parseInt(query.width || '');
  const height: number = parseInt(query.height || '');
  if (!(await fileSystem.checkImage(query.fileName))) {
    return 'filename may be wrong';
  }
  if (!query.width && !query.height) {
    return null;
  }
  if (
    Number.isNaN(width) ||
    width < 1 ||
    Number.isNaN(height) ||
    height < 1
  ) {
    return 'width and height must be positive numbers';
  }
  return null;
};

export default imagesRouter;
