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

// CSS variables (define in a global CSS file or use a CSS-in-JS solution)
const style = {
  "--primary-color": "#4F46E5",
  "--primary-hover": "#4338CA",
  "--secondary-color": "#6B7280",
  "--accent-color": "#10B981",
  "--danger-color": "#EF4444",
  "--light-bg": "#F9FAFB",
  "--hover-bg": "#F3F4F6",
  "--border-color": "#E5E7EB",
  "--gradient-bg": "linear-gradient(135deg, #4F46E5, #10B981)",
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Manages dropdown state
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const notifications = [
    { id: 1, text: "You've reached your daily goal! 🎉", time: "2m ago" },
    { id: 2, text: "New workout plan available 💪", time: "1h ago" },
    { id: 3, text: "Complete your profile 📝", time: "5h ago" },
  ];

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const NavLink = ({ to, icon, label }) => (
    <li className="nav-item px-1">
      <Link
        to={to}
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
        onClick={closeDropdowns}
      >
        {icon}
        {label}
      </Link>
    </li>
  );

  const NotificationsDropdown = () => (
    <div className="dropdown">
      <button
        className="btn position-relative p-2"
        onClick={() => toggleDropdown("notifications")}
        aria-label="Notifications"
        aria-expanded={activeDropdown === "notifications"}
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
          activeDropdown === "notifications" ? "show" : ""
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
            <div
              key={notification.id}
              className="dropdown-item px-3 py-3 border-bottom"
              style={{ transition: "all 0.2s" }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--hover-bg)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <p className="mb-0" style={{ color: "var(--secondary-color)" }}>
                {notification.text}
              </p>
              <small style={{ color: "var(--secondary-color)" }}>
                {notification.time}
              </small>
            </div>
          ))}
        </div>
        <div
          className="p-2 text-center border-top"
          style={{ backgroundColor: "var(--light-bg)" }}
        >
          <Link
            to="/notifications"
            className="small text-decoration-none"
            style={{ color: "var(--primary-color)" }}
          >
            View all notifications
          </Link>
        </div>
      </div>
    </div>
  );

  const UserDropdown = () => (
    <div className="dropdown">
      <button
        className="btn d-flex align-items-center gap-2 text-decoration-none p-2"
        onClick={() => toggleDropdown("user")}
        aria-label="User menu"
        aria-expanded={activeDropdown === "user"}
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
          onError={(e) => {
            e.target.src = "/path/to/fallback/image.png";
          }}
        />
        <span className="d-none d-lg-block fw-medium">John Doe</span>
      </button>
      <div
        className={`dropdown-menu dropdown-menu-end shadow-sm ${
          activeDropdown === "user" ? "show" : ""
        }`}
        style={{
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Link
          to="/profile"
          className="dropdown-item py-2 px-3"
          style={{ transition: "all 0.2s" }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--hover-bg)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          <User size={16} className="me-2" />
          Profile
        </Link>
        <Link
          to="/settings"
          className="dropdown-item py-2 px-3"
          style={{ transition: "all 0.2s" }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--hover-bg)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          <Settings size={16} className="me-2" />
          Settings
        </Link>
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
  );

  return (
    <header className="fixed-top shadow-sm app-header" style={style}>
      <nav
        className="navbar navbar-expand-sm py-2"
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
            <span className="fs-4 fw-bold">JengaFit</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: "var(--secondary-color)" }}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Main Navigation */}
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {[
                {
                  name: "Dashboard",
                  icon: <HeartPulse size={18} />,
                  path: "/",
                },
                {
                  name: "Workout-plans",
                  icon: <Dumbbell size={18} />,
                  path: "/workout-plans",
                },
                {
                  name: "Nutrition",
                  icon: <Trophy size={18} />,
                  path: "/nutrition",
                },
                { name: "Goals", icon: <Trophy size={18} />, path: "/goals" },
              ].map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  icon={item.icon}
                  label={item.name}
                />
              ))}
            </ul>

            {/* Right Side Icons */}
            <div className="d-flex align-items-center gap-3">
              <NotificationsDropdown />
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
              <UserDropdown />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
