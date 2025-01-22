import React, { useState } from 'react';
import axios from 'axios';

function ExerciseForm() {
    const [exerciseData, setExerciseData] = useState({
        name: '',
        type: '',
        sets: 0,
        reps: 0,
        weight: 0,
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${process.env.REACT_APP_API_URL}/api/exercise`, exerciseData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Exercise added successfully!');
            setExerciseData({ name: '', type: '', sets: 0, reps: 0, weight: 0 });
        } catch (err) {
            setError('Failed to add exercise.');
        }
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={exerciseData.name}
                    onChange={(e) => setExerciseData({ ...exerciseData, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Type"
                    value={exerciseData.type}
                    onChange={(e) => setExerciseData({ ...exerciseData, type: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Sets"
                    value={exerciseData.sets}
                    onChange={(e) => setExerciseData({ ...exerciseData, sets: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={exerciseData.reps}
                    onChange={(e) => setExerciseData({ ...exerciseData, reps: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Weight"
                    value={exerciseData.weight}
                    onChange={(e) => setExerciseData({ ...exerciseData, weight: Number(e.target.value) })}
                />
                <button type="submit">Add Exercise</button>
            </form>
        </div>
    );
}

export default ExerciseForm;