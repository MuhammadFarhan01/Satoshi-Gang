import { Types } from "mongoose";

export interface RewardTracking {
    user: Types.ObjectId,
    point: number,
    type: "mining" | "refer" | "task" | "daily_checking",
    createdAt?: string,
    updatedAt?: string,
}