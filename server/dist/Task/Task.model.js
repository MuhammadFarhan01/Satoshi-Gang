"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
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
exports.TaskModel = (0, mongoose_1.model)("Task", TaskSchema);
