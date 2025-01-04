import { model, Schema } from "mongoose";
import { TPoint } from "./Point.interface";

const PointSchema = new Schema<TPoint>({
    userId: {
        type: String,
        required: true,
        unique: true, 
        ref: "user"
    },
    point: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
});

const PointModel = model("point", PointSchema);
export default PointModel;