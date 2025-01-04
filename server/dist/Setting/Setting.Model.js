"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModel = void 0;
const mongoose_1 = require("mongoose");
// Schema Definition
const SettingSchema = new mongoose_1.Schema({
    SecretCode: Number,
    ReferComission: String,
    ReferrerBonus: String,
    ReferredUserBonus: String,
    AccountCreationReward: String,
    Mining_Time: String,
    Mining_Rewards: String,
    TelegramChannel: String,
    BotToken: String,
    StatusMedia: String,
    MiniAppLink: String,
    BotLink: String,
    Symbol: String,
    ProjectName: String,
    TonAddress: String,
    TransectionRewards: String,
    WelcomeMessage: String,
    WelcomeBanner: String,
    TonTransectionTonAmount: String,
    isExsit: {
        type: String,
        required: true,
        unique: true,
        default: true
    },
    Maintaince: { type: String, default: "no" }
});
exports.SettingModel = (0, mongoose_1.model)("setting", SettingSchema);
