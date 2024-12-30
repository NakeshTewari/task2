
import  transactionController from "../controllers/transactionController";
import validateTransaction from "../middleware/validationMiddleware";
import { Router } from "express";
import verifyUserToken from "../routes/userRoutes"
const router= Router();


router.route("/createTransaction").post(verifyUserToken,validateTransaction.validateCreateTransaction,transactionController.createTransaction);
router.route("/deleteTransaction/:id").delete(verifyUserToken,validateTransaction.validateDeleteTransaction,transactionController.deleteTransaction);
router.route("/readAllTransaction").get(verifyUserToken,transactionController.getAllTransactions);
router.route("/updateTransaction/:id").put(verifyUserToken,transactionController.updateTransaction);

export default router;