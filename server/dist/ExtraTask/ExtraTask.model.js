"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraTaskModel = void 0;
const mongoose_1 = require("mongoose");
const ExtraTaskSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    pointId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "point"
    },
    point: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['refer', 'transection', 'checking', 'story', 'farming', 'task'],
        required: true,
    },
    walletInfo: String
}, { timestamps: true });
exports.ExtraTaskModel = (0, mongoose_1.model)("extra_task", ExtraTaskSchema);
