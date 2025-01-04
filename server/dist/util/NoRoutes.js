"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const FormetResponseSend_1 = __importDefault(require("./FormetResponseSend"));
const NoRoutes = (req, res, next) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json((0, FormetResponseSend_1.default)(http_status_codes_1.NOT_FOUND, 'No Api on the routes', []));
};
exports.default = NoRoutes;
