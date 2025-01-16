import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
                const goalsResponse = await axios.get('http://localhost:8000/api/goals', { headers });
                const exerciseResponse = await axios.get('http://localhost:8000/api/exercise', { headers });
                setExercises(exerciseResponse.data);
                setGoals(goalsResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again later.');
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
            <header className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/add-exercise">Add Exercise</Link></li>
                    <li><Link to="/add-goal">Add Goal</Link></li>
                    <li><Link to="/goals">Goals</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    {localStorage.getItem('token') && (
                        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                    )}
                </ul>
            </header>

            <div className="content">
                <h1>Your Dashboard</h1>

                {error && <p className="error">{error}</p>}

                <div className="section">
                    <h2>Goals</h2>
                    <ul>
                        {goals.length > 0 ? (
                            goals.map(goal => (
                                <li key={goal._id}>{goal.goalType} - {goal.targetValue}</li>
                            ))
                        ) : (
                            <li>No goals set yet.</li>
                        )}
                    </ul>
                </div>

                <div className="section">
                    <h2>Exercises</h2>
                    <ul>
                        {exercises.length > 0 ? (
                            exercises.map(exercise => (
                                <li key={exercise._id}>{exercise.name} - {exercise.type}</li>
                            ))
                        ) : (
                            <li>No exercises available yet.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;
