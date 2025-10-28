// backend/server.js

// 1. Load environment variables
require('dotenv').config();

console.log("Environment:", process.env.NODE_ENV);
console.log("JWT Secret:", process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 2. Import Expense Routes
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. MongoDB Connection Function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected!');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
};

// 5. Connect to DB
connectDB();

// 6. Define API Routes
app.use('/api/expenses', expenseRoutes);

// 7. Test Route
app.get('/', (req, res) => res.send('Backend API Running!'));

// 8. Start Server
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
