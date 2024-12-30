"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionController_1 = __importDefault(require("../controllers/transactionController"));
const validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const router = (0, express_1.Router)();
router.route("/createTransaction").post(userRoutes_1.default, validationMiddleware_1.default.validateCreateTransaction, transactionController_1.default.createTransaction);
router.route("/deleteTransaction/:id").delete(userRoutes_1.default, validationMiddleware_1.default.validateDeleteTransaction, transactionController_1.default.deleteTransaction);
router.route("/readAllTransaction").get(userRoutes_1.default, transactionController_1.default.getAllTransactions);
router.route("/updateTransaction/:id").put(userRoutes_1.default, transactionController_1.default.updateTransaction);
exports.default = router;
