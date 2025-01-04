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
const http_status_codes_1 = require("http-status-codes");
const Mining_Power_model_1 = __importDefault(require("./Mining.Power.model"));
const FormetResponseSend_1 = __importDefault(require("../util/FormetResponseSend"));
const FormetResponseErrorSend_1 = __importDefault(require("../util/FormetResponseErrorSend"));
const mongoose_1 = __importDefault(require("mongoose"));
const Point_model_1 = __importDefault(require("../Point/Point.model"));
const PurchasePointHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
        const { user } = req === null || req === void 0 ? void 0 : req.user;
        // Retrieve `point_house` and `point` within the transaction
        const point_house = yield Mining_Power_model_1.default.findById(id).session(session);
        const point = yield Point_model_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id }).session(session);
        // Update points if a valid `point` object is found
        if (point === null || point === void 0 ? void 0 : point._id) {
            point.point = Number(point.point) + Number(point_house === null || point_house === void 0 ? void 0 : point_house.token);
            yield point.save({ session }); // Await the save operation
            yield session.commitTransaction(); // Commit transaction after save completes
            return res.status(http_status_codes_1.OK).send((0, FormetResponseSend_1.default)(http_status_codes_1.OK, 'Point House Created!', {
                records: point_house,
                table: point,
                purchase: true
            }));
        }
        else {
            yield session.abortTransaction();
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseSend_1.default)(http_status_codes_1.BAD_REQUEST, 'Point House Created!', {
                records: point_house,
                table: point,
                purchase: false
            }));
        }
    }
    catch (error) {
        yield session.abortTransaction();
        if (error instanceof Error) {
            return res.status(http_status_codes_1.BAD_REQUEST).send((0, FormetResponseErrorSend_1.default)(http_status_codes_1.BAD_REQUEST, error.message, error));
        }
    }
    finally {
        session.endSession(); // End session in finally block to ensure it always ends
    }
});
exports.default = PurchasePointHouse;
