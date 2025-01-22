import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark ${
        isScrolled ? "bg-primary shadow-sm" : "bg-primary"
      } transition-all duration-300`}
    >
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center" href="/home">
          <span className="fs-5 fw-bold text-white">
            Jenga<span className="text-warning">Fit</span>
          </span>
        </a>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0 p-0"
          type="button"
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div
          className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}
        >
          <ul className="navbar-nav ms-auto d-flex flex-wrap">
            <li className="nav-item">
              <a className="nav-link text-white small px-2" href="/home">
                <i className="bi bi-speedometer2 me-1"></i>Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white small px-2"
                href="/workout-plans"
              >
                <i className="bi bi-calendar-check me-1"></i>Workouts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white small px-2" href="/goals">
                <i className="bi bi-trophy me-1"></i>Goals
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white small px-2" href="/exercise">
                <i className="bi bi-activity me-1"></i>Exercise
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white small px-2" href="/nutrition">
                <i className="bi bi-activity me-1"></i>Nutrition
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white small px-2" href="/profile">
                <i className="bi bi-person me-1"></i>Profile
              </a>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-danger btn-sm d-flex align-items-center px-2 py-2 rounded-pill"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
