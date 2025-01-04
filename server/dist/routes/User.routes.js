"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DecodeJWT_1 = __importDefault(require("../util/DecodeJWT"));
const User_Controller_1 = require("../User/User.Controller");
const GetTopMinersLeaderboards_1 = require("../Reward Tracking/GetTopMinersLeaderboards");
const UserRoute = (0, express_1.Router)();
// UserRoute.post("/create-user", authenticateToken, CreateUser)
UserRoute.post("/create-user", User_Controller_1.CreateUser);
UserRoute.get("/MyInfo", DecodeJWT_1.default, User_Controller_1.MyInfo);
UserRoute.post("/boost-mining", DecodeJWT_1.default, User_Controller_1.MiningBoosting);
UserRoute.get("/ReferList", DecodeJWT_1.default, User_Controller_1.ReferList);
UserRoute.get("/all-user-admin", User_Controller_1.AdminAllUserList);
UserRoute.put("/update-user-from-admin", User_Controller_1.UpdateUserInformission);
UserRoute.put("/splash-seen", DecodeJWT_1.default, User_Controller_1.UserSeenSplash);
UserRoute.get('/miners-leaderboard', DecodeJWT_1.default, GetTopMinersLeaderboards_1.GetTopMinersLeaderboards);
exports.default = UserRoute;
