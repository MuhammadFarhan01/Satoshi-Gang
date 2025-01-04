import { Router } from "express"
import authenticateToken from "../util/DecodeJWT";
import { AllAirdrop, DailyChecking, DailyStory, ExtraTaskCompleteList, HasClaimedToday, HasClaimedTodayStory, HasUserTonTransectioned, InviteTask, PointTracking, TonTransection } from "../ExtraTask/ExtraTask.controller";
const ExtraTaskRoute = Router();

ExtraTaskRoute.post("/ton-transection", authenticateToken, TonTransection);
ExtraTaskRoute.post("/invites", authenticateToken, InviteTask);
ExtraTaskRoute.get("/extra-list", authenticateToken, ExtraTaskCompleteList);
ExtraTaskRoute.get("/daily-checking-status", authenticateToken, HasClaimedToday);
ExtraTaskRoute.post("/daily-checking", authenticateToken, DailyChecking);

ExtraTaskRoute.get("/story-checking-status", authenticateToken, HasClaimedTodayStory);
ExtraTaskRoute.get("/ton-checking-status", authenticateToken, HasUserTonTransectioned);
ExtraTaskRoute.get("/point-tracking", authenticateToken, PointTracking);
ExtraTaskRoute.get("/airdrop", AllAirdrop);

ExtraTaskRoute.post("/story-checking", authenticateToken, DailyStory);

export default ExtraTaskRoute;

