"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to validate transaction data
const validateCreateTransaction = (req, res, next) => {
    // Destructure the necessary fields from the request body
    const { userId, amount, description } = req.body;
    // Check if the required fields are provided
    if (!userId || !amount || !description) {
        res.status(400).json({ message: "Missing required fields (userId, amount, description)." });
        return; // Ensure no further processing happens after sending the response
    }
    // Validate that the amount is a positive number
    if (typeof amount !== "number" || amount <= 0) {
        res.status(400).json({ message: "Amount must be a positive number." });
        return;
    }
    // Validate that description is a non-empty string
    if (typeof description !== "string" || description.trim() === "") {
        res.status(400).json({ message: "Description must be a non-empty string." });
        return;
    }
    // If all validations pass, proceed to the next middleware or route handler
    next();
};
const validateDeleteTransaction = (req, res, next) => {
    const { id } = req.params;
    // Check if the ID exists and is not empty
    if (!id || id.trim() === "") {
        res.status(400).json({ message: "Transaction ID is required." });
        return;
    }
    // Optional: You can add additional validation like checking if the ID format is valid
    const isValidId = /^[a-zA-Z0-9]{9}$/.test(id); // For example, a simple regex for a 9-character ID
    if (!isValidId) {
        res.status(400).json({ message: "Invalid transaction ID format." });
        return;
    }
    // If everything is valid, proceed to the next middleware or route handler
    next();
};
exports.default = { validateCreateTransaction, validateDeleteTransaction };
