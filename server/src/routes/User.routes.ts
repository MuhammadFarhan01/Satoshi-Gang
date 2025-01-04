import { Router } from "express"
import authenticateToken from "../util/DecodeJWT";
import { CreateUser, AdminAllUserList, ReferList, MyInfo, UpdateUserInformission, MiningBoosting, UserSeenSplash } from "../User/User.Controller";
import { GetTopMinersLeaderboards } from "../Reward Tracking/GetTopMinersLeaderboards";
const UserRoute = Router();

// UserRoute.post("/create-user", authenticateToken, CreateUser)
UserRoute.post("/create-user", CreateUser)
UserRoute.get("/MyInfo", authenticateToken, MyInfo);
UserRoute.post("/boost-mining", authenticateToken, MiningBoosting);
UserRoute.get("/ReferList", authenticateToken, ReferList);
UserRoute.get("/all-user-admin", AdminAllUserList);
UserRoute.put("/update-user-from-admin", UpdateUserInformission);
UserRoute.put("/splash-seen", authenticateToken, UserSeenSplash);
UserRoute.get('/miners-leaderboard',authenticateToken, GetTopMinersLeaderboards);
export default UserRoute;

