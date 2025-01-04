import mongoose, { model, Schema } from "mongoose";
import { TFarming } from "./Farm.interface";

const FarmingSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    farmingEndTime: {
        type: String,
        required: true
    },
    claim: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

export const FarmingModel = model("farm", FarmingSchema);