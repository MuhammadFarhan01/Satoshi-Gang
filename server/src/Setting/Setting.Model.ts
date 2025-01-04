import mongoose, { model, Schema } from "mongoose";

// Schema Definition
const SettingSchema = new Schema({
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

export const SettingModel = model("setting", SettingSchema);