import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Bell,
  User,
  Settings,
  LogOut,
  Dumbbell,
  HeartPulse,
  Trophy,
} from "lucide-react";

// Add this CSS to your global styles
const style = {
  "--primary-color": "#4F46E5", // Vibrant purple
  "--primary-hover": "#4338CA", // Darker purple
  "--secondary-color": "#6B7280", // Gray
  "--accent-color": "#10B981", // Vibrant green
  "--danger-color": "#EF4444", // Red
  "--light-bg": "#F9FAFB", // Light background
  "--hover-bg": "#F3F4F6", // Hover background
  "--border-color": "#E5E7EB", // Border color
  "--gradient-bg": "linear-gradient(135deg, #4F46E5, #10B981)", // Gradient background
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const notifications = [
    { id: 1, text: "You've reached your daily goal! 🎉", time: "2m ago" },
    { id: 2, text: "New workout plan available 💪", time: "1h ago" },
    { id: 3, text: "Complete your profile 📝", time: "5h ago" },
  ];

  return (
    <header className="fixed-top shadow-sm" style={style}>
      <nav
        className="navbar navbar-expand-lg py-2"
        style={{ backgroundColor: "white" }}
      >
        <div className="container">
          {/* Brand */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2"
            style={{ color: "var(--primary-color)" }}
          >
            <div
              className="rounded bg-gradient"
              style={{
                padding: "8px",
                background: "var(--gradient-bg)",
              }}
            >
              <Dumbbell size={24} color="white" />
            </div>
            <span className="fs-4 fw-bold">FitTrack</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: "var(--secondary-color)" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Main Navigation */}
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {[
                { name: "Dashboard", icon: <HeartPulse size={18} /> },
                { name: "Workouts", icon: <Dumbbell size={18} /> },
                { name: "Nutrition", icon: <Trophy size={18} /> },
                { name: "Goals", icon: <Trophy size={18} /> },
              ].map((item) => (
                <li className="nav-item px-1" key={item.name}>
                  <Link
                    to={
                      item.name === "Dashboard"
                        ? "/home"
                        : `/${item.name.toLowerCase()}`
                    }
                    className="nav-link fw-medium px-3 d-flex align-items-center gap-2"
                    style={{
                      color: "var(--secondary-color)",
                      borderRadius: "6px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "var(--hover-bg)";
                      e.target.style.color = "var(--primary-color)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "var(--secondary-color)";
                    }}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side Icons */}
            <div className="d-flex align-items-center gap-3">
              {/* Notifications */}
              <div className="dropdown">
                <button
                  className="btn position-relative p-2"
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{
                    color: "var(--secondary-color)",
                    borderRadius: "8px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "var(--hover-bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <Bell size={20} />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{ backgroundColor: "var(--danger-color)" }}
                  >
                    {notifications.length}
                  </span>
                </button>
                <div
                  className={`dropdown-menu dropdown-menu-end shadow-sm p-0 ${
                    showNotifications ? "show" : ""
                  }`}
                  style={{
                    minWidth: "320px",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="p-3 border-bottom"
                    style={{ backgroundColor: "var(--light-bg)" }}
                  >
                    <h6 className="mb-0 fw-semibold">Notifications</h6>
                  </div>
                  <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                    {notifications.map((notification) => (
                      <a
                        key={notification.id}
                        className="dropdown-item px-3 py-3 border-bottom"
                        href="#"
                        style={{ transition: "all 0.2s" }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "var(--hover-bg)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                        }}
                      >
                        <p
                          className="mb-0"
                          style={{ color: "var(--secondary-color)" }}
                        >
                          {notification.text}
                        </p>
                        <small style={{ color: "var(--secondary-color)" }}>
                          {notification.time}
                        </small>
                      </a>
                    ))}
                  </div>
                  <div
                    className="p-2 text-center border-top"
                    style={{ backgroundColor: "var(--light-bg)" }}
                  >
                    <a
                      className="small text-decoration-none"
                      href="#"
                      style={{ color: "var(--primary-color)" }}
                    >
                      View all notifications
                    </a>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <Link
                to="/settings"
                className="btn p-2"
                style={{
                  color: "var(--secondary-color)",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--hover-bg)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                <Settings size={20} />
              </Link>

              {/* User Profile */}
              <div className="dropdown">
                <button
                  className="btn d-flex align-items-center gap-2 text-decoration-none p-2"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  style={{
                    color: "var(--secondary-color)",
                    borderRadius: "8px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "var(--hover-bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <img
                    src="/api/placeholder/32/32"
                    className="rounded-circle"
                    alt="User"
                    width="32"
                    height="32"
                  />
                  <span className="d-none d-lg-block fw-medium">John Doe</span>
                </button>
                <div
                  className={`dropdown-menu dropdown-menu-end shadow-sm ${
                    showUserDropdown ? "show" : ""
                  }`}
                  style={{
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  {[
                    {
                      icon: <User size={16} />,
                      label: "Profile",
                      path: "/profile",
                    },
                    {
                      icon: <Settings size={16} />,
                      label: "Settings",
                      path: "/settings",
                    },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="dropdown-item py-2 px-3"
                      style={{ transition: "all 0.2s" }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "var(--hover-bg)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <span className="me-2">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item py-2 px-3"
                    style={{
                      color: "var(--danger-color)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "var(--hover-bg)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    <LogOut size={16} className="me-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
