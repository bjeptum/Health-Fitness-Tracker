//Workout Plans related CRUD
const WorkoutPlan = require('../models/workoutPlan');
const mockWorkoutPlans = require('../utils/mockData');


exports.createWorkoutPlan = async (req, res) => {
  try {
    const { name, description, workouts, useMockData } = req.body;

    let workoutPlanData;

    if (useMockData) {
      const randomPlan = mockWorkoutPlans[Math.floor(Math.random() * mockWorkoutPlans.length)];
      workoutPlanData = { 
        name: randomPlan.name, 
        description: randomPlan.description, 
        workouts: randomPlan.workouts 
      };
    } else if (workouts && workouts.length > 0) {
      workoutPlanData = { name, description, workouts };
    }
    const workoutPlan = new WorkoutPlan({ workoutPlanData});
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

exports.getWorkoutPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const workoutPlan = await WorkoutPlan.findById(id);

    if (!workoutPlan) {
      return res.status(404).json({ message: "Workout plan not found" });
    }

    res.json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout plan", error });
  }
};
