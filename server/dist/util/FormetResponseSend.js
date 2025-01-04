"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormetResponseSend = (status, Message, data) => {
    return {
        status,
        message: Message,
        data
    };
};
exports.default = FormetResponseSend;
