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
      {/* Background video */}
      <video autoPlay muted loop>
        <source src="/videos/fitness-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to JengaFit</h1>
          <p>Your personalized fitness journey starts here. Get Fit, Stay Fit!</p>
          <div className="hero-buttons">
            <Link to="/register" className="action-button">Get Started</Link>
            <Link to="/login" className="action-button">Login</Link>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="about">
            <h3>About</h3>
            <Link to="/about">About</Link>

          </div>
            <div className="social">
              <h3>Contact </h3>
              <a href="https://github.com/bjeptum" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/brenda-jeptum-8bab79120/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>

        <p>&copy; 2025 JengaFit. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
 );
};

export default LandingPage;
 