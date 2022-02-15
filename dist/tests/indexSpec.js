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
const request = require('supertest');
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const fileSystem_1 = __importDefault(require("./../fileSystem"));
describe('Test responses from endpoints', () => {
    describe('endpoint: /', () => {
        it('gets /', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/');
            expect(res.status).toBe(200);
        }));
    });
    describe('endpoint: /api/images', () => {
        it('gets /api/images?filename=fjord (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?filename=fjord');
            expect(res.status).toBe(200);
        }));
        it('gets /api/images?filename=fjord&width=199&height=199 (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?filename=fjord&width=199&height=199');
            expect(res.status).toBe(200);
        }));
        it('gets /api/images?filename=fjord&width=-200&height=200 (invalid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?filename=fjord&width=-200&height=200');
            expect(res.status).toBe(200);
        }));
        it('gets /api/images (no arguments)', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images');
            expect(res.status).toBe(200);
        }));
    });
    describe('endpoint: /foo', () => {
        it('returns 404 for invalid endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/foo');
            expect(res.status).toBe(404);
        }));
    });
});
// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const convertedImagePath = path_1.default.resolve(fileSystem_1.default.thumbPath, 'fjord-199x199.jpg');
    try {
        yield fs_1.promises.access(convertedImagePath);
        fs_1.promises.unlink(convertedImagePath);
    }
    catch (_a) {
        // intentionally left blank
    }
}));
