"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = require("../User/User.Controller");
const DecodeJWT_1 = __importDefault(require("../util/DecodeJWT"));
const Point_Controller_1 = require("../Point/Point.Controller");
const PointRoute = (0, express_1.Router)();
// UserRoute.post("/create-user", authenticateToken, CreateUser)
PointRoute.get("/point-table", DecodeJWT_1.default, Point_Controller_1.GetSingleUserPointByUid);
PointRoute.get("/leaderboard", DecodeJWT_1.default, User_Controller_1.LeaderboardByPoints);
exports.default = PointRoute;
