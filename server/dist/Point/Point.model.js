"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PointSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        ref: "user"
    },
    point: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});
const PointModel = (0, mongoose_1.model)("point", PointSchema);
exports.default = PointModel;
