import { Request, Response } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import PointHouseModel from "./Mining.Power.model";
import FormetResponseSend from "../util/FormetResponseSend";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import mongoose from "mongoose";
import UserModel from "../User/User.model";
import { TUser } from "../User/User.interface";
import PointModel from "../Point/Point.model";

const PurchasePointHouse = async (req: any, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const id = req?.body?.id;
        const { user }: { user: TUser } = req?.user;
        
        // Retrieve `point_house` and `point` within the transaction
        const point_house = await PointHouseModel.findById(id).session(session);
        const point = await PointModel.findOne({ userId: user?._id }).session(session);
        
        // Update points if a valid `point` object is found
        if (point?._id) {
            point.point = Number(point.point) + Number(point_house?.token);
            await point.save({ session }); // Await the save operation
            
            await session.commitTransaction(); // Commit transaction after save completes
            return res.status(OK).send(FormetResponseSend(OK, 'Point House Created!', {
                records: point_house,
                table: point,
                purchase: true
            }));
        } else {
            await session.abortTransaction();
            return res.status(BAD_REQUEST).send(FormetResponseSend(BAD_REQUEST, 'Point House Created!', {
                records: point_house,
                table: point,
                purchase: false
            }));
        }
    } catch (error) {
        await session.abortTransaction();
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
        }
    } finally {
        session.endSession(); // End session in finally block to ensure it always ends
    }
};


export default PurchasePointHouse;