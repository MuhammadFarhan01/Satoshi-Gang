"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, "this-is-secret", (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
exports.default = authenticateToken;
