import sharp from 'sharp';
import sharpParams from './sharpParam';

// resize image with sharp
const convertImage = async (
  params: sharpParams,
): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpeg')
      .toFile(params.target);
    return null;
  } catch {
    return 'there was an error while trying converting image';
  }
};

export default convertImage;
