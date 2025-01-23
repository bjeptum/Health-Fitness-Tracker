const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema( {
        name: { 
            type: String,
            required: true
        },
        description: { 
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true 
        },
});

const workoutPlanSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true
        },
        description: { 
            type: String,
            required: true
        },
        workouts: [workoutSchema],
        },
        { timestamps: true });

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;
