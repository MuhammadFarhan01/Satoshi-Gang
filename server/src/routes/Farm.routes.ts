import { Router } from "express"
import { CreateUser } from "../User/User.Controller";
import authenticateToken from "../util/DecodeJWT";
import { ClaimFarmingRewards, GetUserFarmingStatus, StartFarming } from "../Farming/Farm.controller";
const FarmRoute = Router();

// UserRoute.post("/create-user", authenticateToken, CreateUser)
FarmRoute.post("/start-farming", authenticateToken, StartFarming)
FarmRoute.get("/get-farming-status", authenticateToken, GetUserFarmingStatus)
FarmRoute.post("/claim-farming-rewards", authenticateToken, ClaimFarmingRewards)

export default FarmRoute;

