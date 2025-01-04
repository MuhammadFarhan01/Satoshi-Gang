import { Request, Response } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import MiningPowerModel from "./Mining.Power.model";
import FormetResponseSend from "../util/FormetResponseSend";

const DeleteMiningPower = async (req: Request, res: Response) => {
    try {
        const query = req?.query;
        const result = await MiningPowerModel.findByIdAndDelete(query?.id);
        return res.status(OK).send(FormetResponseSend(OK, 'Power House Deleted!', result));
    } catch (error) {
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
        }
    }
};

export default DeleteMiningPower;