import mongoose, { Schema, Document } from "mongoose";

// Interface for Transaction
export interface ITransaction extends Document {
  userId: string;
  amount: number;
  type: "credit" | "debit";
  status: "pending" | "completed" | "failed";
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction Schema
const TransactionSchema: Schema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["credit", "debit"], required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], required: true },
    description: { type: String },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Transaction Model
const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
