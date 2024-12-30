// Main entry point for Express
const express =  require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const goalRoutes = require('./routes/goalRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connect_DB = require('./config/db');
connect_DB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('api/exercises', exerciseRoutes);
app.use('api/goals', goalRoutes);

// Initial Message Output on server
app.get("/", (req, res) => {
    res.send("Hello, Welcome to Health and Fitness!");
});

// Start server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Listening on port ${PORT}');
});