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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('test responses from api', () => {
    describe('api: /', () => {
        it('gets /', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/');
            expect(res.status).toBe(200);
        }));
    });
    describe('api: /api/images', () => {
        it('gets /api/images?filename=icelandwaterfall (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?filename=icelandwaterfall');
            expect(res.status).toBe(200);
        }));
        it('gets /api/images?filename=icelandwaterfall&width=200&height=200 (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?filename=icelandwaterfall&width=200&height=200');
            expect(res.status).toBe(200);
        }));
        it('gets /api/images?filename=icelandwaterfall&width=-200&height=200 (invalid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?filename=icelandwaterfall&width=-200&height=200');
            expect(res.status).toBe(200);
        }));
        it('gets /api/images (no arguments)', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images');
            expect(res.status).toBe(200);
        }));
    });
    describe('endpoint: /omega', () => {
        it('returns 404 for invalid endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/omega');
            expect(res.status).toBe(404);
        }));
    });
});
