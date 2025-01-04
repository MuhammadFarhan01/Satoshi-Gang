import { Router } from "express"
import authenticateToken from "../util/DecodeJWT";
import CreatePointHouse from "../Point House/CreatePointHouse";
import GetAllPointHouse from "../Point House/GetAllPointHouse";
import DeletePointHouse from "../Point House/DeletePointHouse";
import PurchasePointHouse from "../Point House/PurchasePointHouse";

const PointHouseRoute = Router();

PointHouseRoute.post("/create-mining-power", CreatePointHouse);
PointHouseRoute.post("/purchase",authenticateToken, PurchasePointHouse);
PointHouseRoute.get("/get-mining-power", GetAllPointHouse);
PointHouseRoute.delete("/delete-mining-power", DeletePointHouse);

export default PointHouseRoute;

