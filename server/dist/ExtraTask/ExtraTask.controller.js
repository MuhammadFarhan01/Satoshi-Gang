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
exports.AllAirdrop = exports.PointTracking = exports.HasUserTonTransectioned = exports.HasClaimedTodayStory = exports.DailyStory = exports.HasClaimedToday = exports.DailyChecking = exports.ExtraTaskCompleteList = exports.InviteTask = exports.TonTransection = exports.TonTransections = void 0;
const http_status_codes_1 = require("http-status-codes");
const FormetResponseErrorSend_1 = __importDefault(require("../util/FormetResponseErrorSend"));
const User_model_1 = __importDefault(require("../User/User.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const Point_model_1 = __importDefault(require("../Point/Point.model"));
const ExtraTask_model_1 = require("./ExtraTask.model");
const FormetResponseSend_1 = __importDefault(require("../util/FormetResponseSend"));
const app_1 = require("../app");
const Setting_Model_1 = require("../Setting/Setting.Model");
const CheckIn_1 = require("../CheckIn");
const TonTransections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
        const body = req === null || req === void 0 ? void 0 : req.body;
        const user = yield User_model_1.default.findById(authUser === null || authUser === void 0 ? void 0 : authUser._id).session(session);
        const point = yield Point_model_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id }).session(session);
        const setting = yield Setting_Model_1.SettingModel.findOne({}).session(session);
        const transection = yield ExtraTask_model_1.ExtraTaskModel.findOne({
            title: "Ton Transection",
            userId: user === null || user === void 0 ? void 0 : user._id,
            pointId: point === null || point === void 0 ? void 0 : point._id
        });
        if (transection === null || transection === void 0 ? void 0 : transection._id) {
            throw new Error("User already did ton transection!");
        }
        if (!(user === null || user === void 0 ? void 0 : user._id)) {
            throw new Error("User not exist!");
        }
        if (!(point === null || point === void 0 ? void 0 : point._id)) {
            throw new Error("Point info not located!");
        }
        point.point = Number(point === null || point === void 0 ? void 0 : point.point) + Number((setting === null || setting === void 0 ? void 0 : setting.TransectionRewards) ? setting === null || setting === void 0 ? void 0 : setting.TransectionRewards : 0);
        yield point.save({ session: session });
        const task = yield ExtraTask_model_1.ExtraTaskModel.create([{
                title: "Ton Transection",
                point: (setting === null || setting === void 0 ? void 0 : setting.TransectionRewards) ? setting === null || setting === void 0 ? void 0 : setting.TransectionRewards : 0,
                userId: user === null || user === void 0 ? void 0 : user._id,
                pointId: point === null || point === void 0 ? void 0 : point._id,
                category: 'transection',
                walletInfo: JSON.stringify(body)
            }], { session: session });
        yield session.commitTransaction();
        yield session.endSession();
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "Ton Transection Complete", task[0]));
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
        }
    }
});
exports.TonTransections = TonTransections;
const TonTransection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
        const body = req === null || req === void 0 ? void 0 : req.body;
        const user = yield User_model_1.default.findById(authUser === null || authUser === void 0 ? void 0 : authUser._id).session(session);
        const point = yield Point_model_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id }).session(session);
        const setting = yield Setting_Model_1.SettingModel.findOne({}).session(session);
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
        const transection = yield ExtraTask_model_1.ExtraTaskModel.findOne({
            title: "Ton Transection",
            userId: user === null || user === void 0 ? void 0 : user._id,
            pointId: point === null || point === void 0 ? void 0 : point._id,
            createdAt: { $gte: twelveHoursAgo }
        }).session(session);
        if (transection === null || transection === void 0 ? void 0 : transection._id) {
            throw new Error("Already did a Ton Transection in the last 12 hours!");
        }
        if (!(user === null || user === void 0 ? void 0 : user._id)) {
            throw new Error("not exist!");
        }
        if (!(point === null || point === void 0 ? void 0 : point._id)) {
            throw new Error("Point info not located!");
        }
        point.point = Number(point === null || point === void 0 ? void 0 : point.point) + Number((setting === null || setting === void 0 ? void 0 : setting.TransectionRewards) ? setting === null || setting === void 0 ? void 0 : setting.TransectionRewards : 0);
        yield point.save({ session: session });
        const task = yield ExtraTask_model_1.ExtraTaskModel.create([{
                title: "Ton Transection",
                point: (setting === null || setting === void 0 ? void 0 : setting.TransectionRewards) ? setting === null || setting === void 0 ? void 0 : setting.TransectionRewards : 0,
                userId: user === null || user === void 0 ? void 0 : user._id,
                pointId: point === null || point === void 0 ? void 0 : point._id,
                category: 'transection',
                walletInfo: JSON.stringify(body)
            }], { session: session });
        yield session.commitTransaction();
        yield session.endSession();
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "Ton Transection Complete", task[0]));
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            yield session.abortTransaction();
            yield session.endSession();
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
        }
    }
});
exports.TonTransection = TonTransection;
const InviteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
    try {
        session.startTransaction();
        const refer_count = Number((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.refer_count);
        let rewards = 0;
        switch (refer_count) {
            case 3:
                rewards = 500;
                break;
            case 10:
                rewards = 1000;
                break;
            case 25:
                rewards = 2500;
                break;
            case 50:
                rewards = 5000;
                break;
            case 100:
                rewards = 10000;
                break;
            default:
                rewards = 0;
                break;
        }
        if (refer_count) {
            const user = yield User_model_1.default.findById(authUser === null || authUser === void 0 ? void 0 : authUser._id).session(session);
            const point = yield Point_model_1.default.findOne({ userId: authUser === null || authUser === void 0 ? void 0 : authUser._id }).session(session);
            const referCount = yield User_model_1.default.find({ referBy: authUser === null || authUser === void 0 ? void 0 : authUser.ReferCode }).session(session);
            const isDid = yield ExtraTask_model_1.ExtraTaskModel.findOne({
                title: `Refer ${refer_count}`,
                userId: user === null || user === void 0 ? void 0 : user._id,
                pointId: point === null || point === void 0 ? void 0 : point._id,
                point: rewards
            });
            if (referCount.length >= refer_count) {
                if (point === null || point === void 0 ? void 0 : point._id) {
                    point.point = (point === null || point === void 0 ? void 0 : point.point) + rewards;
                    yield point.save({ session: session });
                }
                if (isDid === null || isDid === void 0 ? void 0 : isDid._id) {
                    throw new Error("Already Claim Refer Rewards!");
                }
                yield ExtraTask_model_1.ExtraTaskModel.create([{
                        title: `Refer ${refer_count}`,
                        userId: user === null || user === void 0 ? void 0 : user._id,
                        pointId: point === null || point === void 0 ? void 0 : point._id,
                        point: rewards,
                        category: 'refer'
                    }], { session: session });
                yield session.commitTransaction();
                yield session.endSession();
                yield (app_1.bot === null || app_1.bot === void 0 ? void 0 : app_1.bot.telegram.sendMessage(Number(user === null || user === void 0 ? void 0 : user.TgId), `🎉 Thank you for referring ${refer_count} amazing people!
We truly appreciate the relationship we've built with you, and it's wonderful to see how you've shared that by bringing others onboard! 🌟\n\n🤝 Thanks again for your support, and remember: the more you refer, the more rewards you can earn! Keep up the great work! 💪`));
                return res.send({
                    msg: 'Invite completed!',
                    statusCode: 200,
                    data: []
                });
            }
            else {
                yield session.abortTransaction();
                yield session.endSession();
                yield (app_1.bot === null || app_1.bot === void 0 ? void 0 : app_1.bot.telegram.sendMessage(Number(user === null || user === void 0 ? void 0 : user.TgId), `🚨 Uh-oh! Looks like you're almost there, but not quite yet!\nYou still need to refer at least ${Number(refer_count) - (referCount === null || referCount === void 0 ? void 0 : referCount.length)} more friends before you can claim your awesome rewards. 🌟\n\n\n🎯 Keep going! You're so close to achieving your goal!`));
                res.status(200).send({
                    data: [],
                    statusCode: 500,
                    msg: `Not completed ${refer_count} invite`
                });
            }
        }
        else {
            throw new Error("I am not sure what i do!");
        }
    }
    catch (error) {
        // await session.abortTransaction();
        // await session.endSession();
        if (error instanceof Error) {
            res.status(200).send({
                data: [],
                statusCode: 500,
                msg: error.message
            });
        }
    }
});
exports.InviteTask = InviteTask;
const ExtraTaskCompleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req === null || req === void 0 ? void 0 : req.user;
        const refer_count = yield User_model_1.default.find({ referBy: user === null || user === void 0 ? void 0 : user.ReferCode });
        const media = yield Setting_Model_1.SettingModel.findOne({});
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
        const transection = yield ExtraTask_model_1.ExtraTaskModel.findOne({
            title: "Ton Transection",
            userId: user === null || user === void 0 ? void 0 : user._id,
            createdAt: { $gte: twelveHoursAgo }
        });
        const refer = yield ExtraTask_model_1.ExtraTaskModel.find({
            userId: user === null || user === void 0 ? void 0 : user._id,
            title: { $ne: "Ton Transection" }
        });
        const referlist = refer === null || refer === void 0 ? void 0 : refer.map((item) => {
            var _a;
            return (item === null || item === void 0 ? void 0 : item.title.includes("Refer")) ? {
                refer: (_a = item === null || item === void 0 ? void 0 : item.title) === null || _a === void 0 ? void 0 : _a.split("Refer")[1].trim()
            } : null;
        });
        const referF = referlist.filter((item) => item !== null);
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "Extra Task Complete List", { media: media === null || media === void 0 ? void 0 : media.StatusMedia, refer: referF, trans: transection, refer_count: (refer_count === null || refer_count === void 0 ? void 0 : refer_count.length) ? refer_count === null || refer_count === void 0 ? void 0 : refer_count.length : 0 + 1 }));
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
        }
    }
});
exports.ExtraTaskCompleteList = ExtraTaskCompleteList;
const DailyChecking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
    try {
        session.startTransaction();
        const point = yield Point_model_1.default.findOne({ userId: authUser === null || authUser === void 0 ? void 0 : authUser._id });
        if (!(point === null || point === void 0 ? void 0 : point._id)) {
            throw new Error("Point record not found!");
        }
        const userCreatedDate = new Date(authUser.createdAt).getTime();
        const currentDate = new Date().getTime();
        const daysSinceRegistration = Math.floor((currentDate - userCreatedDate) / (1000 * 60 * 60 * 24)) + 1;
        // Check if user exceeds the 14-day limit
        if (daysSinceRegistration > 14) {
            throw new Error("You are no longer eligible for daily check-in rewards.");
        }
        // Get the appropriate reward points for today
        const rewardForToday = CheckIn_1.rewardSchedule.find(r => r.day === daysSinceRegistration);
        const rewardPoints = rewardForToday ? rewardForToday.points : 0;
        const lastCheck = yield ExtraTask_model_1.ExtraTaskModel.findOne({
            title: "Daily Checking",
            userId: authUser === null || authUser === void 0 ? void 0 : authUser._id,
        }).sort("-createdAt").session(session);
        const lastCheckDate = lastCheck ? new Date(lastCheck.createdAt).getTime() : 0;
        const nextClaimTime = new Date(new Date(lastCheckDate).setDate(new Date(lastCheckDate).getDate() + 1));
        nextClaimTime.setHours(0, 1, 0, 0);
        if (!lastCheck || currentDate >= nextClaimTime.getTime()) {
            point.point = Number(point.point) + rewardPoints;
            yield point.save({ session });
            yield ExtraTask_model_1.ExtraTaskModel.create([{
                    title: "Daily Checking",
                    category: "checking",
                    point: rewardPoints,
                    pointId: point._id,
                    userId: authUser._id
                }], { session });
            yield session.commitTransaction();
            session.endSession();
            res.status(200).send({
                data: [],
                statusCode: 200,
                msg: `Daily check-in successful! You've earned ${rewardPoints} points.`,
            });
        }
        else {
            throw new Error("You've already claimed your daily points. Try again after 12:01 AM tomorrow.");
        }
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        res.status(500).send({
            data: [],
            statusCode: 500,
            msg: error instanceof Error ? error.message : "An error occurred."
        });
    }
});
exports.DailyChecking = DailyChecking;
const HasClaimedToday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
    try {
        const today = new Date();
        today.setHours(0, 1, 0, 0);
        const lastChecking = yield ExtraTask_model_1.ExtraTaskModel.findOne({
            title: "Daily Checking",
            userId: authUser === null || authUser === void 0 ? void 0 : authUser._id
        }).sort("-createdAt");
        if (!lastChecking || new Date(lastChecking.createdAt).getTime() < today.getTime()) {
            return res.status(200).send({
                hasClaimed: false,
                msg: "User has not claimed the reward since 12:01 AM today."
            });
        }
        return res.status(200).send({
            hasClaimed: true,
            msg: "User has already claimed the reward today."
        });
    }
    catch (error) {
        res.status(500).send({
            hasClaimed: false,
            msg: error instanceof Error ? error.message : "An error occurred."
        });
    }
});
exports.HasClaimedToday = HasClaimedToday;
const DailyStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
    try {
        session.startTransaction();
        const point = yield Point_model_1.default.findOne({ userId: authUser === null || authUser === void 0 ? void 0 : authUser._id });
        if (!(point === null || point === void 0 ? void 0 : point._id)) {
            throw new Error("point is not found!");
        }
        const checking = yield ExtraTask_model_1.ExtraTaskModel.findOne({
            title: "Daily Story",
            userId: authUser === null || authUser === void 0 ? void 0 : authUser._id
        }).sort("-createdAt").session(session);
        const currentDate = new Date();
        const lastCheckingDate = checking ? new Date(checking.createdAt).getTime() : 0;
        const nextClaimTime = new Date(new Date(lastCheckingDate).setDate(new Date(lastCheckingDate).getDate() + 1));
        nextClaimTime.setHours(0, 1, 0, 0);
        if (!checking || currentDate.getTime() >= nextClaimTime.getTime()) {
            point.point = Number(point.point) + Number(process.env.STORY_REWARDS);
            yield point.save({ session });
            yield ExtraTask_model_1.ExtraTaskModel.create([{
                    title: "Daily Story",
                    category: "story",
                    point: Number(process.env.STORY_REWARDS),
                    pointId: point === null || point === void 0 ? void 0 : point._id,
                    userId: authUser === null || authUser === void 0 ? void 0 : authUser._id
                }], { session });
        }
        else {
            throw new Error("You have already claimed your daily story points. Please try again after 12:01 AM tomorrow.");
        }
        yield session.commitTransaction();
        session.endSession();
        res.status(200).send({
            data: [],
            statusCode: 200,
            msg: "Daily story checking successful!",
        });
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        if (error instanceof Error) {
            res.status(200).send({
                data: [],
                statusCode: 500,
                msg: error.message
            });
        }
    }
});
exports.DailyStory = DailyStory;
const HasClaimedTodayStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
    try {
        // Calculate today's 12:01 AM
        const today = new Date();
        today.setHours(0, 1, 0, 0); // Set time to 12:01 AM of today
        // Fetch the user's latest "Daily Checking" task
        const lastChecking = yield ExtraTask_model_1.ExtraTaskModel.findOne({
            title: "Daily Story",
            userId: authUser === null || authUser === void 0 ? void 0 : authUser._id
        }).sort("-createdAt");
        // If there's no check or it's before today 12:01 AM, return false
        if (!lastChecking || new Date(lastChecking.createdAt).getTime() < today.getTime()) {
            return res.status(200).send({
                hasClaimed: false,
                msg: "User has not claimed the reward since 12:01 AM today."
            });
        }
        // If the last claim was after today 12:01 AM
        return res.status(200).send({
            hasClaimed: true,
            msg: "User has already claimed the reward today."
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({
                hasClaimed: false,
                msg: error.message
            });
        }
    }
});
exports.HasClaimedTodayStory = HasClaimedTodayStory;
const HasUserTonTransectioned = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
    try {
        session.startTransaction();
        const point = yield Point_model_1.default.findOne({ userId: authUser === null || authUser === void 0 ? void 0 : authUser._id });
        if (!(point === null || point === void 0 ? void 0 : point._id)) {
            throw new Error("point is not found!");
        }
        const transection = yield ExtraTask_model_1.ExtraTaskModel.findOne({
            title: "Ton Transection",
            userId: authUser === null || authUser === void 0 ? void 0 : authUser._id,
            pointId: point === null || point === void 0 ? void 0 : point._id
        });
        yield session.commitTransaction();
        session.endSession();
        res.status(200).send({
            data: transection,
            statusCode: 200,
            msg: "Ton Transection is retrived!",
        });
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        if (error instanceof Error) {
            res.status(200).send({
                data: [],
                statusCode: 500,
                msg: error.message
            });
        }
    }
});
exports.HasUserTonTransectioned = HasUserTonTransectioned;
function pointTrack(category, array) {
    return __awaiter(this, void 0, void 0, function* () {
        let point = 0;
        yield array.map(item => {
            if ((item === null || item === void 0 ? void 0 : item.category) === category) {
                point += Number(item === null || item === void 0 ? void 0 : item.point);
            }
        });
        return point ? point : 0;
    });
}
const PointTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const { user: authUser } = req === null || req === void 0 ? void 0 : req.user;
    try {
        session.startTransaction();
        const tracking = yield ExtraTask_model_1.ExtraTaskModel.find({
            userId: authUser === null || authUser === void 0 ? void 0 : authUser._id
        });
        const checkin = yield pointTrack("checking", tracking);
        const refer = yield pointTrack("refer", tracking);
        const transection = yield pointTrack("transection", tracking);
        const story = yield pointTrack("story", tracking);
        const farming = yield pointTrack("farming", tracking);
        const task = yield pointTrack("task", tracking);
        yield session.commitTransaction();
        session.endSession();
        res.status(200).send({
            data: { checkin, refer, transection, story, farming, task },
            statusCode: 200,
            msg: "History!",
        });
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        if (error instanceof Error) {
            res.status(200).send({
                data: [],
                statusCode: 500,
                msg: error.message
            });
        }
    }
});
exports.PointTracking = PointTracking;
const AllAirdrop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Find documents where walletInfo is not null or undefined
        const tracking = yield ExtraTask_model_1.ExtraTaskModel.find({
            walletInfo: { $ne: null }
        }).populate("userId").populate("pointId");
        yield session.commitTransaction();
        session.endSession();
        res.status(200).send({
            data: tracking,
            statusCode: 200,
            msg: "History retrieved successfully!",
        });
    }
    catch (error) {
        yield session.endSession();
    }
});
exports.AllAirdrop = AllAirdrop;
