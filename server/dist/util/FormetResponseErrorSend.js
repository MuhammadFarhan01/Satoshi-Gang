"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormetResponseErrorSend = (status, errorMessage, error) => {
    return {
        status,
        errorMessage,
        error
    };
};
exports.default = FormetResponseErrorSend;
