import React, { useState, useEffect } from "react";
import axios from "axios";

const ExerciseTracker = () => {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    sets: "",
    reps: "",
    weight: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/exercise`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   const data = await response.json();
      setExercises(data);
    } catch (err) {
      setError("Failed to fetch exercises");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode
        ? `${process.env.REACT_APP_API_URL}/api/exercise/${editId}`
        : `${process.env.REACT_APP_API_URL}/api/exercise`;
      const method = editMode ? "put" : "post";

      await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      });

      await fetchExercises();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/exercise/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await fetchExercises();
    } catch (err) {
      setError("Failed to delete exercise");
    }
  };

  const handleEdit = (exercise) => {
    setFormData(exercise);
    setEditMode(true);
    setEditId(exercise._id);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      sets: "",
      reps: "",
      weight: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditMode(false);
    setEditId(null);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">
                {editMode ? "Edit Exercise" : "Add Exercise"}
              </h3>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Exercise Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="strength">Strength</option>
                    <option value="cardio">Cardio</option>
                    <option value="flexibility">Flexibility</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Sets</label>
                  <input
                    type="number"
                    className="form-control"
                    name="sets"
                    value={formData.sets}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Reps</label>
                  <input
                    type="number"
                    className="form-control"
                    name="reps"
                    value={formData.reps}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Weight (lbs)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    {editMode ? "Update Exercise" : "Add Exercise"}
                  </button>
                  {editMode && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Exercise Log</h3>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Sets</th>
                      <th>Reps</th>
                      <th>Weight</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercises.map((exercise) => (
                      <tr key={exercise._id}>
                        <td>{exercise.name}</td>
                        <td>{exercise.type}</td>
                        <td>{exercise.sets}</td>
                        <td>{exercise.reps}</td>
                        <td>{exercise.weight}</td>
                        <td>{new Date(exercise.date).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(exercise)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(exercise._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTracker;
