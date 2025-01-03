// API route definitions
// Exercise-related routes
const express = require('express');
const {
    createExercise,
    getExercises,
    updateExercise,
    deleteExercise,
} = require('../controllers/exerciseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createExercise)
    .get(protect, getExercises);

router.route('/:id')
    .put(protect, updateExercise)
    .delete(protect, deleteExercise);

module.exports = router;
