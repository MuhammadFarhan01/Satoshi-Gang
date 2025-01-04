import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function authenticateToken(req: any, res: Response, next: NextFunction) {
    const token = req?.headers?.authorization;    
    
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, "this-is-secret", (err: any, user: any) => {
        if (err) return res.sendStatus(403)
        req.user = user;

        next()
    })
}

export default authenticateToken;