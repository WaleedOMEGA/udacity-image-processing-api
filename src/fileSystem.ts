import { promises as fs } from 'fs';
import path from 'path';
import convertImage from './convertImage';
import query from './query';
class fileSystem {
  // paths
  static fullPath = path.resolve(__dirname, '../assets/images/full');
  static thumbPath = path.resolve(
    __dirname,
    '../assets/images/thumb',
  );

  // get Path for thumb or full
  static async getPath(params: query): Promise<null | string> {
    if (!params.fileName) {
      return null;
    }

    // Build appropriate path
    const imagePath: string =
      params.width && params.height
        ? path.resolve(
            fileSystem.thumbPath,
            `${params.fileName}-${params.width}x${params.height}.jpg`,
          )
        : path.resolve(fileSystem.fullPath, `${params.fileName}.jpg`);

    // Check file existence
    try {
      await fs.access(imagePath);
      return imagePath;
    } catch {
      return null;
    }
  }
  // get path for thumbnails
  static async getThumbPath() {
    try {
      await fs.access(fileSystem.thumbPath);
      // Path already exist
    } catch {
      fs.mkdir(fileSystem.thumbPath);
    }
  }

  // check fullimage exist
  static async checkImage(fileName = '') {
    if (!fileName) {
      return false;
    }
    return (await fs.readdir(fileSystem.fullPath))
      .map((fileName) => fileName.split('.')[0])
      .includes(fileName);
  }
  // check thumbnail exists
  static async checkThumb(params: query): Promise<boolean> {
    if (!params.fileName || !params.width || !params.height) {
      return false;
    }

    // Set appropriate path
    const filePath: string = path.resolve(
      fileSystem.thumbPath,
      `${params.fileName}-${params.width}x${params.height}.jpg`,
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
  // convert thumbnail
  static async createThumb(params: query): Promise<null | string> {
    if (!params.fileName || !params.width || !params.height) {
      return null;
    }

    const fullPath: string = path.resolve(
      fileSystem.fullPath,
      `${params.fileName}.jpg`,
    );
    const thumbPath: string = path.resolve(
      fileSystem.thumbPath,
      `${params.fileName}-${params.width}x${params.height}.jpg`,
    );

    console.log(`Creating thumb ${thumbPath}`);

    // convert image
    return await convertImage({
      source: fullPath,
      target: thumbPath,
      width: parseInt(params.width),
      height: parseInt(params.height),
    });
  }
}

export default fileSystem;
