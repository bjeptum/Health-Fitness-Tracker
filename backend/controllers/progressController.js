// Progress CRUD operations
const Exercise = require('../models/exercise');
const WorkoutPlan = require('../models/workoutPlan');
const Goal = require('../models/goal');

exports.getProgressData = async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user._id });
    const workoutPlans = await WorkoutPlan.find({ user: req.user._id });
    const goals = await Goal.find({ user: req.user._id });

    const progress = [
      ...exercises.map(exercise => ({
        type: 'exercise',
        date: exercise.date.toISOString().split('T')[0],
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight || 0,
        exercise: exercise.name,
      })),
      ...workoutPlans.map(plan => ({
        type: 'workoutPlan',
        date: plan.date.toISOString().split('T')[0],
        plan: plan.name,
        details: plan.details,
        imageUrl: plan.imageUrl,
        workouts: plan.workouts.map(workout => ({
          name: workout.name,
          description: workout.description,
          duration: workout.duration,
        })),
      })),

      ...goals.map(goal => ({
        type: 'goal',
        targetDate: goal.targetDate.toISOString().split('T')[0],
        description: goal.description,
        targetValue: goal.targetValue,
      })),
    ];

    res.json({ user: req.user.name, progress });
  } catch (error) {
    console.error('Error fetching progress data:', error);
    res.status(500).json({ message: 'Server error fetching progress data' });
  }
};
