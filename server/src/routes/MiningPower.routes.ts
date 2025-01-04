import { Router } from "express"
import CreateMiningPower from "../Mining Power/CreateMiningPower";
import GetAllMiningPower from "../Mining Power/GetAllMiningPower";
import authenticateToken from "../util/DecodeJWT";
import DeleteMiningPower from "../Mining Power/DeleteMiningPower";
const MiningPowerRoute = Router();

MiningPowerRoute.post("/create-mining-power", CreateMiningPower);
MiningPowerRoute.get("/get-mining-power", GetAllMiningPower);
MiningPowerRoute.delete("/delete-mining-power", DeleteMiningPower);

export default MiningPowerRoute;

