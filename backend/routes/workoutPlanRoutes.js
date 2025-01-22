// Workout plans routes
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  scheduleWorkout,
  getWorkoutPlanById,
} = require('../controllers/workoutPlanController');

const router = express.Router();

router.route('/')
  .post(protect, createWorkoutPlan)
  .get(protect, getWorkoutPlans);

router.route('/:id')
  .get(protect, getWorkoutPlanById)
  .put(protect, updateWorkoutPlan)
  .delete(protect, deleteWorkoutPlan);

router.route('/:id/schedule').put(protect, scheduleWorkout);


module.exports = router;
