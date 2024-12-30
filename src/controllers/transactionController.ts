import { Request, Response } from "express";
import Transaction from "../models/transactionModel";

const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract data from the request body
    const { userId, amount, description, type, status } = req.body;

    // Validate input
    if (!userId || !amount || !type || !status) {
      res.status(400).json({ message: "Missing required fields: userId, amount, type, or status." });
      return;
    }

    // Validate transaction type and status
    const validTypes = ["credit", "debit"];
    const validStatuses = ["pending", "completed", "failed"];

    if (!validTypes.includes(type)) {
      res.status(400).json({ message: `Invalid type. Must be one of: ${validTypes.join(", ")}.` });
      return;
    }

    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(", ")}.` });
      return;
    }

    // Create the transaction in the database
    const transaction = await Transaction.create({
      userId,
      amount,
      description,
      type,
      status,
    });

    // Respond with the created transaction
    res.status(201).json({
      message: "Transaction created successfully.",
      transaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);

    // Differentiate between validation errors and server errors
    if (error instanceof Error && error.name === "ValidationError") {
      res.status(400).json({ message: "Validation Error", details: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error." });
    }
  }
};

const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      // Extract the transaction ID from the request parameters
      const { id } = req.params;
      console.log(req.params);
  
      // Validate that the ID is provided
      if (!id) {
        res.status(400).json({ message: "Transaction ID is required." });
        return;
      }
  
      // Find and delete the transaction by ID
      const deletedTransaction = await Transaction.findByIdAndDelete(id);
  
      // If no transaction was found, return a 404 error
      if (!deletedTransaction) {
        res.status(404).json({ message: "Transaction not found." });
        return;
      }
  
      // Respond with success
      res.status(200).json({
        message: "Transaction deleted successfully.",
        deletedTransaction,
      });
    } catch (error) {
      console.error("Error deleting transaction:", error);
  
      // Handle errors
      res.status(500).json({ message: "Internal Server Error." });
    }
  };

   const getAllTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all transactions from the database
        const transactions = await Transaction.find();  // This assumes you're using Mongoose

        if (transactions.length === 0) {
            res.status(404).json({ message: "No transactions found." });
            return;
        }

        // Respond with the transactions
        res.status(200).json({
            message: "Transactions retrieved successfully.",
            transactions,
        });
    } catch (error) {
        console.error("Error retrieving transactions:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};


const updateTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract transaction ID from request parameters
        const { id } = req.params;

        // Extract the updated fields from request body
        const { userId, amount, description } = req.body;
        console.log(req.params);
        // Validate that required fields are present (optional)
        if (!userId && !amount && !description) {
            res.status(400).json({ message: "At least one field is required to update the transaction." });
            return;
        }

        // Find and update the transaction by ID
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { userId, amount, description }, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedTransaction) {
            res.status(404).json({ message: "Transaction not found." });
            return;
        }

        // Respond with the updated transaction
        res.status(200).json({
            message: "Transaction updated successfully.",
            transaction: updatedTransaction,
        });
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};


  export default {
    createTransaction,
    deleteTransaction,
    getAllTransactions,
    updateTransaction
  };