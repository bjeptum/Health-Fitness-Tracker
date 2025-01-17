//Workout Plans related CRUD
const WorkoutPlan = require('../models/workoutPlan');

exports.createWorkoutPlan = async (req, res) => {
  try {
    const { name, description, workouts } = req.body;
    const workoutPlan = new WorkoutPlan({ name, description, workouts });
    const savedPlan = await workoutPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout plan', error });
  }
};

exports.getWorkoutPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workout plans', error });
  }
};

exports.updateWorkoutPlan = async (req, res) => {
  try {
    const updatedPlan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout plan', error });
  }
};

exports.deleteWorkoutPlan = async (req, res) => {
  try {
    await WorkoutPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout plan deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout plan', error });
  }
};

exports.scheduleWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduledDateTime } = req.body;
    const updatedPlan = await WorkoutPlan.findByIdAndUpdate(id, { scheduledDateTime }, { new: true });
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling workout', error });
  }
};
