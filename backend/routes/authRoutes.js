// API route definitions
// Routes for user auth (register, login)
const express = require('express');
const { login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.get('/profile', protect, getProfile); // Protected route

module.exports = router;
