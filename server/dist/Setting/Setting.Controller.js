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
exports.UpdateSetting = exports.GetSetting = exports.MatchSecretCode = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Setting_Model_1 = require("./Setting.Model");
const MatchSecretCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { secret: SecretCode } = req.body;
        const Matching = yield Setting_Model_1.SettingModel.findOne({ SecretCode }, {}, { session });
        if (Matching) {
            yield session.commitTransaction();
            return res.status(200).send({
                msg: 'Secret is matched!',
                data: { ping: true },
                statusCode: 200
            });
        }
        else {
            const GetData = yield Setting_Model_1.SettingModel.find({}, {}, { session });
            const init = {
                SecretCode,
                ReferComission: "0",
                ReferredUserBonus: "0",
                ReferrerBonus: "0",
                AccountCreationReward: "0",
                Mining_Rewards: "0",
                Mining_Time: "0",
                BotToken: "#",
                TonTransectionTonAmount: "0",
                MiniAppLink: "#",
                BotLink: "#",
                TelegramChannel: "#",
                StatusMedia: "#",
                Symbol: "#",
                ProjectName: "#",
                TonAddress: "#",
                TransectionRewards: "#",
                WelcomeMessage: "#",
                WelcomeBanner: "#",
                isExsit: true,
                Maintaince: "no"
            };
            if ((GetData === null || GetData === void 0 ? void 0 : GetData.length) === 0) {
                yield Setting_Model_1.SettingModel.create([init], { session });
                yield session.commitTransaction();
                return res.status(200).send({
                    msg: 'New Secret is created!',
                    data: { ping: true },
                    statusCode: 200
                });
            }
            else {
                throw new Error("Secret Code is not matching...");
            }
        }
    }
    catch (error) {
        yield session.abortTransaction();
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error.message,
                data: { ping: false },
                statusCode: 400
            });
        }
        return res.status(500).send('Something went wrong');
    }
    finally {
        session.endSession();
    }
});
exports.MatchSecretCode = MatchSecretCode;
// Get Setting Handler
const GetSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document = yield Setting_Model_1.SettingModel.findOne({});
        if (!document) {
            return res.status(404).send({
                msg: 'No document found',
                statusCode: 404
            });
        }
        return res.status(200).send({
            msg: 'Document fetched successfully!',
            data: document,
            statusCode: 200
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error.message,
                statusCode: 400
            });
        }
        return res.status(500).send('Something went wrong');
    }
});
exports.GetSetting = GetSetting;
const UpdateSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        const document = yield Setting_Model_1.SettingModel.findOne().session(session);
        if (!document) {
            throw new Error("No data found");
        }
        const updatedDocument = yield Setting_Model_1.SettingModel.findOneAndUpdate({}, body, { new: true, session });
        if (!updatedDocument) {
            throw new Error("No document found to update.");
        }
        yield session.commitTransaction();
        return res.status(200).send({
            msg: 'Setting updated successfully!',
            data: updatedDocument,
            statusCode: 200
        });
    }
    catch (error) {
        yield session.abortTransaction();
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error.message,
                statusCode: 400
            });
        }
        return res.status(500).send('Something went wrong');
    }
    finally {
        session.endSession();
    }
});
exports.UpdateSetting = UpdateSetting;
