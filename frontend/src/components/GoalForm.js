import React, { useState } from 'react';
import axios from 'axios';

function GoalForm() {
    const [goalData, setGoalData] = useState({ goalType: '', targetValue: 0 });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/goals', goalData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Goal added successfully!');
            setGoalData({ goalType: '', targetValue: 0 });
        } catch (err) {
            setError('Failed to add goal.');
        }
    };

    return (
        <div>
            <h2>Add Goal</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Goal Type"
                    value={goalData.goalType}
                    onChange={(e) => setGoalData({ ...goalData, goalType: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Target Value"
                    value={goalData.targetValue}
                    onChange={(e) => setGoalData({ ...goalData, targetValue: Number(e.target.value) })}
                />
                <button type="submit">Add Goal</button>
            </form>
        </div>
    );
}

export default GoalForm;
