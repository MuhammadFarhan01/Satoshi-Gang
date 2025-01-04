import { Request, Response } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import FormetResponseSend from "../util/FormetResponseSend";
import PointHouseModel from "./Mining.Power.model";

const GetAllPointHouse = async (req: Request, res: Response) => {
    try {

        const result = await PointHouseModel.find({});
        return res.status(OK).send(FormetResponseSend(OK, 'All Point House!', result));
    } catch (error) {
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
        }
    }
};

export default GetAllPointHouse;