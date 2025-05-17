
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

// Extend Express Request type to include userId
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const header = req.headers["authorization"];
        
        if (!header || !header.startsWith("Bearer ")) {
            res.status(403).json({
                message: "Authorization token missing or malformed"
            });
            return;
        }

        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, JWT_PASSWORD) as JwtPayload;
        
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
};
