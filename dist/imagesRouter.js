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
const express_1 = __importDefault(require('express'));
const fileSystem_1 = __importDefault(require('./fileSystem'));
const imagesRouter = express_1.default.Router();
// main api
imagesRouter.get('/', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const message = yield validateReq(req.query);
    if (message) {
      res.send(message);
      return;
    }
    let error = '';
    // create thumb if not exist
    if (!(yield fileSystem_1.default.checkThumb(req.query))) {
      error = yield fileSystem_1.default.createThumb(req.query);
    }
    // Handle image processing error
    if (error) {
      res.send(error);
      return;
    }
    // Retrieve appropriate image path and display image
    const path = yield fileSystem_1.default.getPath(req.query);
    if (path) {
      res.sendFile(path);
    } else {
      res.send('we encountered an error');
    }
  }),
);
// validate params given
const validateReq = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(query.width || '');
    const height = parseInt(query.height || '');
    if (!(yield fileSystem_1.default.checkImage(query.fileName))) {
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
  });
exports.default = imagesRouter;
