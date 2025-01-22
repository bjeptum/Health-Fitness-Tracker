import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Calendar, Clock, Award, Activity, User } from "lucide-react";

function WorkoutPage() {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [activeWorkout, setActiveWorkout] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/workout-plans/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWorkoutPlan(data);
        setProgress(Math.floor(Math.random() * 100));
      } catch (error) {
        console.error("Error fetching workout plan:", error);
      }
    };
    fetchPlan();
  }, [id]);

  if (!workoutPlan) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const totalDuration = workoutPlan.workouts.reduce(
    (acc, workout) => acc + workout.duration,
    0
  );

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        {/* Header Section */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="display-6 fw-bold">{workoutPlan.name}</h1>
                <p className="text-muted">{workoutPlan.description}</p>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <div className="d-flex align-items-center justify-content-center">
                    <Clock className="me-2 text-primary" />
                    <span className="fw-semibold text-primary">
                      {totalDuration} minutes total
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Activity className="text-success me-3" size={32} />
                  <div className="flex-grow-1">
                    <h3 className="h5 fw-semibold">Progress</h3>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <small className="text-muted mt-2 d-block">
                      {progress}% Complete
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Award className="text-purple me-3" size={32} />
                  <div>
                    <h3 className="h5 fw-semibold">Difficulty</h3>
                    <div className="d-flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`${i < 3 ? "text-purple" : "text-muted"}`}
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <User className="text-warning me-3" size={32} />
                  <div>
                    <h3 className="h5 fw-semibold">Target Level</h3>
                    <span className="text-warning fw-medium">Intermediate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workout List */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h3 fw-bold mb-4">Workout Schedule</h2>
            <div className="row g-4">
              {workoutPlan.workouts.map((workout, index) => (
                <div className="col-md-6" key={index}>
                  <div
                    className={`card ${
                      activeWorkout === index
                        ? "border-primary bg-primary bg-opacity-10"
                        : "bg-light"
                    } h-100 cursor-pointer`}
                    onClick={() => setActiveWorkout(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h3 className="h5 fw-semibold">{workout.name}</h3>
                          <p className="text-muted">{workout.description}</p>
                        </div>
                        <div className="bg-white rounded-circle p-2 shadow-sm">
                          <Clock className="text-primary" size={20} />
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="badge bg-primary">
                          {workout.duration} minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutPage;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function WorkoutPage() {
//   const { id } = useParams();
//   const [workoutPlan, setWorkoutPlan] = useState(null);

//   useEffect(() => {
//     const fetchPlan = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get(`http://localhost:8000/api/workout-plans/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setWorkoutPlan(data);
//       } catch (error) {
//         console.error('Error fetching workout plan:', error);
//       }
//     };
//     fetchPlan();
//   }, [id]);

//   if (!workoutPlan) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{workoutPlan.name}</h1>
//       <p>{workoutPlan.description}</p>
//       <ul>
//         {workoutPlan.workouts.map((workout, index) => (
//           <li key={index}>{workout.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default WorkoutPage;
