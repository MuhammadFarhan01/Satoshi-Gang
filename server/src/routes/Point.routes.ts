import { Router } from "express"
import { CreateUser, LeaderboardByPoints } from "../User/User.Controller";
import authenticateToken from "../util/DecodeJWT";
import { GetSingleUserPointByUid } from "../Point/Point.Controller";
const PointRoute = Router();

// UserRoute.post("/create-user", authenticateToken, CreateUser)
PointRoute.get("/point-table", authenticateToken, GetSingleUserPointByUid)
PointRoute.get("/leaderboard", authenticateToken, LeaderboardByPoints)

export default PointRoute;

