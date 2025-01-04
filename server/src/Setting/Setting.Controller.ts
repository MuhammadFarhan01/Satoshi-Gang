import { Request, Response } from "express";
import mongoose from "mongoose";
import { SettingModel } from "./Setting.Model";

export const MatchSecretCode = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { secret: SecretCode } = req.body;
        const Matching = await SettingModel.findOne({ SecretCode }, {}, { session });
        
        if (Matching) {
            await session.commitTransaction();
            return res.status(200).send({
                msg: 'Secret is matched!',
                data: { ping: true },
                statusCode: 200
            });
        } else {
            const GetData = await SettingModel.find({}, {}, { session });
            const init = {
                SecretCode,
                ReferComission: "0",
                ReferredUserBonus: "0",
                ReferrerBonus: "0",
                AccountCreationReward: "0",
                Mining_Rewards: "0",
                Mining_Time: "0",
                BotToken: "#",
                TonTransectionTonAmount: "0",
                MiniAppLink: "#",
                BotLink: "#",
                TelegramChannel: "#",
                StatusMedia: "#",
                Symbol: "#",
                ProjectName: "#",
                TonAddress: "#",
                TransectionRewards: "#",
                WelcomeMessage: "#",
                WelcomeBanner: "#",
                isExsit: true,
                Maintaince: "no"
            };

            if (GetData?.length === 0) {
                await SettingModel.create([init], { session });
                await session.commitTransaction();
                return res.status(200).send({
                    msg: 'New Secret is created!',
                    data: { ping: true },
                    statusCode: 200
                });
            } else {
                throw new Error("Secret Code is not matching...");
            }
        }
    } catch (error) {
        await session.abortTransaction();
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error.message,
                data: { ping: false },
                statusCode: 400
            });
        }
        return res.status(500).send('Something went wrong');
    } finally {
        session.endSession();
    }
};

// Get Setting Handler
export const GetSetting = async (req: Request, res: Response) => {
    try {
        const document = await SettingModel.findOne({});
        if (!document) {
            return res.status(404).send({
                msg: 'No document found',
                statusCode: 404
            });
        }

        return res.status(200).send({
            msg: 'Document fetched successfully!',
            data: document,
            statusCode: 200
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error.message,
                statusCode: 400
            });
        }
        return res.status(500).send('Something went wrong');
    }
};

export const UpdateSetting = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const body = req?.body;

        const document = await SettingModel.findOne().session(session);
        if (!document) {
            throw new Error("No data found");
        }
        const updatedDocument = await SettingModel.findOneAndUpdate(
            {},
            body,
            { new: true, session }
        );

        if (!updatedDocument) {
            throw new Error("No document found to update.");
        }

        await session.commitTransaction();
        return res.status(200).send({
            msg: 'Setting updated successfully!',
            data: updatedDocument,
            statusCode: 200
        });

    } catch (error) {
        await session.abortTransaction();
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error.message,
                statusCode: 400
            });
        }
        return res.status(500).send('Something went wrong');
    } finally {
        session.endSession();
    }
};
