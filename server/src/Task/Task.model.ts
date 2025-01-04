import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    point: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    context: {
        type: String,
    },
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    link: {
        type: String,
    },
    invite: String,
    earn: String,
}, {
    timestamps: true
});

export const TaskModel = model("Task", TaskSchema);