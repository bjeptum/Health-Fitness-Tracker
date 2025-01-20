// Main entry point for Express
require('dotenv').config();
const express =  require('express');
const cors = require('cors');
const connect_DB = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const goalRoutes = require('./routes/goalRoutes');
const errorHandler = require('./middleware/errorHandler');
const workoutPlanRoutes = require('./routes/workoutPlanRoutes');
const mockDataRoutes = require('./routes/mockDataRoutes');
const progressRoutes = require('./routes/progressRoutes');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// MongoDB Connection
connect_DB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/workout-plans', workoutPlanRoutes);
app.use('/api/mock-plans', mockDataRoutes);
app.use('/api/progress', progressRoutes);



// Initial Message Output on server
app.get("/", (req, res) => {
    res.send("Hello, Welcome to Health and Fitness!");
});

// Error Handling Middleware
app.use(errorHandler);

// Start server
const config = require('./config/config');
const port = config.app.port;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
