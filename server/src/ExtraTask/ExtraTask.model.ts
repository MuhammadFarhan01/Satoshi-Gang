import { model, Schema } from "mongoose";
import { TExtraTask } from "./ExtraTask.interface";

const ExtraTaskSchema = new Schema<TExtraTask>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    pointId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "point"
    },
    point: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['refer', 'transection', 'checking', 'story', 'farming', 'task'],
        required: true,
    },
    walletInfo: String
}, { timestamps: true });

export const ExtraTaskModel = model("extra_task", ExtraTaskSchema);