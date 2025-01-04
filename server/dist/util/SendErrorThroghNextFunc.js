"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SendErrorThroghNextFunc = ({ status, msg, next }) => {
    return next({
        status: status,
        error: msg
    });
};
exports.default = SendErrorThroghNextFunc;
