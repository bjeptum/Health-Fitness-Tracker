import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaApple,
} from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100">
      <div className="register-card p-4 shadow-lg">
        <h2 className="text-center mb-4">Create an Account</h2>
        <p className="text-center mb-4 tagline">
          Join us and start your fitness journey today!
        </p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 register-button"
          >
            Register
          </button>
        </form>
        <div className="text-center my-3">— OR —</div>
        <div className="social-login d-flex justify-content-center gap-3">
          <button className="btn btn-social btn-google">
            <FaGoogle /> Google
          </button>
          <button className="btn btn-social btn-facebook">
            <FaFacebook /> Facebook
          </button>
          <button className="btn btn-social btn-apple">
            <FaApple /> Apple
          </button>
        </div>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none login-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
