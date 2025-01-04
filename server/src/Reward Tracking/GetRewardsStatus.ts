import { Response } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import mongoose from "mongoose";
import FormetResponseSend from "../util/FormetResponseSend";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import RewardsTrackingModel from "./RewardsTracking.model";

export const GetRewardsStatus = async (req: any, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { user: authUser } = req?.user;

        const rewards = await RewardsTrackingModel.find({ user: authUser }).session(session);
        let refer = 0;
        let task = 0;
        let mining = 0;
        let daily_checking = 0;
        rewards.filter(reward => {
            if (reward?.type === "refer") {
                refer += reward.point;
            } else if (reward?.type === "task") {
                task += reward.point;
            } else if (reward?.type === "daily_checking") {
                daily_checking += reward.point;
            } else if (reward?.type === "mining") {
                mining += reward.point;
            }
        });

        await session.commitTransaction();
        return res.status(OK).send(FormetResponseSend(OK, 'Reward Tracking Added!', { refer, task, mining, daily_checking }));
    } catch (error) {
        if (error instanceof Error) {
            await session.abortTransaction();
            return res.status(BAD_REQUEST).send(
                FormetResponseErrorSend(BAD_REQUEST, error.message, error)
            );
        }
    } finally {
        session.endSession();
    }
};