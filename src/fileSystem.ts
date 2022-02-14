import { promises as fs } from 'fs';
import path from 'path';
import query from './query.js';
class fileSystem {
  static fullPath = path.resolve(
    __dirname,
    '../assets/images/full',
  );
  static thumbPath = path.resolve(
    __dirname,
    '../assets/images/thumb',
  );
  // get thumb path
  static async getThumbPath() {}

  // check fullimage exist
  static async checkImage(fileName: string='') {
    if (!fileName) {
      return false;
      }
      return (await fs.readdir(fileSystem.fullPath)).map((fileName) => fileName.split('.')[0]).includes(fileName);
      
  }
}

export default fileSystem;