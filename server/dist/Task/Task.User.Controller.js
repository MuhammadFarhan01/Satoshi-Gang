"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIncompleteTasks = exports.GetIncompleteTasksa = exports.ClaimTaskRewards = void 0;
const http_status_codes_1 = require("http-status-codes");
const FormetResponseSend_1 = __importDefault(require("../util/FormetResponseSend"));
const FormetResponseErrorSend_1 = __importDefault(require("../util/FormetResponseErrorSend"));
const Task_model_1 = require("./Task.model");
const mongoose_1 = __importDefault(require("mongoose"));
const User_model_1 = __importDefault(require("../User/User.model"));
const Point_model_1 = __importDefault(require("../Point/Point.model"));
const Task_Complete_Model_1 = require("../Task_Complete/Task_Complete.Model");
const ExtraTask_model_1 = require("../ExtraTask/ExtraTask.model");
const Setting_Model_1 = require("../Setting/Setting.Model");
const RewardsTracking_model_1 = __importDefault(require("../Reward Tracking/RewardsTracking.model"));
const ClaimTaskRewards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { taskId, answer } = req === null || req === void 0 ? void 0 : req.body;
        const authUser = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user;
        const isComplete = yield Task_Complete_Model_1.Task_Complete_Model.findOne({ userId: authUser === null || authUser === void 0 ? void 0 : authUser._id, taskId });
        if (!(isComplete === null || isComplete === void 0 ? void 0 : isComplete._id)) {
            if (taskId) {
                const task = yield Task_model_1.TaskModel.findById(taskId).session(session);
                const user = yield User_model_1.default.findById(authUser === null || authUser === void 0 ? void 0 : authUser._id).session(session);
                const setting = yield Setting_Model_1.SettingModel.findOne({}).session(session);
                if (user === null || user === void 0 ? void 0 : user._id) {
                    const point = yield Point_model_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id }).session(session);
                    yield ExtraTask_model_1.ExtraTaskModel.create([{
                            title: "Task Completion!",
                            point: task === null || task === void 0 ? void 0 : task.point,
                            userId: user === null || user === void 0 ? void 0 : user._id,
                            pointId: point === null || point === void 0 ? void 0 : point._id,
                            category: 'task'
                        }], { session: session });
                    if ((task === null || task === void 0 ? void 0 : task.status) == "publish") {
                        if ((task === null || task === void 0 ? void 0 : task.category) === "boost") {
                            if (point) {
                                if (task) {
                                    // const fetch = await axios.get(`https://api.telegram.org/bot${}/getChatMember?chat_id=-1001632871243&user_id=${user?.TgId}`);
                                    // if (fetch?.data?.result?.status === "member") {
                                    point.point = Number(point === null || point === void 0 ? void 0 : point.point) + Number(task.point);
                                    yield point.save();
                                    yield Task_Complete_Model_1.Task_Complete_Model.create([{ taskId: taskId, userId: authUser === null || authUser === void 0 ? void 0 : authUser._id }], { session });
                                    yield session.commitTransaction();
                                    yield session.endSession();
                                    return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "Boost is Completed!", []));
                                    // } else {
                                    //     throw new Error("Boost is not complete!");
                                    // }
                                }
                                else {
                                    throw new Error("Task is missing!");
                                }
                            }
                            else {
                                throw new Error("Point Table is missing!");
                            }
                        }
                        else if ((task === null || task === void 0 ? void 0 : task.category) === "invite") {
                            if (point) {
                                if (task) {
                                    const findRefer = yield User_model_1.default.find({ referBy: user === null || user === void 0 ? void 0 : user.ReferCode }).session(session);
                                    if ((findRefer === null || findRefer === void 0 ? void 0 : findRefer.length) >= Number(task === null || task === void 0 ? void 0 : task.invite)) {
                                        point.point = Number(point === null || point === void 0 ? void 0 : point.point) + Number(task.point);
                                        yield point.save();
                                        yield Task_Complete_Model_1.Task_Complete_Model.create([{ taskId: taskId, userId: authUser === null || authUser === void 0 ? void 0 : authUser._id }], { session });
                                        yield RewardsTracking_model_1.default.create([{ user: user === null || user === void 0 ? void 0 : user._id, point: Number(task.point), type: "refer" }], { session });
                                        yield session.commitTransaction();
                                        yield session.endSession();
                                        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "Refer Mission is Completed!", []));
                                    }
                                    else {
                                        throw new Error("Refer is less than mission!");
                                    }
                                }
                                else {
                                    throw new Error("Task is missing!");
                                }
                            }
                            else {
                                throw new Error("Point Table is missing!");
                            }
                        }
                        else {
                            if (point) {
                                if (task) {
                                    point.point = Number(point === null || point === void 0 ? void 0 : point.point) + Number(task.point);
                                    yield point.save();
                                    yield Task_Complete_Model_1.Task_Complete_Model.create([{ taskId: taskId, userId: authUser === null || authUser === void 0 ? void 0 : authUser._id }], { session });
                                    yield RewardsTracking_model_1.default.create([{ user: user === null || user === void 0 ? void 0 : user._id, point: Number(task.point), type: "task" }], { session });
                                    yield session.commitTransaction();
                                    yield session.endSession();
                                    return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "Reading is Completed!", []));
                                }
                                else {
                                    throw new Error("Task is missing!");
                                }
                            }
                            else {
                                throw new Error("Point Table is missing!");
                            }
                        }
                    }
                    else {
                        throw new Error("Task is not live!");
                    }
                }
                else {
                    throw new Error("User is not vaild");
                }
            }
            else {
                throw new Error("TaskId is required!");
            }
        }
        else {
            throw new Error("The task is already completed!");
        }
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        if (error instanceof Error) {
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, []));
        }
    }
});
exports.ClaimTaskRewards = ClaimTaskRewards;
const GetIncompleteTasksa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authUser = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user;
        if (!authUser) {
            return res.status(400).send({ message: 'User not found' });
        }
        const completedTasks = yield Task_Complete_Model_1.Task_Complete_Model.find({ userId: authUser._id }, 'taskId');
        const completedTaskIds = completedTasks.map(task => task.taskId);
        const incompleteTasks = yield Task_model_1.TaskModel.find({
            _id: { $nin: completedTaskIds },
            status: 'publish'
        });
        return res.status(200).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "Incomplete Task", incompleteTasks));
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message || 'An error occurred' });
        }
    }
});
exports.GetIncompleteTasksa = GetIncompleteTasksa;
const GetIncompleteTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const authUser = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user;
        if (!authUser) {
            return res.status(400).send({ message: 'User not found' });
        }
        const completedTasks = yield Task_Complete_Model_1.Task_Complete_Model.find({ userId: authUser._id }).session(session);
        const completedTaskIds = completedTasks.map(task => task.taskId.toString());
        const tasks = yield Task_model_1.TaskModel.find({}).session(session);
        // Mark tasks as completed or incomplete
        const formattedTasks = tasks.map(task => (Object.assign(Object.assign({}, task.toObject()), { completed: completedTaskIds.includes(task._id.toString()) })));
        yield session.commitTransaction();
        session.endSession();
        return res.status(200).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "Incomplete Tasks", formattedTasks));
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message || 'An error occurred' });
        }
    }
});
exports.GetIncompleteTasks = GetIncompleteTasks;
