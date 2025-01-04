"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTopMinersLeaderboards = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RewardsTracking_model_1 = __importDefault(require("./RewardsTracking.model"));
const User_model_1 = __importDefault(require("../User/User.model"));
const GetTopMinersLeaderboards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    try {
        const user = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user;
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: "User not authenticated",
            });
        }
        session.startTransaction();
        // Step 1: Fetch the leaderboard (top 100 miners)
        const leaderboard = yield RewardsTracking_model_1.default.aggregate([
            { $match: { type: "mining" } },
            {
                $group: {
                    _id: "$user",
                    point: { $sum: "$point" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $project: {
                    point: 1,
                    userId: { $arrayElemAt: ["$userDetails", 0] }
                }
            },
            { $sort: { point: -1 } },
            { $limit: 100 }
        ]).session(session);
        // Step 2: Calculate total mining points for the user
        const userMiningPointsData = yield RewardsTracking_model_1.default.find({ user: user._id, type: "mining" }).session(session);
        const userMiningPoints = userMiningPointsData.reduce((sum, item) => sum + (item.point || 0), 0);
        // Step 3: Calculate user's rank
        const userRank = yield RewardsTracking_model_1.default.aggregate([
            { $match: { type: "mining" } },
            {
                $group: {
                    _id: "$user",
                    totalMiningPoints: { $sum: "$point" }
                }
            },
            { $match: { totalMiningPoints: { $gt: userMiningPoints } } },
            { $count: "rankAboveUser" }
        ]).session(session);
        // Step 4: Fetch the user's profile details
        const userProfile = yield User_model_1.default.findById(user._id).select("-sensitiveField").session(session);
        yield session.commitTransaction();
        return res.status(200).json({
            statusCode: 200,
            message: "Top Miners Leaderboard",
            data: {
                user: {
                    userRank: userRank.length > 0 ? userRank[0].rankAboveUser + 1 : 1,
                    User: {
                        point: userMiningPoints,
                        userId: userProfile || null
                    }
                },
                leaderboard
            }
        });
    }
    catch (error) {
        if (session.inTransaction())
            yield session.abortTransaction();
        console.error("Error in GetTopMinersLeaderboards:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
    finally {
        session.endSession();
    }
});
exports.GetTopMinersLeaderboards = GetTopMinersLeaderboards;
