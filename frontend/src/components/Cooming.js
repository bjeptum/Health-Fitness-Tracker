import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ComingSoon = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for subscribing! We'll keep you updated.");
      setEmail("");
    }
  };

  return (
    <div className="coming-soon-wrapper">
      <div className="particles">
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 4}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="row min-vh-100 align-items-center">
          <div className="col-12 col-md-10 col-lg-8 mx-auto">
            <div className="coming-soon-content text-center">
              <div className="logo-container mb-4">
                <i className="fas fa-rocket fa-3x"></i>
              </div>

              <h1 className="display-4 mb-4 fw-bold text-gradient">
                Coming Soon
              </h1>

              <p className="lead mb-5">
                We're working hard to bring you something amazing. Stay tuned
                for updates and be the first to know when we launch.
              </p>

              <div className="countdown row mb-5">
                <div className="col-3">
                  <div className="countdown-item">
                    <div className="countdown-number">
                      {String(countdown.days).padStart(2, "0")}
                    </div>
                    <div className="countdown-label">Days</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="countdown-item">
                    <div className="countdown-number">
                      {String(countdown.hours).padStart(2, "0")}
                    </div>
                    <div className="countdown-label">Hours</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="countdown-item">
                    <div className="countdown-number">
                      {String(countdown.minutes).padStart(2, "0")}
                    </div>
                    <div className="countdown-label">Minutes</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="countdown-item">
                    <div className="countdown-number">
                      {String(countdown.seconds).padStart(2, "0")}
                    </div>
                    <div className="countdown-label">Seconds</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="subscription-form mb-5">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-8">
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button className="btn btn-primary" type="submit">
                        Notify Me
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
