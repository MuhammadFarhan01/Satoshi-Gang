import { Request, Response } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import FormetResponseSend from "../util/FormetResponseSend";
import PointHouseModel from "./Mining.Power.model";

const CreatePointHouse = async (req: Request, res: Response) => {
    try {
        const body = req?.body;
        const result = await PointHouseModel.create([body]);
        return res.status(OK).send(FormetResponseSend(OK, 'Point House Created!', result));
    } catch (error) {
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
        }
    }
};

export default CreatePointHouse;