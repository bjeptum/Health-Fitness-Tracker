// Logic for handling API requests
// Goal related CRUD 
const { goalValidationSchema } = require('../utils/validators');
const Goal = require('../models/goal');

exports.createGoal = async (req, res) => {
    const { title, description, targetDate } = req.body;

    try {
        const { error } = goalValidationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ message: 'Validation failed', details: error.details });
        }

        const { goalType, targetValue, currentValue, deadline } = req.body;

        const goal = new Goal({
            user: req.user._id,
            goalType,
            targetValue,
            currentValue,
            deadline,
        });

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await goal.remove();
        res.json({ message: 'Goal removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
