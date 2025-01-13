import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Goals() {
    const [goals, setGoals] = useState([]);
    const [goalData, setGoalData] = useState({ goalType: '', targetValue: 0 });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('http://localhost:8000/api/goals', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGoals(data);
            } catch (err) {
                setError('Failed to fetch goals.');
            }
        };
        fetchGoals();
    }, []);

    const handleCreateGoal = async () => {
        if (!goalData.goalType || goalData.targetValue <= 0) {
            alert('Invalid inputs!');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/goals', goalData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoalData({ goalType: '', targetValue: 0 });
        } catch (err) {
            setError('Failed to create goal.');
        }
    };

    return (
        <div>
            <h2>Goals</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
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
                <button onClick={handleCreateGoal}>Add Goal</button>
            </form>
            <ul>
                {goals.map((goal) => (
                    <li key={goal._id}>{goal.goalType} - {goal.targetValue}</li>
                ))}
            </ul>
        </div>
    );
}

export default Goals;