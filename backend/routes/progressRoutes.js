const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getProgressData } = require('../controllers/progressController');

const router = express.Router();

router.get('/', protect, getProgressData);

module.exports = router;