import { model, Schema } from "mongoose";

const CSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
    },
    TgId: {
        type: Number,
        required: true,
        unique: true
    },
    ReferCode: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    isNew: {
        type: Boolean,
        required: true
    },
    referBy: String,
    MiningRewards: String,
},{timestamps: true});

const UserModel = model("user", CSchema);


export default UserModel;