// backend/server.js

// 1. Load environment variables
require('dotenv').config();

// Keep debugging logs from HEAD, they are helpful!
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
app.use(cors());          // Allow cross-origin requests from React frontend
app.use(express.json());  // Middleware to parse incoming JSON payload in req.body


// 4. MongoDB Connection Function
const connectDB = async () => {
    try {
        // Use the URI loaded from the .env file
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
// All API calls starting with /api/expenses will use the expenseRoutes module
app.use('/api/expenses', expenseRoutes); 


// 7. Test Route
app.get('/', (req, res) => res.send('Backend API Running!'));

// 8. Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
