"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware for validating signup and login input
const verifyUserToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "No token provided." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object (optional)
        next(); // Proceed to the next middleware or route handler
    }
    catch (err) {
        res.status(403).json({ message: "Invalid or expired token." });
        return;
    }
};
exports.default = verifyUserToken;
