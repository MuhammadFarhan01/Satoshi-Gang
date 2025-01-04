"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Setting_Controller_1 = require("../Setting/Setting.Controller");
const SettingRoute = (0, express_1.Router)();
SettingRoute.post("/admin/login/auth/0/login", Setting_Controller_1.MatchSecretCode);
SettingRoute.get(`/admin/code`, Setting_Controller_1.GetSetting);
SettingRoute.patch(`/admin/code/update`, Setting_Controller_1.UpdateSetting);
exports.default = SettingRoute;
