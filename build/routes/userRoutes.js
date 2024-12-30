"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
// Signup route with validation
router.route("/signup").post(userController_1.default.signup);
// Login route with validation
router.route("/login").post(userController_1.default.login);
exports.default = router;
