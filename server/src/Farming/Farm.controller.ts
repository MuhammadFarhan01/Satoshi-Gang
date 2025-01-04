import { NextFunction, Response } from "express";
import { FarmingModel } from "./Farm.model";
import mongoose from "mongoose";
import UserModel from "../User/User.model";
import { BAD_REQUEST, NOT_ACCEPTABLE, NOT_MODIFIED, OK } from "http-status-codes";
import FormetResponseSend from "../util/FormetResponseSend";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import PointModel from "../Point/Point.model";
import { ExtraTaskModel } from "../ExtraTask/ExtraTask.model";
import { SettingModel } from "../Setting/Setting.Model";
import RewardsTrackingModel from "../Reward Tracking/RewardsTracking.model";

export const StartFarming = async (req: any, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        //check is the user iexits? 
        const user = await UserModel.findById(req?.user?.user?._id, {}, { session });
        // check is the user are created any farm entity
        const farm = await FarmingModel.find({ userId: user?._id }, {}, { session }).sort('-createdAt');
        const setting = await SettingModel.findOne({}).session(session);
        if (farm.length) {
            const current_time_stamp = new Date().getTime();
            const isPass = current_time_stamp > Number(farm[0]?.farmingEndTime);
            if (isPass) {
                if (farm[0]?.claim) {

                    // user claim farm reward and time has passed
                    const timestamps = new Date().getTime() + (60000 * Number(setting?.Mining_Time));
                    const result = await FarmingModel.create([{ userId: req?.user?.user?._id, farmingEndTime: timestamps, claim: false }], { session });
                    await session.commitTransaction();
                    await session.endSession();
                    return res.status(OK).send(FormetResponseSend(OK, 'New Farming Actived', result));
                } else {
                    // time pass, but user dosen't claim reward
                    await session.abortTransaction();
                    await session.endSession();
                    return res.status(426).send(FormetResponseErrorSend(426, 'The user has not claimed previous farming rewards.', []))
                }
            } else {
                // 8 hour crycle not completed;
                await session.abortTransaction();
                await session.endSession();
                return res.status(NOT_ACCEPTABLE).send(FormetResponseErrorSend(426, `Please wait until the previous farming cycle is completed, which takes ${setting?.Mining_Time} hours.`, []));
            }
        } else {
            // this is user first farming crycle
            const timestamps = new Date().getTime() + (60000 * Number(setting?.Mining_Time));
            const result = await FarmingModel.create([{ userId: req?.user?.user?._id, farmingEndTime: timestamps, claim: false }], { session });
            await session.commitTransaction();
            await session.endSession();
            return res.status(OK).send(FormetResponseSend(OK, 'New Farming Actived', result));
        }
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
    }
};

export const GetUserFarmingStatus = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req?.user?.user?._id;
        const farming = await FarmingModel.find({ userId: userId }).sort('-createdAt').populate('userId');
        const user = await UserModel.findById(userId);
        const setting = await SettingModel.findOne({}).select([`${user?.MiningRewards ? '' : 'Mining_Rewards'}`, 'Mining_Time']);

        if (farming.length) {
            const current_time_stamp = Date.now();
            const isPass = current_time_stamp > Number(farming[0]?.farmingEndTime);
            console.log({ Mining_Rewards: (user?.MiningRewards) });

            return res.status(OK).send(FormetResponseSend(OK, 'Last farming info...', {
                isPass,
                farm: farming[0],
                setting: {
                    Mining_Time: setting?.Mining_Time,
                    Mining_Rewards: (user?.MiningRewards ? user?.MiningRewards : setting?.Mining_Rewards ? setting?.Mining_Rewards : 0)
                },
            }))
        } else {
            return res.status(OK).send(FormetResponseSend(OK, 'No Farming Data', {
                isPass: true,
                farm: {
                    claim: true
                },
                setting
            }));
        }
    } catch (error: any) {
        return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
    }
};

export const ClaimFarmingRewards = async (req: any, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // get user id
        const userId = req?.user?.user?._id;
        // requested claimed farming entity id
        const farmingId = req?.body?.farmId;

        //find farming entity
        const farm = await FarmingModel.findById(farmingId, {}, { session });
        const setting = await SettingModel.findOne({}).session(session);
        const user = await UserModel.findById(userId).session(session);
        // get currect timestamp
        const current_time_stamp = Date.now();
        // check is time passed
        const isPass = current_time_stamp > Number(farm?.farmingEndTime);
        console.log(isPass);

        if (isPass) {
            if (farm?.claim === false) {
                //mark farm as claim
                await FarmingModel.findByIdAndUpdate(farmingId, { claim: true }, { session });

                // retrive point entity
                const point = await PointModel.findOne({ userId: userId }, {}, { session });

                // updated point 
                const UPoint = Number(point?.point) + Number(user?.MiningRewards ? user?.MiningRewards : setting?.Mining_Rewards);

                await ExtraTaskModel.create([{
                    title: "Farming Complete",
                    point: user?.MiningRewards ? user?.MiningRewards : setting?.Mining_Rewards,
                    userId: user?._id,
                    pointId: point?._id,
                    category: 'farming'
                }], { session: session });

                // add claim point
                await PointModel.findOneAndUpdate({ userId: userId }, { point: UPoint }, { session });
                await RewardsTrackingModel.create([{ user: userId, point: Number(user?.MiningRewards ? user?.MiningRewards : setting?.Mining_Rewards), type: "mining" }], { session });

                await session.commitTransaction();
                await session.endSession();
                return res.status(OK).send(FormetResponseSend(OK, 'Reward Claimed!', []));
            } else {
                await session.abortTransaction();
                await session.endSession();
                return res.status(NOT_MODIFIED).send(FormetResponseErrorSend(NOT_MODIFIED, 'User Already claimed rewards', []));
            }
        } else {
            await session.abortTransaction();
            await session.endSession();

            return res.status(NOT_MODIFIED).send(FormetResponseErrorSend(NOT_MODIFIED, 'Crycle not completed', []));
        }
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
    }
}