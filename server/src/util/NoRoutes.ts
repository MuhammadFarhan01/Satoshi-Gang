import {NextFunction, Request, Response } from "express";
import { NOT_FOUND, StatusCodes } from "http-status-codes";
import FormetResponseSend from "./FormetResponseSend";

const NoRoutes = ( req: Request, res: Response, next: NextFunction) => {
    return res.status(StatusCodes.NOT_FOUND).json(FormetResponseSend(NOT_FOUND, 'No Api on the routes', []));
};

export default NoRoutes;