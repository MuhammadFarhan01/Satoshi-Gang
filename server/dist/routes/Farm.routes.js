"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DecodeJWT_1 = __importDefault(require("../util/DecodeJWT"));
const Farm_controller_1 = require("../Farming/Farm.controller");
const FarmRoute = (0, express_1.Router)();
// UserRoute.post("/create-user", authenticateToken, CreateUser)
FarmRoute.post("/start-farming", DecodeJWT_1.default, Farm_controller_1.StartFarming);
FarmRoute.get("/get-farming-status", DecodeJWT_1.default, Farm_controller_1.GetUserFarmingStatus);
FarmRoute.post("/claim-farming-rewards", DecodeJWT_1.default, Farm_controller_1.ClaimFarmingRewards);
exports.default = FarmRoute;
