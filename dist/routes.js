"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesRouter_1 = __importDefault(require("./imagesRouter"));
const routes = express_1.default.Router();
// router for images
routes.use('/api/images', imagesRouter_1.default);
// general route
routes.get('/', (req, res) => {
    res.send('Welcome');
});
exports.default = routes;
