const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    // 'title' maps to the expense description/name
    title: { 
        type: String, 
        required: [true, 'Title is required'], 
        trim: true 
    },
    // 'amount' must be a Number for aggregation/calculations
    amount: { 
        type: Number, 
        required: [true, 'Amount is required'],
        min: [0.01, 'Amount must be greater than zero']
    },
    // 'date' for filtering and time tracking
    date: { 
        type: Date, 
        required: [true, 'Date is required'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
