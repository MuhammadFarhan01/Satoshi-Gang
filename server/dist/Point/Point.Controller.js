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
exports.GetSingleUserPointByUid = void 0;
const SendErrorThroghNextFunc_1 = __importDefault(require("../util/SendErrorThroghNextFunc"));
const http_status_codes_1 = require("http-status-codes");
const Point_model_1 = __importDefault(require("./Point.model"));
const FormetResponseSend_1 = __importDefault(require("../util/FormetResponseSend"));
const GetSingleUserPointByUid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        // Find the specific user's point data
        const point_result = yield Point_model_1.default.findOne({ userId: (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id }).populate('userId');
        if (!point_result) {
            return (0, SendErrorThroghNextFunc_1.default)({ msg: 'Point Table Not Found!', status: http_status_codes_1.NOT_FOUND, next });
        }
        // Retrieve all users' points sorted by point in descending order
        const allUsers = yield Point_model_1.default.find().sort({ point: -1 });
        // Find the rank of the specific user
        const rank = allUsers.findIndex(user => { var _a, _b; return user.userId.toString() === ((_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id.toString()); }) + 1;
        // Formatted response including user points and rank
        return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, "User Point Table Retrieved", {
            userId: (_d = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d._id,
            points: point_result,
            rank: rank
        }));
    }
    catch (error) {
        // Handle errors with proper message and status
        return (0, SendErrorThroghNextFunc_1.default)({ status: http_status_codes_1.BAD_REQUEST, msg: error === null || error === void 0 ? void 0 : error.message, next });
    }
});
exports.GetSingleUserPointByUid = GetSingleUserPointByUid;
