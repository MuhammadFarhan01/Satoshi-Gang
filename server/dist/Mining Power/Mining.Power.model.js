"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    power: {
        type: Number,
        required: true,
        unique: true
    },
    pph: {
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
const MiningPowerModel = (0, mongoose_1.model)("Mining_Power", schema);
exports.default = MiningPowerModel;
