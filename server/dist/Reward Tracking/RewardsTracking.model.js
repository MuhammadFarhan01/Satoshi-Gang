"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.ObjectId,
        required: true,
        ref: "user"
    },
    point: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["mining", "refer", "task", "daily_checking"],
        required: true
    },
}, {
    timestamps: true
});
const RewardsTrackingModel = (0, mongoose_1.model)("reward_tracking", schema);
exports.default = RewardsTrackingModel;
