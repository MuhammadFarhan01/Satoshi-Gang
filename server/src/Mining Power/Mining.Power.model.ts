import { model, Schema } from "mongoose";
import TMiningPower from "./Mining.Power.interface";

const schema = new Schema<TMiningPower>({
    power: {
        type: Number,
        required: true,
        unique: true
    },
    pph: {
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

const MiningPowerModel = model("Mining_Power", schema);
export default MiningPowerModel;