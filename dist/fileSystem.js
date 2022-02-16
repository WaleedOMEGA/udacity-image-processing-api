'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step(
        (generator = generator.apply(
          thisArg,
          _arguments || [],
        )).next(),
      );
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = require('fs');
const path_1 = __importDefault(require('path'));
const convertImage_1 = __importDefault(require('./convertImage'));
class fileSystem {
  // get Path for thumb or full
  static getPath(params) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!params.fileName) {
        return null;
      }
      // Build appropriate path
      const imagePath =
        params.width && params.height
          ? path_1.default.resolve(
              fileSystem.thumbPath,
              `${params.fileName}-${params.width}x${params.height}.jpg`,
            )
          : path_1.default.resolve(
              fileSystem.fullPath,
              `${params.fileName}.jpg`,
            );
      // Check file existence
      try {
        yield fs_1.promises.access(imagePath);
        return imagePath;
      } catch (_a) {
        return null;
      }
    });
  }
  // get path for thumbnails
  static getThumbPath() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield fs_1.promises.access(fileSystem.thumbPath);
        // Path already exist
      } catch (_a) {
        fs_1.promises.mkdir(fileSystem.thumbPath);
      }
    });
  }
  // check fullimage exist
  static checkImage(fileName = '') {
    return __awaiter(this, void 0, void 0, function* () {
      if (!fileName) {
        return false;
      }
      return (yield fs_1.promises.readdir(fileSystem.fullPath))
        .map((fileName) => fileName.split('.')[0])
        .includes(fileName);
    });
  }
  // check thumbnail exists
  static checkThumb(params) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!params.fileName || !params.width || !params.height) {
        return false;
      }
      // Set appropriate path
      const filePath = path_1.default.resolve(
        fileSystem.thumbPath,
        `${params.fileName}-${params.width}x${params.height}.jpg`,
      );
      try {
        yield fs_1.promises.access(filePath);
        return true;
      } catch (_a) {
        return false;
      }
    });
  }
  // convert thumbnail
  static createThumb(params) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!params.fileName || !params.width || !params.height) {
        return null;
      }
      const fullPath = path_1.default.resolve(
        fileSystem.fullPath,
        `${params.fileName}.jpg`,
      );
      const thumbPath = path_1.default.resolve(
        fileSystem.thumbPath,
        `${params.fileName}-${params.width}x${params.height}.jpg`,
      );
      console.log(`Creating thumb ${thumbPath}`);
      // convert image
      return yield (0, convertImage_1.default)({
        source: fullPath,
        target: thumbPath,
        width: parseInt(params.width),
        height: parseInt(params.height),
      });
    });
  }
}
// paths
fileSystem.fullPath = path_1.default.resolve(
  __dirname,
  '../assets/images/full',
);
fileSystem.thumbPath = path_1.default.resolve(
  __dirname,
  '../assets/images/thumb',
);
exports.default = fileSystem;
