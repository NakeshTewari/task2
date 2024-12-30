import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// Middleware for validating signup and login input
const verifyUserToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "No token provided." });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded; // Attach user info to the request object (optional)
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
       res.status(403).json({ message: "Invalid or expired token." });
       return;
    }
  };

export default verifyUserToken;
