// Exercise log schema
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["strength", "cardio", "aerobics", "flexibility"],
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
},
{
    timestamps: true,
}
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
