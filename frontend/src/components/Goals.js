import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    goalType: "",
    targetValue: "",
    currentValue: "",
    deadline: "",
  });
  const [editingId, setEditingId] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await api.get("/goals");
      setGoals(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch goals. Please try again later.");
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/goals/${editingId}`, formData);
      } else {
        await api.post("/goals", formData);
      }
      fetchGoals();
      resetForm();
    } catch (err) {
      setError("Failed to save goal. Please check your input and try again.");
      console.error("Error saving goal:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await api.delete(`/goals/${id}`);
        fetchGoals();
      } catch (err) {
        setError("Failed to delete goal. Please try again later.");
        console.error("Error deleting goal:", err);
      }
    }
  };

  const handleEdit = (goal) => {
    setFormData({
      goalType: goal.goalType,
      targetValue: goal.targetValue,
      currentValue: goal.currentValue,
      deadline: format(new Date(goal.deadline), "yyyy-MM-dd"),
    });
    setEditingId(goal._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      goalType: "",
      targetValue: "",
      currentValue: "",
      deadline: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">My Goals</h1>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "Add New Goal"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  {editingId ? "Edit Goal" : "Create New Goal"}
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Goal Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.goalType}
                      onChange={(e) =>
                        setFormData({ ...formData, goalType: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Target Value</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.targetValue}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetValue: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Current Value</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.currentValue}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentValue: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.deadline}
                      onChange={(e) =>
                        setFormData({ ...formData, deadline: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success">
                      {editingId ? "Update Goal" : "Create Goal"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {goals.map((goal) => (
          <div key={goal._id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{goal.goalType}</h5>
                <div className="progress mb-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${calculateProgress(
                        goal.currentValue,
                        goal.targetValue
                      )}%`,
                    }}
                    aria-valuenow={calculateProgress(
                      goal.currentValue,
                      goal.targetValue
                    )}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {calculateProgress(goal.currentValue, goal.targetValue)}%
                  </div>
                </div>
                <p className="card-text">
                  Progress: {goal.currentValue} / {goal.targetValue}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Deadline: {goal.deadline}
                  </small>
                </p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEdit(goal)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(goal._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {goals.length === 0 && !loading && (
        <div className="text-center py-5">
          <p className="text-muted">
            No goals found. Create your first goal to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default Goals;
