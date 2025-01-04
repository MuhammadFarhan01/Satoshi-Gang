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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskAdmin = exports.UpdateTaskAdmin = exports.GetAllTaskAdmin = exports.CreateNewTask = void 0;
const http_status_codes_1 = require("http-status-codes");
const FormetResponseErrorSend_1 = __importDefault(require("../util/FormetResponseErrorSend"));
const Task_model_1 = require("./Task.model");
const mongoose_1 = __importDefault(require("mongoose"));
const FormetResponseSend_1 = __importDefault(require("../util/FormetResponseSend"));
const CreateNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const body = req.body;
        const { answer, question, context } = body, task_body = __rest(body, ["answer", "question", "context"]);
        let result;
        result = yield Task_model_1.TaskModel.create([task_body], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "New Task Created!", result));
    }
    catch (error) {
        if (error instanceof Error) {
            yield session.abortTransaction();
            yield session.endSession();
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error.stack));
        }
    }
});
exports.CreateNewTask = CreateNewTask;
const GetAllTaskAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const task = yield Task_model_1.TaskModel.find({});
        yield session.commitTransaction();
        yield session.endSession();
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "All task retrive!", task));
    }
    catch (error) {
        if (error instanceof Error) {
            yield session.abortTransaction();
            yield session.endSession();
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error.stack));
        }
    }
});
exports.GetAllTaskAdmin = GetAllTaskAdmin;
const UpdateTaskAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const body = req.body;
        const task = yield Task_model_1.TaskModel.findById(body.id);
        if (task === null || task === void 0 ? void 0 : task._id) {
            task.title = body.title ? body.title : task.title;
            task.point = body.point ? body.point : task.point;
            task.status = body.status ? body.status : task.status;
            yield task.save();
            yield session.commitTransaction();
            yield session.endSession();
            return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "The task is updated!", task));
        }
        else {
            yield session.abortTransaction();
            yield session.endSession();
            return res.status(http_status_codes_1.NOT_FOUND).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.NOT_FOUND, 'Task is not found...', []));
        }
    }
    catch (error) {
        if (error instanceof Error) {
            yield session.abortTransaction();
            yield session.endSession();
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error.stack));
        }
    }
});
exports.UpdateTaskAdmin = UpdateTaskAdmin;
const DeleteTaskAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const task = yield Task_model_1.TaskModel.findByIdAndDelete((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id);
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "Task deleted!", task));
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error.stack));
        }
    }
});
exports.DeleteTaskAdmin = DeleteTaskAdmin;
