import mongoose from "mongoose";
import { Request, Response } from "express";
import { TUser } from "../User/User.interface";
import RewardsTrackingModel from "./RewardsTracking.model";
import UserModel from "../User/User.model";

export const GetTopMinersLeaderboards = async (req: Request & { user?: { user: TUser } }, res: Response) => {
    const session = await mongoose.startSession();
    try {
        const user = req?.user?.user;
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: "User not authenticated",
            });
        }

        session.startTransaction();

        // Step 1: Fetch the leaderboard (top 100 miners)
        const leaderboard = await RewardsTrackingModel.aggregate([
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
        const userMiningPointsData = await RewardsTrackingModel.find({ user: user._id, type: "mining" }).session(session);
        const userMiningPoints = userMiningPointsData.reduce((sum, item) => sum + (item.point || 0), 0);

        // Step 3: Calculate user's rank
        const userRank = await RewardsTrackingModel.aggregate([
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
        const userProfile = await UserModel.findById(user._id).select("-sensitiveField").session(session);

        await session.commitTransaction();

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
    } catch (error) {
        if (session.inTransaction()) await session.abortTransaction();
        console.error("Error in GetTopMinersLeaderboards:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    } finally {
        session.endSession();
    }
};
