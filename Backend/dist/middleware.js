"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        if (!header || !header.startsWith("Bearer ")) {
            res.status(403).json({
                message: "Authorization token missing or malformed"
            });
            return;
        }
        const token = header.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
};
exports.userMiddleware = userMiddleware;
