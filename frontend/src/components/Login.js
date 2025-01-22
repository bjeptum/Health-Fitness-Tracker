import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: data._id, email: data.email, name: data.name })
      );

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      navigate("/home"); // Redirect to Home
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-card p-4 shadow-lg">
        <h2 className="text-center mb-4">Welcome Back!</h2>
        <p className="text-center mb-4 tagline">
          Track your fitness journey with us. Stay healthy, stay strong!
        </p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-decoration-none forgot-password"
            >
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="btn btn-primary w-100 login-button">
            Login
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
          Don't have an account?{" "}
          <a href="/register" className="text-decoration-none signup-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
