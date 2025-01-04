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
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../app");
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: {
        type: Number
    }
});
const OneMillionUser = (0, mongoose_1.model)("telegramUser", schema);
const OneMillionBroadcast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { img, text } = req === null || req === void 0 ? void 0 : req.body;
        const users = yield OneMillionUser.find({});
        yield users.map((item) => {
            app_1.bot.telegram.sendPhoto(item === null || item === void 0 ? void 0 : item.id, img, {
                caption: text,
            });
        });
        return res.status(http_status_codes_1.OK).send({
            status: http_status_codes_1.OK
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(http_status_codes_1.BAD_REQUEST).send({
                status: http_status_codes_1.BAD_REQUEST
            });
        }
    }
});
exports.default = OneMillionBroadcast;
