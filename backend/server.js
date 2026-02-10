// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies
app.use(morgan('dev')); // log requests

// Mount Routes
// Ensure routes files export router properly (module.exports = router)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/medicine', require('./routes/medicineRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Root route
app.get('/', (req, res) => res.send('Pharmacy API is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
