"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesRouter_js_1 = __importDefault(require("./imagesRouter.js"));
const routes = express_1.default.Router();
routes.use('/api/images', imagesRouter_js_1.default);
routes.get('/', (req, res) => {
    res.send('hello world');
});
exports.default = routes;
