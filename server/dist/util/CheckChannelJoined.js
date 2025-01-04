"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckChannelJoin = void 0;
const Setting_Model_1 = require("../Setting/Setting.Model");
const CheckChannelJoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel, user_id } = req === null || req === void 0 ? void 0 : req.query;
        const document = yield Setting_Model_1.SettingModel.findOne({});
        fetch(`https://api.telegram.org/bot${document === null || document === void 0 ? void 0 : document.BotToken}/getChatMember?chat_id=@${channel}&user_id=${user_id}`)
            .then(res => res.json())
            .then(data => {
            var _a, _b;
            console.log(data);
            if ((data === null || data === void 0 ? void 0 : data.ok) === false || ((_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.status) === 'left' || ((_b = data === null || data === void 0 ? void 0 : data.result) === null || _b === void 0 ? void 0 : _b.status) === 'kicked') {
                return res.status(200).send({
                    msg: 'User channel status fetched!',
                    data: {
                        user_id,
                        join: false
                    },
                    statusCode: 200
                });
            }
            else {
                return res.status(200).send({
                    msg: 'User channel status fetched!',
                    data: {
                        user_id,
                        join: true
                    },
                    statusCode: 200
                });
            }
        })
            .catch(error => {
            console.error('Error fetching user channel status:', error);
            return res.status(500).send({
                msg: 'Error fetching user channel status',
                statusCode: 500
            });
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error.message,
                statusCode: 400
            });
        }
        return res.status(500).send('Something went wrong');
    }
});
exports.CheckChannelJoin = CheckChannelJoin;
