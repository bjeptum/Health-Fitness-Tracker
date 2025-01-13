import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

function Home() {
    const [exercises, setExercises] = useState([]);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const headers = { Authorization: `Bearer ${token}` };

                const exerciseResponse = await axios.get('http://localhost:8000/api/exercise', { headers });
                console.log("Exercises:", exerciseResponse.data);
                setExercises(exerciseResponse.data);

                const goalsResponse = await axios.get('http://localhost:8000/api/goals', { headers });
                setGoals(goalsResponse.data);
            } catch (err) {
                setError('Failed to fetch data. Please try again.');
            }
        };
        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="home">
            <div className="header">
                <h1>Welcome to Your Fitness Tracker</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            {error && <p className="error">{error}</p>}

            <section className="data-section">
                <h2>Your Exercises</h2>
                <div className="data-list">
                    {exercises.length > 0 ? (
                        exercises.map((exercise) => (
                            <div key={exercise._id} className="data-item">
                                <h3>{exercise.name}</h3>
                                <p>Type: {exercise.type}</p>
                                <p>Sets: {exercise.sets}</p>
                                <p>Reps: {exercise.reps}</p>
                                {exercise.weight && <p>Weight: {exercise.weight} kg</p>}
                                <p>Date: {exercise.date ? new Date(exercise.date).toLocaleDateString() : 'No Date Available'}</p>
                            </div>
                        ))
                    ) : (
                        <p>No exercises logged yet.</p>
                    )}
                </div>
                <button className="action-button" onClick={() => navigate('/add-exercise')}>Add Exercise</button>
            </section>

            <section className="data-section">
                <h2>Your Goals</h2>
                <div className="data-list">
                    {goals.length > 0 ? (
                        goals.map((goal) => (
                            <div key={goal._id} className="data-item">
                                <h3>{goal.goalType}</h3>
                                <p>Target Value: {goal.targetValue}</p>
                                <p>Current Value: {goal.currentValue || 0}</p>
                                {goal.deadline && <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>}
                            </div>
                        ))
                    ) : (
                        <p>No goals set yet.</p>
                    )}
                </div>
                <button className="action-button" onClick={() => navigate('/add-goal')}>Add Goal</button>
            </section>
        </div>
    );
}

export default Home;
