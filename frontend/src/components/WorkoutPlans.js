import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const mockWorkoutPlansInit = [
  {
    name: "Cardio Blast",
    description: "Get your heart racing with this full-body burn!",
    workouts: [
      {
        name: "Jumping Jacks",
        description: "3 sets of 20. Get that blood pumping!",
        duration: 5,
      },
      {
        name: "Jogging",
        description: "Run at a comfy pace for 30 minutes and feel the burn",
        duration: 30,
      },
      {
        name: "Cycling",
        description: "Pedal away for 45 minutes—steady and strong!",
        duration: 45,
      },
    ],
  },
  {
    name: "Muscle Strength Training",
    description: "Time to build those muscles and feel unstoppable",
    workouts: [
      {
        name: "Squats",
        description: "3 sets of 10. Feel the burn in those legs!",
        duration: 15,
      },
      {
        name: "Push-ups",
        description: "3 setd of 15. Let's power up those arms and chest!",
        duration: 10,
      },
      {
        name: "Pull-ups",
        description: "3 sets of 8. Show off your upper body strength",
        duration: 20,
      },
    ],
  },
];

const WorkoutPlans = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [mockWorkoutPlans, setMockWorkoutsPlan] =
    useState(mockWorkoutPlansInit);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    workouts: [],
  });
  const [currentWorkout, setCurrentWorkout] = useState({
    name: "",
    description: "",
    duration: "",
  });
  const [showPredefinedPlans, setShowPredefinedPlans] = useState(false);
  const navigate = useNavigate();

  // Fetch workout plans
  useEffect(() => {
    fetchWorkoutPlans();
    fetchMorkPlans();
  }, []);

  const fetchWorkoutPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/workout-plans`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWorkoutPlans(data);
    } catch (error) {
      console.error("Error fetching workout plans:", error);
    }
  };
  const fetchMorkPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/mock-plans`);
      setMockWorkoutsPlan(data);
    } catch (error) {
      console.error("Error fetching workout plans:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedPlan
        ? `${process.env.REACT_APP_API_URL}/api/workout-plans/${selectedPlan._id}`
        : `${process.env.REACT_APP_API_URL}/api/workout-plans`;
      const method = selectedPlan ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchWorkoutPlans();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving workout plan:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout plan?")) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/workout-plans/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchWorkoutPlans();
      } catch (error) {
        console.error("Error deleting workout plan:", error);
      }
    }
  };

  const addWorkout = () => {
    if (
      currentWorkout.name &&
      currentWorkout.description &&
      currentWorkout.duration
    ) {
      setFormData({
        ...formData,
        workouts: [...formData.workouts, { ...currentWorkout }],
      });
      setCurrentWorkout({ name: "", description: "", duration: "" });
    }
  };

  const removeWorkout = (index) => {
    const updatedWorkouts = formData.workouts.filter((_, i) => i !== index);
    setFormData({ ...formData, workouts: updatedWorkouts });
  };

  const editPlan = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      workouts: plan.workouts,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", workouts: [] });
    setCurrentWorkout({ name: "", description: "", duration: "" });
    setSelectedPlan(null);
    setShowForm(false);
  };

  const handleSelectPredefinedPlan = (plan) => {
    setFormData({
      name: plan.name,
      description: plan.description,
      workouts: plan.workouts,
    });
    setShowPredefinedPlans(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Workout Plan Management</h1>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add New Plan"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowPredefinedPlans(!showPredefinedPlans)}
          >
            Use Predefined Plan
          </button>
        </div>
      </div>

      {showPredefinedPlans && (
        <div className="card mb-4">
          <div className="card-body">
            <h3>Select a Predefined Plan</h3>
            <div className="list-group">
              {mockWorkoutPlans.map((plan, index) => (
                <button
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectPredefinedPlan(plan)}
                >
                  <h5>{plan.name}</h5>
                  <p>{plan.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h3>
              {selectedPlan ? "Edit Workout Plan" : "Create New Workout Plan"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Plan Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <h4>Workouts</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Workout Name"
                        value={currentWorkout.name}
                        onChange={(e) =>
                          setCurrentWorkout({
                            ...currentWorkout,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={currentWorkout.description}
                        onChange={(e) =>
                          setCurrentWorkout({
                            ...currentWorkout,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Duration (minutes)"
                        value={currentWorkout.duration}
                        onChange={(e) =>
                          setCurrentWorkout({
                            ...currentWorkout,
                            duration: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={addWorkout}
                      >
                        Add Workout
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="list-group mb-3">
                {formData.workouts.map((workout, index) => (
                  <div
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5 className="mb-1">{workout.name}</h5>
                      <p className="mb-1">{workout.description}</p>
                      <small>{workout.duration} minutes</small>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeWorkout(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {selectedPlan ? "Update Plan" : "Create Plan"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {workoutPlans.map((plan) => (
          <div key={plan._id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{plan.name}</h5>
                <p className="card-text">{plan.description}</p>
                <h6>Workouts:</h6>
                <ul className="list-group mb-3">
                  {plan.workouts.map((workout, index) => (
                    <li key={index} className="list-group-item">
                      <h6>{workout.name}</h6>
                      <p className="mb-1">{workout.description}</p>
                      <small>{workout.duration} minutes</small>
                    </li>
                  ))}
                </ul>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(`/workout-plans/${plan._id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => editPlan(plan)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(plan._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlans;
