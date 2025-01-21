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
        name: exercise.name,
        progress: null,
        date: exercise.date,
      })),
      ...workoutPlans.map(workoutPlan => ({
        type: 'workoutPlan',
        name: workoutPlans.name,
        progress: workoutPlan.workouts?.length || 0,
        description: workoutPlan.description,
      })),

      ...goals.map(goal => ({
        type: 'goal',
        name: goal.goalType,
        progress: goal.progress || (goal.currentValue / goal.targetValue) * 100,
        description: goal.description,
      })),
    ];
    
    res.status(200).json(progress)
  } catch (error) {
    console.error('Error fetching progress data:', error);
    res.status(500).json({ message: 'Server error fetching progress data' });
  }
};
