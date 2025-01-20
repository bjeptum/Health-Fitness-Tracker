import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, ProgressBar, Card, Form, Alert } from "react-bootstrap";
import { PlusCircle, Pencil, Trash, CheckCircle } from "react-bootstrap-icons";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [goalData, setGoalData] = useState({
    goalType: "",
    targetValue: 0,
    currentValue: 0,
    deadline: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editGoalId, setEditGoalId] = useState(null);
  const [deleteGoalId, setDeleteGoalId] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:8000/api/goals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(data);
    } catch (err) {
      setError("Failed to fetch goals.");
    }
  };

  const handleCreateOrUpdateGoal = async () => {
    if (!goalData.goalType || goalData.targetValue <= 0 || !goalData.deadline) {
      alert("Please fill all fields correctly!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (editGoalId) {
        await axios.put(
          `http://localhost:8000/api/goals/${editGoalId}`,
          goalData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/goals", goalData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setGoalData({
        goalType: "",
        targetValue: 0,
        currentValue: 0,
        deadline: "",
      });
      setEditGoalId(null);
      setShowModal(false);
      fetchGoals();
    } catch (err) {
      setError("Failed to save goal.");
    }
  };

  const handleDeleteGoal = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/goals/${deleteGoalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteGoalId(null);
      fetchGoals();
    } catch (err) {
      setError("Failed to delete goal.");
    }
  };

  const handleEditClick = (goal) => {
    setGoalData({
      goalType: goal.goalType,
      targetValue: goal.targetValue,
      currentValue: goal.currentValue,
      deadline: goal.deadline,
    });
    setEditGoalId(goal._id);
    setShowModal(true);
  };

  return (
    <div className="goals-container">
      <h2 className="text-center mb-4">Your Goals</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Add Goal Button */}
      <div className="text-center mb-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <PlusCircle size={20} className="me-2" />
          Add New Goal
        </Button>
      </div>

      {/* Goals List */}
      <div className="row">
        {goals.map((goal) => (
          <div key={goal._id} className="col-md-6 col-lg-4 mb-4">
            <Card className="goal-card">
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {goal.goalType}
                  <div>
                    <Button
                      variant="link"
                      onClick={() => handleEditClick(goal)}
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => setDeleteGoalId(goal._id)}
                    >
                      <Trash size={18} />
                    </Button>
                  </div>
                </Card.Title>
                <Card.Text>
                  <strong>Target:</strong> {goal.targetValue}
                  <br />
                  <strong>Progress:</strong> {goal.currentValue} /{" "}
                  {goal.targetValue}
                  <ProgressBar
                    now={(goal.currentValue / goal.targetValue) * 100}
                    label={`${Math.round(
                      (goal.currentValue / goal.targetValue) * 100
                    )}%`}
                    className="my-2"
                  />
                  <strong>Deadline:</strong>{" "}
                  {new Date(goal.deadline).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Add/Edit Goal Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editGoalId ? "Edit Goal" : "Add New Goal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Goal Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Weight Loss, Running Distance"
                value={goalData.goalType}
                onChange={(e) =>
                  setGoalData({ ...goalData, goalType: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Target Value</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g., 10 kg, 5 km"
                value={goalData.targetValue}
                onChange={(e) =>
                  setGoalData({
                    ...goalData,
                    targetValue: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Current Value</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g., 5 kg, 2 km"
                value={goalData.currentValue}
                onChange={(e) =>
                  setGoalData({
                    ...goalData,
                    currentValue: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={goalData.deadline}
                onChange={(e) =>
                  setGoalData({ ...goalData, deadline: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateOrUpdateGoal}>
            {editGoalId ? "Update Goal" : "Add Goal"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={!!deleteGoalId} onHide={() => setDeleteGoalId(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this goal?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteGoalId(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteGoal}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Goals;
