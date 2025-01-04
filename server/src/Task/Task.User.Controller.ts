import { BAD_REQUEST, OK } from "http-status-codes";
import FormetResponseSend from "../util/FormetResponseSend";
import { Request, Response } from "express";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import { TaskModel } from "./Task.model";
import mongoose from "mongoose";
import UserModel from "../User/User.model";
import PointModel from "../Point/Point.model";
import { Task_Complete_Model } from "../Task_Complete/Task_Complete.Model";
import axios, { all } from "axios";
import { ExtraTaskModel } from "../ExtraTask/ExtraTask.model";
import { SettingModel } from "../Setting/Setting.Model";
import RewardsTrackingModel from "../Reward Tracking/RewardsTracking.model";

export const ClaimTaskRewards = async (req: any, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { taskId, answer } = req?.body;
        const authUser = req.user?.user;
        const isComplete = await Task_Complete_Model.findOne({ userId: authUser?._id, taskId });
        if (!isComplete?._id) {
            if (taskId) {
                const task = await TaskModel.findById(taskId).session(session);
                const user = await UserModel.findById(authUser?._id).session(session);
                const setting = await SettingModel.findOne({}).session(session);

                if (user?._id) {
                    const point = await PointModel.findOne({ userId: user?._id }).session(session);
                    await ExtraTaskModel.create([{
                        title: "Task Completion!",
                        point: task?.point,
                        userId: user?._id,
                        pointId: point?._id,
                        category: 'task'
                    }], { session: session });

                    if (task?.status as string == "publish") {
                        if (task?.category === "boost") {
                            if (point) {
                                if (task) {
                                    // const fetch = await axios.get(`https://api.telegram.org/bot${}/getChatMember?chat_id=-1001632871243&user_id=${user?.TgId}`);

                                    // if (fetch?.data?.result?.status === "member") {
                                    point.point = Number(point?.point) + Number(task.point);
                                    await point.save();
                                    await Task_Complete_Model.create([{ taskId: taskId, userId: authUser?._id }], { session });

                                    await session.commitTransaction();
                                    await session.endSession();

                                    return res.status(OK).send(FormetResponseSend(OK, "Boost is Completed!", []));
                                    // } else {
                                    //     throw new Error("Boost is not complete!");
                                    // }
                                } else {
                                    throw new Error("Task is missing!");
                                }
                            } else {
                                throw new Error("Point Table is missing!");
                            }
                        } else if (task?.category === "invite") {
                            if (point) {
                                if (task) {
                                    const findRefer = await UserModel.find({ referBy: user?.ReferCode }).session(session);
                                    if (findRefer?.length >= Number(task?.invite)) {
                                        point.point = Number(point?.point) + Number(task.point);
                                        await point.save();
                                        await Task_Complete_Model.create([{ taskId: taskId, userId: authUser?._id }], { session });
                                        await RewardsTrackingModel.create([{ user: user?._id, point: Number(task.point), type: "refer" }], { session });

                                        await session.commitTransaction();
                                        await session.endSession();

                                        return res.status(OK).send(FormetResponseSend(OK, "Refer Mission is Completed!", []));
                                    } else {
                                        throw new Error("Refer is less than mission!");
                                    }
                                } else {
                                    throw new Error("Task is missing!");
                                }
                            } else {
                                throw new Error("Point Table is missing!");
                            }
                        } else {
                            if (point) {
                                if (task) {
                                    point.point = Number(point?.point) + Number(task.point);
                                    await point.save();
                                    await Task_Complete_Model.create([{ taskId: taskId, userId: authUser?._id }], { session });
                                    await RewardsTrackingModel.create([{ user: user?._id, point: Number(task.point), type: "task" }], { session });

                                    await session.commitTransaction();
                                    await session.endSession();

                                    return res.status(OK).send(FormetResponseSend(OK, "Reading is Completed!", []));
                                } else {
                                    throw new Error("Task is missing!");
                                }
                            } else {
                                throw new Error("Point Table is missing!");
                            }
                        }
                    } else {
                        throw new Error("Task is not live!");
                    }
                } else {
                    throw new Error("User is not vaild");
                }
            } else {
                throw new Error("TaskId is required!");
            }
        } else {
            throw new Error("The task is already completed!");
        }

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, []));
        }
    }
}

export const GetIncompleteTasksa = async (req: any, res: Response) => {
    try {
        const authUser = req.user?.user;
        if (!authUser) {
            return res.status(400).send({ message: 'User not found' });
        }

        const completedTasks = await Task_Complete_Model.find({ userId: authUser._id }, 'taskId');
        const completedTaskIds = completedTasks.map(task => task.taskId);

        const incompleteTasks = await TaskModel.find({
            _id: { $nin: completedTaskIds },
            status: 'publish'
        });

        return res.status(200).send(FormetResponseSend(OK, "Incomplete Task", incompleteTasks));
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message || 'An error occurred' });
        }
    }
};

export const GetIncompleteTasks = async (req: any, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const authUser = req.user?.user;
        if (!authUser) {
            return res.status(400).send({ message: 'User not found' });
        }

        const completedTasks = await Task_Complete_Model.find({ userId: authUser._id }).session(session);
        const completedTaskIds = completedTasks.map(task => task.taskId.toString());

        const tasks = await TaskModel.find({}).session(session);

        // Mark tasks as completed or incomplete
        const formattedTasks = tasks.map(task => ({
            ...task.toObject(),
            completed: completedTaskIds.includes(task._id.toString())
        }));

        await session.commitTransaction();
        session.endSession();

        return res.status(200).send(FormetResponseSend(OK, "Incomplete Tasks", formattedTasks));
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message || 'An error occurred' });
        }
    }
};


