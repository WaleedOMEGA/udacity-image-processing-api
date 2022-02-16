"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const fileSystem_1 = __importDefault(require("./../fileSystem"));
describe('test image converting by sharp', () => {
    it('throw error (invalid height value)', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield fileSystem_1.default.createThumb({
            fileName: 'icelandwaterfall',
            width: '200',
            height: '-200',
        });
        expect(error).not.toBeNull();
    }));
    it('throw error (filename does not exist)', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield fileSystem_1.default.createThumb({
            fileName: 'omega',
            width: '100',
            height: '500',
        });
        expect(error).not.toBeNull();
    }));
    // Note: Could also fail because of directory permissions
    it('succeeds to write resized thumb file (existing file, valid size values)', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fileSystem_1.default.createThumb({
            fileName: 'fjord',
            width: '200',
            height: '200',
        });
        const resizedImagePath = path_1.default.resolve(fileSystem_1.default.thumbPath, `fjord-200x200.jpg`);
        let errorFile = '';
        try {
            yield fs_1.promises.access(resizedImagePath);
            errorFile = null;
        }
        catch (_a) {
            errorFile = 'File was not created';
        }
        expect(errorFile).toBeNull();
    }));
});
