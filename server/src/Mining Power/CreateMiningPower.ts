import { Request, Response } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import MiningPowerModel from "./Mining.Power.model";
import FormetResponseSend from "../util/FormetResponseSend";

const CreateMiningPower = async (req: Request, res: Response) => {
    try {
        const body = req?.body;
        const result = await MiningPowerModel.create([body]);
        return res.status(OK).send(FormetResponseSend(OK, 'New Power House Created!', result));
    } catch (error) {
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
        }
    }
};

export default CreateMiningPower;