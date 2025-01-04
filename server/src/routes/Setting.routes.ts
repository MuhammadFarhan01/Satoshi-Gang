import { Router } from "express"
import { GetSetting, MatchSecretCode, UpdateSetting } from "../Setting/Setting.Controller";
const SettingRoute = Router();

SettingRoute.post("/admin/login/auth/0/login", MatchSecretCode)
SettingRoute.get(`/admin/code`, GetSetting);
SettingRoute.patch(`/admin/code/update`, UpdateSetting);

export default SettingRoute;

