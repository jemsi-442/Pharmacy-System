// server.js
const express = require('express');
const dotenv = require('dotenv');
const { connectDB, pool } = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies
app.use(morgan('dev')); // log requests

// Mount Routes
// Ensure routes files export router properly (module.exports = router)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/medicine', require('./routes/medicineRoutes'));
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Root route
app.get('/', (req, res) => res.send('Pharmacy API is running'));

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(async (error) => {
    console.error('PostgreSQL connection error:', error.message);
    await pool.end();
    process.exit(1);
  });
