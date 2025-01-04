import { Request, Response } from "express";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import { ITask } from "./Task.Interface";
import { TaskModel } from "./Task.model";
import mongoose from "mongoose";
import FormetResponseSend from "../util/FormetResponseSend";

export const CreateNewTask = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const body: ITask = req.body;
        const { answer, question, context, ...task_body } = body;
        let result;
        result = await TaskModel.create([task_body], { session });

        await session.commitTransaction();
        await session.endSession();
        return res.status(OK).send(FormetResponseSend(OK, "New Task Created!", result));
    } catch (error) {
        if (error instanceof Error) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error.stack));
        }
    }
}

export const GetAllTaskAdmin = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const task = await TaskModel.find({});
        await session.commitTransaction();
        await session.endSession();
        return res.status(OK).send(FormetResponseSend(OK, "All task retrive!", task));
    } catch (error) {
        if (error instanceof Error) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error.stack));
        }
    }
}

export const UpdateTaskAdmin = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const body = req.body;
        const task = await TaskModel.findById(body.id);
        if (task?._id) {
            task.title = body.title ? body.title : task.title;
            task.point = body.point ? body.point : task.point;
            task.status = body.status ? body.status : task.status;
            await task.save();
            await session.commitTransaction();
            await session.endSession();
            return res.status(OK).send(FormetResponseSend(OK, "The task is updated!", task));
        } else {
            await session.abortTransaction();
            await session.endSession();
            return res.status(NOT_FOUND).send(FormetResponseErrorSend(NOT_FOUND, 'Task is not found...', []));
        }
    } catch (error) {
        if (error instanceof Error) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error.stack));
        }
    }
}

export const DeleteTaskAdmin = async (req: Request, res: Response) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req?.body?.id);
        return res.status(OK).send(FormetResponseSend(OK, "Task deleted!", task));
    } catch (error) {
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error.stack));
        }
    }
}