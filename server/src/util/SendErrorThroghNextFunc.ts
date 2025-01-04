import { NextFunction } from "express"

const SendErrorThroghNextFunc = ({ status, msg, next }: { status: number, msg: string, next: NextFunction }) => {
    return next({
        status: status,
        error: msg
    })
};

export default SendErrorThroghNextFunc;