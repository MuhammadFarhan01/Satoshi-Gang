import { model, Schema } from "mongoose";
import { RewardTracking } from "./RewardsTracking.interface";

const schema = new Schema<RewardTracking>({
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: "user"
    },
    point: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["mining", "refer", "task", "daily_checking"],
        required: true
    },
}, {
    timestamps: true
});

const RewardsTrackingModel = model("reward_tracking", schema);

export default RewardsTrackingModel;