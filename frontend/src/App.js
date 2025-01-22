import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Goals from "./components/Goals";
import ExerciseForm from "./components/ExerciseForm";
import GoalForm from "./components/GoalForm";
import WorkoutPlans from "./components/WorkoutPlans";
import WorkoutPage from "./components/WorkoutPage";
import ScheduleWorkout from "./components/ScheduleWorkout";
import TrackProgress from "./components/TrackProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./layouts/Layout";
import ComingSoon from "./components/Cooming";
import ExerciseTracker from "./components/ExerciseTracker";
import ProfilePage from "./components/ProfilePage";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/goals"
            element={token ? <Goals /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-exercise"
            element={token ? <ExerciseForm /> : <Navigate to="/login" />}
          />
          <Route path="/settings" element={<ComingSoon />} />
          <Route path="/nutrition" element={<ComingSoon />} />
          <Route
            path="/add-goal"
            element={token ? <GoalForm /> : <Navigate to="/login" />}
          />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/workout-plans/:id" element={<WorkoutPage />} />
          <Route
            path="/workout-plans/:id/schedule"
            element={<ScheduleWorkout />}
          />
          <Route path="/progress" element={<TrackProgress />} />
          <Route path="/exercise" element={<ExerciseTracker />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
