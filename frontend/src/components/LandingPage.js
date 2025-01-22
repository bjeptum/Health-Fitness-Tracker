import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="landing-page position-relative vh-100">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
      >
        <source src="/videos/fitness-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Section */}
      <div className="hero-section position-absolute top-50 start-50 translate-middle text-center text-white">
        <div className="hero-content">
          <h1 className="display-1 fw-bold mb-4">Welcome to JengaFit</h1>
          <p className="lead mb-4">
            Your personalized fitness journey starts here. Get Fit, Stay Fit!
          </p>
          <div className="hero-buttons d-flex gap-3 justify-content-center">
            <Link to="/register" className="btn btn-primary btn-lg px-4">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg px-4">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer position-absolute bottom-0 w-100 text-white text-center py-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <h3>About</h3>
              <Link to="/about" className="text-white text-decoration-none">
                About
              </Link>
            </div>
            <div className="col-md-4">
              <h3>Contact</h3>
              <a
                href="https://github.com/bjeptum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none me-3"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/brenda-jeptum-8bab79120/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <p className="mt-3 mb-0">
            &copy; 2025 JengaFit. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
