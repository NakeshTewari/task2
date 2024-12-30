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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// import transaction from "./routes/transactionRouter.ts";
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config({ path: '../.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/transaction", transactionRoutes_1.default);
app.use("/user", userRoutes_1.default);
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(process.env.MONGO_URL);
            yield mongoose_1.default.connect(process.env.MONGO_URL);
            console.log("CONNECTED TO DATABASE SUCCESSFULLY");
        }
        catch (e) {
            const result = e.message;
            console.error("COULD NOT CONNECT TO DATABASE:", result);
        }
    });
}
connect();
app.listen(process.env.PORT, () => {
    console.log(`server start at port no: ${process.env.PORT}`);
});
