// Logic for handling API requests
// Exercise log CRUD operations
const { exerciseValidationSchema } = require('../utils/validators');
const Exercise = require ('../models/exercise');

exports.createExercise = async (req, res) => {
    const { name, sets, reps, weight, date } = req.body;

    try {
        const { error } = exerciseValidationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ message: 'Validation failed', details: error.details });
        }
        const { name, type, sets, reps, weight, date } = req.body;

        const exercise = new Exercise({
            user: req.user._id,
            name,
            type,
            sets,
            reps,
            weight,
            date,
        });

        const savedExercise = await exercise.save();
        res.status(201).json(savedExercise);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({ user: req.user._id });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        if (exercise.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExercise);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        if (exercise.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await exercise.remove();
        res.json({ message: 'Exercise removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
