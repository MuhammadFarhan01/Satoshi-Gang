"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DecodeJWT_1 = __importDefault(require("../util/DecodeJWT"));
const Task_Admin_Controller_1 = require("../Task/Task.Admin.Controller");
const Task_User_Controller_1 = require("../Task/Task.User.Controller");
const GetRewardsStatus_1 = require("../Reward Tracking/GetRewardsStatus");
const TaskRoute = (0, express_1.Router)();
TaskRoute.post("/create-new-task", Task_Admin_Controller_1.CreateNewTask);
TaskRoute.get("/get-all-task", Task_Admin_Controller_1.GetAllTaskAdmin);
TaskRoute.put("/update-task-admin", Task_Admin_Controller_1.UpdateTaskAdmin);
TaskRoute.delete("/delete-task-admin", Task_Admin_Controller_1.DeleteTaskAdmin);
TaskRoute.post("/claim_task-rewards", DecodeJWT_1.default, Task_User_Controller_1.ClaimTaskRewards);
TaskRoute.get("/get-incomplete-task", DecodeJWT_1.default, Task_User_Controller_1.GetIncompleteTasks);
TaskRoute.get("/reward-tracking", DecodeJWT_1.default, GetRewardsStatus_1.GetRewardsStatus);
exports.default = TaskRoute;
