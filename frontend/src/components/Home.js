import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Activity,
  Target,
  Calendar,
  Clock,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [goalsResponse, exerciseResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/goals`, { headers }),
          axios.get(`${process.env.REACT_APP_API_URL}/api/exercise`, { headers }),
        ]);
        setExercises(exerciseResponse.data);
        setGoals(goalsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Sample data for charts
  const weeklyData = [
    { name: "Mon", calories: 350, duration: 45 },
    { name: "Tue", calories: 420, duration: 60 },
    { name: "Wed", calories: 280, duration: 30 },
    { name: "Thu", calories: 510, duration: 75 },
    { name: "Fri", calories: 390, duration: 55 },
    { name: "Sat", calories: 480, duration: 65 },
    { name: "Sun", calories: 300, duration: 40 },
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Main Content */}
      <div className="container py-4">
        <div className="mb-4">
          <h1 className="display-5 fw-bold">Your Dashboard</h1>
          <p className="text-muted">
            Track your fitness journey and achievements
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100">
              <div className="card-body d-flex align-items-center">
                <Activity className="text-primary" size={32} />
                <div className="ms-3">
                  <h6 className="card-subtitle mb-1 text-muted">
                    Total Workouts
                  </h6>
                  <h2 className="card-title mb-0">{exercises.length}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100">
              <div className="card-body d-flex align-items-center">
                <Target className="text-primary" size={32} />
                <div className="ms-3">
                  <h6 className="card-subtitle mb-1 text-muted">
                    Active Goals
                  </h6>
                  <h2 className="card-title mb-0">{goals.length}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100">
              <div className="card-body d-flex align-items-center">
                <Calendar className="text-primary" size={32} />
                <div className="ms-3">
                  <h6 className="card-subtitle mb-1 text-muted">Streak</h6>
                  <h2 className="card-title mb-0">7 days</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100">
              <div className="card-body d-flex align-items-center">
                <TrendingUp className="text-primary" size={32} />
                <div className="ms-3">
                  <h6 className="card-subtitle mb-1 text-muted">Progress</h6>
                  <h2 className="card-title mb-0">85%</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Weekly Calories Burned</h5>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="calories"
                        stroke="#0d6efd"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Workout Duration</h5>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="duration" fill="#0d6efd" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity and Goals */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">Recent Exercises</h5>
                {exercises.length > 0 ? (
                  <div className="list-group list-group-flush">
                    {exercises.slice(0, 5).map((exercise) => (
                      <div
                        key={exercise._id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <Activity className="text-primary me-3" size={20} />
                          <div>
                            <h6 className="mb-0">{exercise.name}</h6>
                            <small className="text-muted">
                              {exercise.type}
                            </small>
                          </div>
                        </div>
                        <Clock size={20} className="text-muted" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No exercises available yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">Active Goals</h5>
                {goals.length > 0 ? (
                  <div className="list-group list-group-flush">
                    {goals.map((goal) => (
                      <div key={goal._id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <Target className="text-primary me-3" size={20} />
                            <div>
                              <h6 className="mb-0">{goal.goalType}</h6>
                              <small className="text-muted">
                                Target: {goal.targetValue}
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="progress" style={{ height: "5px" }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "45%" }}
                            aria-valuenow="45"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No goals set yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
