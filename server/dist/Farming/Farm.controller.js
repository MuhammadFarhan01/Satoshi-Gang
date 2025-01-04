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
exports.ClaimFarmingRewards = exports.GetUserFarmingStatus = exports.StartFarming = void 0;
const Farm_model_1 = require("./Farm.model");
const mongoose_1 = __importDefault(require("mongoose"));
const User_model_1 = __importDefault(require("../User/User.model"));
const http_status_codes_1 = require("http-status-codes");
const FormetResponseSend_1 = __importDefault(require("../util/FormetResponseSend"));
const FormetResponseErrorSend_1 = __importDefault(require("../util/FormetResponseErrorSend"));
const Point_model_1 = __importDefault(require("../Point/Point.model"));
const ExtraTask_model_1 = require("../ExtraTask/ExtraTask.model");
const Setting_Model_1 = require("../Setting/Setting.Model");
const RewardsTracking_model_1 = __importDefault(require("../Reward Tracking/RewardsTracking.model"));
const StartFarming = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //check is the user iexits? 
        const user = yield User_model_1.default.findById((_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id, {}, { session });
        // check is the user are created any farm entity
        const farm = yield Farm_model_1.FarmingModel.find({ userId: user === null || user === void 0 ? void 0 : user._id }, {}, { session }).sort('-createdAt');
        const setting = yield Setting_Model_1.SettingModel.findOne({}).session(session);
        if (farm.length) {
            const current_time_stamp = new Date().getTime();
            const isPass = current_time_stamp > Number((_c = farm[0]) === null || _c === void 0 ? void 0 : _c.farmingEndTime);
            if (isPass) {
                if ((_d = farm[0]) === null || _d === void 0 ? void 0 : _d.claim) {
                    // user claim farm reward and time has passed
                    const timestamps = new Date().getTime() + (60000 * Number(setting === null || setting === void 0 ? void 0 : setting.Mining_Time));
                    const result = yield Farm_model_1.FarmingModel.create([{ userId: (_f = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f._id, farmingEndTime: timestamps, claim: false }], { session });
                    yield session.commitTransaction();
                    yield session.endSession();
                    return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'New Farming Actived', result));
                }
                else {
                    // time pass, but user dosen't claim reward
                    yield session.abortTransaction();
                    yield session.endSession();
                    return res.status(426).send((0, FormetResponseErrorSend_1.default)(426, 'The user has not claimed previous farming rewards.', []));
                }
            }
            else {
                // 8 hour crycle not completed;
                yield session.abortTransaction();
                yield session.endSession();
                return res.status(http_status_codes_1.NOT_ACCEPTABLE).send((0, FormetResponseErrorSend_1.default)(426, `Please wait until the previous farming cycle is completed, which takes ${setting === null || setting === void 0 ? void 0 : setting.Mining_Time} hours.`, []));
            }
        }
        else {
            // this is user first farming crycle
            const timestamps = new Date().getTime() + (60000 * Number(setting === null || setting === void 0 ? void 0 : setting.Mining_Time));
            const result = yield Farm_model_1.FarmingModel.create([{ userId: (_h = (_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h._id, farmingEndTime: timestamps, claim: false }], { session });
            yield session.commitTransaction();
            yield session.endSession();
            return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'New Farming Actived', result));
        }
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
    }
});
exports.StartFarming = StartFarming;
const GetUserFarmingStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id;
        const farming = yield Farm_model_1.FarmingModel.find({ userId: userId }).sort('-createdAt').populate('userId');
        const user = yield User_model_1.default.findById(userId);
        const setting = yield Setting_Model_1.SettingModel.findOne({}).select([`${(user === null || user === void 0 ? void 0 : user.MiningRewards) ? '' : 'Mining_Rewards'}`, 'Mining_Time']);
        if (farming.length) {
            const current_time_stamp = Date.now();
            const isPass = current_time_stamp > Number((_c = farming[0]) === null || _c === void 0 ? void 0 : _c.farmingEndTime);
            console.log({ Mining_Rewards: (user === null || user === void 0 ? void 0 : user.MiningRewards) });
            return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'Last farming info...', {
                isPass,
                farm: farming[0],
                setting: {
                    Mining_Time: setting === null || setting === void 0 ? void 0 : setting.Mining_Time,
                    Mining_Rewards: ((user === null || user === void 0 ? void 0 : user.MiningRewards) ? user === null || user === void 0 ? void 0 : user.MiningRewards : (setting === null || setting === void 0 ? void 0 : setting.Mining_Rewards) ? setting === null || setting === void 0 ? void 0 : setting.Mining_Rewards : 0)
                },
            }));
        }
        else {
            return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'No Farming Data', {
                isPass: true,
                farm: {
                    claim: true
                },
                setting
            }));
        }
    }
    catch (error) {
        return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
    }
});
exports.GetUserFarmingStatus = GetUserFarmingStatus;
const ClaimFarmingRewards = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // get user id
        const userId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id;
        // requested claimed farming entity id
        const farmingId = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.farmId;
        //find farming entity
        const farm = yield Farm_model_1.FarmingModel.findById(farmingId, {}, { session });
        const setting = yield Setting_Model_1.SettingModel.findOne({}).session(session);
        const user = yield User_model_1.default.findById(userId).session(session);
        // get currect timestamp
        const current_time_stamp = Date.now();
        // check is time passed
        const isPass = current_time_stamp > Number(farm === null || farm === void 0 ? void 0 : farm.farmingEndTime);
        console.log(isPass);
        if (isPass) {
            if ((farm === null || farm === void 0 ? void 0 : farm.claim) === false) {
                //mark farm as claim
                yield Farm_model_1.FarmingModel.findByIdAndUpdate(farmingId, { claim: true }, { session });
                // retrive point entity
                const point = yield Point_model_1.default.findOne({ userId: userId }, {}, { session });
                // updated point 
                const UPoint = Number(point === null || point === void 0 ? void 0 : point.point) + Number((user === null || user === void 0 ? void 0 : user.MiningRewards) ? user === null || user === void 0 ? void 0 : user.MiningRewards : setting === null || setting === void 0 ? void 0 : setting.Mining_Rewards);
                yield ExtraTask_model_1.ExtraTaskModel.create([{
                        title: "Farming Complete",
                        point: (user === null || user === void 0 ? void 0 : user.MiningRewards) ? user === null || user === void 0 ? void 0 : user.MiningRewards : setting === null || setting === void 0 ? void 0 : setting.Mining_Rewards,
                        userId: user === null || user === void 0 ? void 0 : user._id,
                        pointId: point === null || point === void 0 ? void 0 : point._id,
                        category: 'farming'
                    }], { session: session });
                // add claim point
                yield Point_model_1.default.findOneAndUpdate({ userId: userId }, { point: UPoint }, { session });
                yield RewardsTracking_model_1.default.create([{ user: userId, point: Number((user === null || user === void 0 ? void 0 : user.MiningRewards) ? user === null || user === void 0 ? void 0 : user.MiningRewards : setting === null || setting === void 0 ? void 0 : setting.Mining_Rewards), type: "mining" }], { session });
                yield session.commitTransaction();
                yield session.endSession();
                return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'Reward Claimed!', []));
            }
            else {
                yield session.abortTransaction();
                yield session.endSession();
                return res.status(http_status_codes_1.NOT_MODIFIED).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.NOT_MODIFIED, 'User Already claimed rewards', []));
            }
        }
        else {
            yield session.abortTransaction();
            yield session.endSession();
            return res.status(http_status_codes_1.NOT_MODIFIED).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.NOT_MODIFIED, 'Crycle not completed', []));
        }
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
    }
});
exports.ClaimFarmingRewards = ClaimFarmingRewards;
