"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormetResponseErrorSend_1 = __importDefault(require("./FormetResponseErrorSend"));
const GlobalErrorHandler = (error, req, res, next) => {
    var _a;
    return res.status(error === null || error === void 0 ? void 0 : error.status).json((0, FormetResponseErrorSend_1.default)(error === null || error === void 0 ? void 0 : error.status, (_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.error));
};
exports.default = GlobalErrorHandler;
