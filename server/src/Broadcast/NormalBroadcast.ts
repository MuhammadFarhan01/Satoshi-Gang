import { Request, Response } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import UserModel from "../User/User.model";
import { bot } from "../app";

const NormalBroadcast = async (req: Request, res: Response) => {
    try {
        const { img, text } = req?.body;
        console.log(img);
        console.log(text);
        
        const users = await UserModel.find({});
        await users.map((item) => {
            bot.telegram.sendPhoto(item?.TgId, img, {
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

export default NormalBroadcast;