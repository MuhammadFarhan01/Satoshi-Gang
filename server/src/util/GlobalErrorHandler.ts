import {NextFunction, Request, Response } from "express";
import FormetResponseErrorSend from "./FormetResponseErrorSend";

const GlobalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(error?.status).json(FormetResponseErrorSend(error?.status, error?.error?.message, error?.error));
};

export default GlobalErrorHandler;