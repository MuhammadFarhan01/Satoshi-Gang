import { NextFunction, Request, Response } from "express";
import SendErrorThroghNextFunc from "../util/SendErrorThroghNextFunc";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes";
import PointModel from "./Point.model";
import FormetResponseSend from "../util/FormetResponseSend";

export const GetSingleUserPointByUid = async (req: any, res: Response, next: NextFunction) => {
    try {
        // Find the specific user's point data
        const point_result = await PointModel.findOne({ userId: req?.user?.user?._id }).populate('userId');
        
        if (!point_result) {
            return SendErrorThroghNextFunc({ msg: 'Point Table Not Found!', status: NOT_FOUND, next });
        }

        // Retrieve all users' points sorted by point in descending order
        const allUsers = await PointModel.find().sort({ point: -1 });

        // Find the rank of the specific user
        const rank = allUsers.findIndex(user => user.userId.toString() === req?.user?.user?._id.toString()) + 1;

        // Formatted response including user points and rank
        return res.status(OK).send(
            FormetResponseSend(OK, "User Point Table Retrieved", {
                userId: req?.user?.user?._id,
                points: point_result,
                rank: rank
            })
        );
    } catch (error: any) {
        // Handle errors with proper message and status
        return SendErrorThroghNextFunc({ status: BAD_REQUEST, msg: error?.message, next });
    }
};
