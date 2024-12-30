import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import transaction from "./routes/transactionRouter.ts";
import transaction from "./routes/transactionRoutes"
import user from "./routes/userRoutes";

dotenv.config({ path: '../.env' });


const app = express();
app.use(express.json());

app.use("/transaction", transaction);
app.use("/user",user);

async function connect() {
    try {
        console.log(process.env.MONGO_URL);
        
      await mongoose.connect(process.env.MONGO_URL!);
      console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (e ) {

      const result = (e as Error).message;
      console.error("COULD NOT CONNECT TO DATABASE:", result);
    }
  }
  connect();
  
  app.listen(process.env.PORT, () => {
    console.log(`server start at port no: ${process.env.PORT}`);
  });
