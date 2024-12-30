"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel")); // Assuming User model is in models/User.ts
// Signup controller
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if email already exists
        const userExists = yield userModel_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "Email already registered." });
            return;
        }
        // Hash the password before saving
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create new user
        const newUser = new userModel_1.default({
            email,
            password: hashedPassword,
        });
        // Save the user to the database
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully." });
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
});
// Login controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password." });
            return;
        }
        // Compare password with hashed password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password." });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
        });
        res.cookie('token', token);
        res.status(200).json({ message: "Login successful.", token });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
});
exports.default = { signup, login };
