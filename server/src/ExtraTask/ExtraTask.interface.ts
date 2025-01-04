import { Types } from "mongoose";

export interface TExtraTask {
    _id?: Types.ObjectId,
    userId: Types.ObjectId,
    pointId: Types.ObjectId,
    point: number,
    title: string,
    category: string,
    createdAt?: string
    updatedAt?: string
    walletInfo?: string
}