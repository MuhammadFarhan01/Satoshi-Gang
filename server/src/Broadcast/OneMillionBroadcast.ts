import { Request, Response } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import { bot } from "../app";
import { model, Schema } from "mongoose";

const schema = new Schema({
    userId: {
        type: Number
    }
});

const OneMillionUser = model("telegramUser", schema);

const OneMillionBroadcast = async (req: Request, res: Response) => {
    try {
        const { img, text } = req?.body;

        const users = await OneMillionUser.find({});
        await users.map((item) => {
            bot.telegram.sendPhoto(item?.id, img, {
                caption: text,
            })
        })

        return res.status(OK).send({
            status: OK
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send({
                status: BAD_REQUEST
            })
        }
    }
}

export default OneMillionBroadcast;