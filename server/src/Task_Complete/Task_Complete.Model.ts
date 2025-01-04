import { model, Schema, Types } from "mongoose";

const Task_Complete_Schema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    },
    taskId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Task'
    },
}, { timestamps: true });

export const Task_Complete_Model = model("Task_complete", Task_Complete_Schema)