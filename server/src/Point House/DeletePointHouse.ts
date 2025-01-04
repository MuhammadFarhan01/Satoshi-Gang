import { Request, Response } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import FormetResponseSend from "../util/FormetResponseSend";
import PointHouseModel from "./Mining.Power.model";

const DeletePointHouse = async (req: Request, res: Response) => {
    try {
        const query = req?.query;
        const result = await PointHouseModel.findByIdAndDelete(query?.id);
        return res.status(OK).send(FormetResponseSend(OK, 'Point House Deleted!', result));
    } catch (error) {
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
        }
    }
};

export default DeletePointHouse;