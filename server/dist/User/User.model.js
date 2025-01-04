"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
    },
    TgId: {
        type: Number,
        required: true,
        unique: true
    },
    ReferCode: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    isNew: {
        type: Boolean,
        required: true
    },
    referBy: String,
    MiningRewards: String,
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)("user", CSchema);
exports.default = UserModel;
