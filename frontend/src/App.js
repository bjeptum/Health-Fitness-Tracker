// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Goals from './components/Goals';
import ExerciseForm from './components/ExerciseForm';
import GoalForm from './components/GoalForm';

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/goals" element={token ? <Goals /> : <Navigate to="/login" />} />
                <Route path="/add-exercise" element={token ? <ExerciseForm /> : <Navigate to="/login" />} />
                <Route path="/add-goal" element={token ? <GoalForm /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
