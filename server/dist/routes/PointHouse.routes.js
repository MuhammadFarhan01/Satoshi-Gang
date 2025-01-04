"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DecodeJWT_1 = __importDefault(require("../util/DecodeJWT"));
const CreatePointHouse_1 = __importDefault(require("../Point House/CreatePointHouse"));
const GetAllPointHouse_1 = __importDefault(require("../Point House/GetAllPointHouse"));
const DeletePointHouse_1 = __importDefault(require("../Point House/DeletePointHouse"));
const PurchasePointHouse_1 = __importDefault(require("../Point House/PurchasePointHouse"));
const PointHouseRoute = (0, express_1.Router)();
PointHouseRoute.post("/create-mining-power", CreatePointHouse_1.default);
PointHouseRoute.post("/purchase", DecodeJWT_1.default, PurchasePointHouse_1.default);
PointHouseRoute.get("/get-mining-power", GetAllPointHouse_1.default);
PointHouseRoute.delete("/delete-mining-power", DeletePointHouse_1.default);
exports.default = PointHouseRoute;
