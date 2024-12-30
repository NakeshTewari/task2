import { Router } from "express";
import userController from "../controllers/userController";
import validateUserInput from "../middleware/validateUserToken";

const router = Router();

// Signup route with validation
router.route("/signup").post( userController.signup);

// Login route with validation
router.route("/login").post( userController.login);

export default router;
