import { Router } from "express"
import authenticateToken from "../util/DecodeJWT";
import { CreateNewTask, DeleteTaskAdmin, GetAllTaskAdmin, UpdateTaskAdmin } from "../Task/Task.Admin.Controller";
import { ClaimTaskRewards, GetIncompleteTasks } from "../Task/Task.User.Controller";
import { GetRewardsStatus } from "../Reward Tracking/GetRewardsStatus";
const TaskRoute = Router();

TaskRoute.post("/create-new-task", CreateNewTask);
TaskRoute.get("/get-all-task", GetAllTaskAdmin);
TaskRoute.put("/update-task-admin", UpdateTaskAdmin);
TaskRoute.delete("/delete-task-admin", DeleteTaskAdmin);

TaskRoute.post("/claim_task-rewards", authenticateToken, ClaimTaskRewards);
TaskRoute.get("/get-incomplete-task", authenticateToken, GetIncompleteTasks);
TaskRoute.get("/reward-tracking", authenticateToken, GetRewardsStatus);


export default TaskRoute;

