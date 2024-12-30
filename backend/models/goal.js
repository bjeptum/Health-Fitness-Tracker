// Goal schema( date, steps, caloriesBurned, distanceCovered, weight)
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    goalType: {
        type: String,
        required: true,
    },
    targetValue: {
        type: Number,
        required: true,
    },
    currentValue: {
        type: Number,
        required: true,
    },
    deadline: {
        type: Date,
        required: false,
    },
    progress: {
        type: Number,
        default: 0,
    },
},
{
    timestamps: true,
}
);

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;