"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    token: {
        type: Number,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true
});
const PointHouseModel = (0, mongoose_1.model)("Point_House", schema);
exports.default = PointHouseModel;
