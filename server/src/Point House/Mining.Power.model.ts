import { model, Schema } from "mongoose";
import PointHouse from "./Mining.Power.interface";

const schema = new Schema<PointHouse>({
    token: {
        type: Number,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true
});

const PointHouseModel = model("Point_House", schema);
export default PointHouseModel;