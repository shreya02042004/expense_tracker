const router = require('express').Router();
const Expense = require('../models/Expense'); 

// POST /api/expenses: Handles creation of a new expense
router.post('/', async (req, res) => {
    // 💡 FIX 1: Deconstruct only the three fields sent by the React form (title, amount, date)
    const { title, amount, date } = req.body;
    
    // Basic validation check
    if (!title || !amount || !date) {
        return res.status(400).json({ message: "Missing required fields (title, amount, or date)." });
    }

    try {
        const newExpense = new Expense({
            // 💡 FIX 2: Correctly map req.body.title to the 'title' field in the schema
            title: title, 
            amount: amount,
            date: date, 
            // Removed 'category' field entirely
        });

        const savedExpense = await newExpense.save();
        
        // Success: 201 Created
        res.status(201).json(savedExpense); 

    } catch (error) {
        // Log the detailed error for debugging
        console.error('DATABASE SAVE FAILED:', error); 
        
        // Check for Mongoose Validation Error
        let errorMessage = "Error saving expense";
        if (error.name === 'ValidationError') {
            errorMessage = Object.values(error.errors).map(val => val.message).join(', ');
        } else {
            errorMessage = error.message;
        }

        res.status(500).json({ message: errorMessage });
    }
});

// GET /api/expenses (Still needed to display data later)
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses." });
    }
});

module.exports = router;
