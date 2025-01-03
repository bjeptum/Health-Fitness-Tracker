// Logic for handling API requests
// Exercise log CRUD operations
const Exercise = ('../models/exercise');

exports.createExercise = async (req, res) => {
    const { name, sets, reps, weight, date } = req.body;

    try {
        const exercise = new Exercise({
            user: req.user._id,
            name,
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
