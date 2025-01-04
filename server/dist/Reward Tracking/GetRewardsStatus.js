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
exports.GetRewardsStatus = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const FormetResponseSend_1 = __importDefault(require("../util/FormetResponseSend"));
const FormetResponseErrorSend_1 = __importDefault(require("../util/FormetResponseErrorSend"));
const RewardsTracking_model_1 = __importDefault(require("./RewardsTracking.model"));
const GetRewardsStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
        const rewards = yield RewardsTracking_model_1.default.find({ user: authUser }).session(session);
        let refer = 0;
        let task = 0;
        let mining = 0;
        let daily_checking = 0;
        rewards.filter(reward => {
            if ((reward === null || reward === void 0 ? void 0 : reward.type) === "refer") {
                refer += reward.point;
            }
            else if ((reward === null || reward === void 0 ? void 0 : reward.type) === "task") {
                task += reward.point;
            }
            else if ((reward === null || reward === void 0 ? void 0 : reward.type) === "daily_checking") {
                daily_checking += reward.point;
            }
            else if ((reward === null || reward === void 0 ? void 0 : reward.type) === "mining") {
                mining += reward.point;
            }
        });
        yield session.commitTransaction();
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'Reward Tracking Added!', { refer, task, mining, daily_checking }));
    }
    catch (error) {
        if (error instanceof Error) {
            yield session.abortTransaction();
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
        }
    }
    finally {
        session.endSession();
    }
});
exports.GetRewardsStatus = GetRewardsStatus;
