"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task_Complete_Model = void 0;
const mongoose_1 = require("mongoose");
const Task_Complete_Schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    taskId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'Task'
    },
}, { timestamps: true });
exports.Task_Complete_Model = (0, mongoose_1.model)("Task_complete", Task_Complete_Schema);
