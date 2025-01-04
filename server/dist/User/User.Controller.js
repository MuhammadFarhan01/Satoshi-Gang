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
exports.UserSeenSplash = exports.MiningBoosting = exports.LeaderboardByPoints = exports.UpdateUserInformission = exports.AdminAllUserList = exports.MyInfo = exports.ReferList = exports.CreateUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_model_1 = __importDefault(require("./User.model"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const FormetResponseSend_1 = __importDefault(require("../util/FormetResponseSend"));
const Point_model_1 = __importDefault(require("../Point/Point.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const FormetResponseErrorSend_1 = __importDefault(require("../util/FormetResponseErrorSend"));
const Task_Complete_Model_1 = require("../Task_Complete/Task_Complete.Model");
const app_1 = require("../app");
const Setting_Model_1 = require("../Setting/Setting.Model");
const Mining_Power_model_1 = __importDefault(require("../Mining Power/Mining.Power.model"));
const init_data_node_1 = require("@telegram-apps/init-data-node");
const CreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const TgId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.TgId;
        const user = yield User_model_1.default.findOne({ TgId: TgId }, {}, { session });
        const setting = yield Setting_Model_1.SettingModel.findOne({}).session(session);
        if ((0, init_data_node_1.isValid)((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.init, process.env.BOT_TOKEN)) {
            if (user === null) {
                const ReferCode = yield (0, uuid_1.v4)();
                const AObject = yield Object.assign({ ReferCode, role: 'user', isNew: false }, req.body);
                const result = yield User_model_1.default.create([AObject], { session });
                const findReferer = yield User_model_1.default.findOne({ ReferCode: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.referBy }, {}, { session });
                if (findReferer) {
                    const findRefererPointTable = yield Point_model_1.default.findOne({ userId: findReferer === null || findReferer === void 0 ? void 0 : findReferer._id }, {}, { session });
                    if (findRefererPointTable) {
                        findRefererPointTable.point = (findRefererPointTable === null || findRefererPointTable === void 0 ? void 0 : findRefererPointTable.point) + Number(setting === null || setting === void 0 ? void 0 : setting.ReferrerBonus);
                        yield findRefererPointTable.save();
                    }
                    yield Point_model_1.default.create([{ userId: (_d = result[0]) === null || _d === void 0 ? void 0 : _d._id, point: Number(setting === null || setting === void 0 ? void 0 : setting.ReferredUserBonus) + Number(setting === null || setting === void 0 ? void 0 : setting.AccountCreationReward) }], { session });
                }
                else {
                    yield Point_model_1.default.create([{ userId: (_e = result[0]) === null || _e === void 0 ? void 0 : _e._id, point: Number(setting === null || setting === void 0 ? void 0 : setting.AccountCreationReward) }], { session });
                }
                yield session.commitTransaction();
                yield session.endSession();
                const token = yield jsonwebtoken_1.default.sign({ user: result[0] }, "this-is-secret", { expiresIn: '7d' });
                return res.status(http_status_codes_1.CREATED).cookie("token", token).send((0, FormetResponseSend_1.default)(http_status_codes_1.CREATED, "Register Completed...", { user: result, token }));
            }
            else {
                const token = yield jsonwebtoken_1.default.sign({ user }, "this-is-secret", { expiresIn: '7d' });
                yield session.commitTransaction();
                yield session.endSession();
                return res.status(http_status_codes_1.OK).cookie("token", token).send((0, FormetResponseSend_1.default)(http_status_codes_1.CREATED, "Logged...", { user, token }));
            }
        }
        else {
            yield session.abortTransaction();
            yield session.endSession();
            return next({
                status: http_status_codes_1.UNAUTHORIZED,
                error: "User information is mismatched."
            });
        }
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        console.log(error);
        return next({
            status: http_status_codes_1.BAD_REQUEST,
            error
        });
    }
});
exports.CreateUser = CreateUser;
const ReferList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //find my profile 
        const findme = yield User_model_1.default.findById((_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id, {}, { session });
        const findReferedUser = yield User_model_1.default.find({ referBy: findme === null || findme === void 0 ? void 0 : findme.ReferCode }, {}, { session });
        yield session.commitTransaction();
        yield session.endSession();
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'Refer info retrive...', { me: findme, refer_list: findReferedUser }));
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        return res.status(http_status_codes_1.OK).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
    }
});
exports.ReferList = ReferList;
const MyInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const uid = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id;
        const result = yield User_model_1.default.findById(uid);
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'My info retrive', result));
    }
    catch (error) {
        return next({
            status: http_status_codes_1.BAD_REQUEST,
            error
        });
    }
});
exports.MyInfo = MyInfo;
const AdminAllUserList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Point_model_1.default.find({}).populate("userId").sort("-point");
        const formattedResults = yield Promise.all(result.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const task_solved = yield Task_Complete_Model_1.Task_Complete_Model.find({ userId: (_a = item === null || item === void 0 ? void 0 : item.userId) === null || _a === void 0 ? void 0 : _a._id });
            const refer_count = yield User_model_1.default.find({ referBy: (_b = item === null || item === void 0 ? void 0 : item.userId) === null || _b === void 0 ? void 0 : _b.referBy });
            return Object.assign(Object.assign({}, item.toObject()), { task_solved: task_solved.length, refer_count: refer_count.length });
        })));
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'All user list retrieved', formattedResults));
    }
    catch (error) {
        return next({
            status: http_status_codes_1.BAD_REQUEST,
            error
        });
    }
});
exports.AdminAllUserList = AdminAllUserList;
const UpdateUserInformission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        const { pointId, ReferCode, point } = req === null || req === void 0 ? void 0 : req.body;
        const FindPointTable = yield Point_model_1.default.findById(pointId).session(session);
        if (FindPointTable) {
            FindPointTable.point = Number(point ? point : FindPointTable === null || FindPointTable === void 0 ? void 0 : FindPointTable.point);
            yield FindPointTable.save();
        }
        else {
            throw new Error("Point Table Not Found!");
        }
        const FindUser = yield User_model_1.default.findById(FindPointTable === null || FindPointTable === void 0 ? void 0 : FindPointTable.userId).session(session);
        if (FindUser) {
            FindUser.ReferCode = ReferCode ? ReferCode : FindUser === null || FindUser === void 0 ? void 0 : FindUser.ReferCode;
            yield FindUser.save();
        }
        else {
            throw new Error("User Not Found!");
        }
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'User Profile Updated', FindPointTable));
    }
    catch (error) {
        return next({
            status: http_status_codes_1.BAD_REQUEST,
            error
        });
    }
});
exports.UpdateUserInformission = UpdateUserInformission;
const LeaderboardByPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authUser = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user;
    let User;
    let userRank;
    const user = yield User_model_1.default.findById(authUser === null || authUser === void 0 ? void 0 : authUser._id);
    if (user === null || user === void 0 ? void 0 : user._id) {
        User = yield Point_model_1.default
            .findOne({ userId: user === null || user === void 0 ? void 0 : user._id })
            .populate('userId')
            .select('-userId.isBlocked -userId.isDeleted -userId.createdAt -updatedAt');
        userRank = (yield Point_model_1.default.countDocuments({ point: { $gt: (User === null || User === void 0 ? void 0 : User.point) ? User === null || User === void 0 ? void 0 : User.point : 0 } })) + 1;
    }
    const Leader = yield Point_model_1.default
        .find({})
        .sort({ point: -1 })
        .limit(100)
        .populate('userId')
        .select('-userId.isBlocked -userId.isDeleted -userId.createdAt -updatedAt');
    const me = {
        userRank,
        User
    };
    res.send({
        msg: 'New Leaderboard list!',
        statusCode: 200,
        data: [
            me,
            ...Leader
        ]
    });
});
exports.LeaderboardByPoints = LeaderboardByPoints;
const MiningBoosting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
        const mining_boost_id = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
        if (!mining_boost_id) {
            throw new Error("Mining Id not found!");
        }
        const user = yield User_model_1.default.findById(authUser === null || authUser === void 0 ? void 0 : authUser._id).session(session);
        const mining_object = yield Mining_Power_model_1.default.findById(mining_boost_id).session(session);
        if (!(user === null || user === void 0 ? void 0 : user._id)) {
            throw new Error("No user!");
        }
        if (!(mining_object === null || mining_object === void 0 ? void 0 : mining_object._id)) {
            throw new Error("Mining Power empty!");
        }
        user.MiningRewards = String(mining_object.pph);
        yield user.save({ session });
        yield session.commitTransaction();
        yield (app_1.bot === null || app_1.bot === void 0 ? void 0 : app_1.bot.telegram.sendMessage(user === null || user === void 0 ? void 0 : user.TgId, `🚀 Thank you for purchasing a boost! Your boost has been successfully activated! Keep mining and continue to earn even more rewards. ⛏️✨\n\nThe more you mine, the more you’ll grow! 🌟 Keep up the great work! 💪`));
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'Mining boosting is complete', []));
    }
    catch (error) {
        if (error instanceof Error) {
            yield session.abortTransaction();
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
        }
    }
    finally {
        session.endSession(); // Ensure the session is always closed
    }
});
exports.MiningBoosting = MiningBoosting;
const UserSeenSplash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
    const user = yield User_model_1.default.findById(authUser === null || authUser === void 0 ? void 0 : authUser._id);
    console.log(user);
    if (user) {
        user.isNew = true;
        user.save();
        console.log('ami');
    }
    res.send({ stats: true });
});
exports.UserSeenSplash = UserSeenSplash;
