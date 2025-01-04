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
const http_status_codes_1 = require("http-status-codes");
const FormetResponseErrorSend_1 = __importDefault(require("../util/FormetResponseErrorSend"));
const Mining_Power_model_1 = __importDefault(require("./Mining.Power.model"));
const FormetResponseSend_1 = __importDefault(require("../util/FormetResponseSend"));
const CreateMiningPower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        const result = yield Mining_Power_model_1.default.create([body]);
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'New Power House Created!', result));
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
        }
    }
});
exports.default = CreateMiningPower;
