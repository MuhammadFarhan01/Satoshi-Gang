"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateMiningPower_1 = __importDefault(require("../Mining Power/CreateMiningPower"));
const GetAllMiningPower_1 = __importDefault(require("../Mining Power/GetAllMiningPower"));
const DeleteMiningPower_1 = __importDefault(require("../Mining Power/DeleteMiningPower"));
const MiningPowerRoute = (0, express_1.Router)();
MiningPowerRoute.post("/create-mining-power", CreateMiningPower_1.default);
MiningPowerRoute.get("/get-mining-power", GetAllMiningPower_1.default);
MiningPowerRoute.delete("/delete-mining-power", DeleteMiningPower_1.default);
exports.default = MiningPowerRoute;
