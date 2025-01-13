import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to JengaFit</h1>
        <p>Get Fit, Stay Fit</p>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>

            {localStorage.getItem('token') && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LandingPage;
