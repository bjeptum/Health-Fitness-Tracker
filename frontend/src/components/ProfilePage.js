import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ProgressBar,
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  Button,
  Image,
  Badge,
} from "react-bootstrap";
import {
  FaEdit,
  FaMedal,
  FaTrophy,
  FaDumbbell,
  FaCalendarCheck,
} from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [userResponse, progressResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.REACT_APP_API_URL}/api/progress`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUser(userResponse.data);
        setProgressData(progressResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5 mx-auto w-75">
        <i className="fas fa-exclamation-circle me-2"></i>
        {error}
      </div>
    );
  }

  const getProgressVariant = (progress) => {
    if (progress >= 75) return "success";
    if (progress >= 50) return "info";
    if (progress >= 25) return "warning";
    return "danger";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "goal":
        return <FaTrophy className="text-warning" />;
      case "exercise":
        return <FaDumbbell className="text-primary" />;
      case "workoutPlan":
        return <FaCalendarCheck className="text-success" />;
      default:
        return null;
    }
  };

  const Avatar = ({ name, size = 100, fontSize = 40 }) => {
    // Extract initials (first letter of first name and first letter of last name)
    const initials = name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white shadow"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${fontSize}px`,
          fontWeight: "bold",
        }}
      >
        {initials}
      </div>
    );
  };

  return (
    <Container fluid className="py-5 bg-light">
      {/* Profile Header */}
      <Container className="mb-5">
        <Card className="border-0 shadow-lg">
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={4} className="text-center">
                <div className="position-relative d-inline-block">
                  <Avatar name={user?.name} size={200} fontSize={60} />
                  <Button
                    variant="primary"
                    size="sm"
                    className="position-absolute bottom-0 end-0 rounded-circle p-2"
                  >
                    <FaEdit />
                  </Button>
                </div>
                <h2 className="fw-bold mb-1">{user?.name}</h2>
                <p className="text-muted mb-3">{user?.email}</p>
                <Badge bg="primary" className="me-2">
                  Pro Member
                </Badge>
                <Badge bg="success">Active</Badge>
              </Col>
              <Col md={8}>
                <Card className="border-0 bg-primary bg-opacity-10">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="fw-bold mb-0">About Me</h4>
                      <Button variant="outline-primary" size="sm">
                        <FaEdit className="me-2" />
                        Edit
                      </Button>
                    </div>
                    <Card.Text>
                      {user?.bio ||
                        "No bio available. Add a bio to tell us more about yourself!"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Progress Section */}
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">
            <FaMedal className="text-warning me-2" />
            Your Progress
          </h3>
          <Button variant="outline-primary">View All</Button>
        </div>
        <Row>
          {progressData.map((item, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      {getTypeIcon(item.type)}
                      <h5 className="fw-bold mb-0 ms-2">{item.name}</h5>
                    </div>
                    <Badge bg={item.type === "goal" ? "warning" : "info"}>
                      {item.type}
                    </Badge>
                  </div>

                  {item.type === "goal" && (
                    <>
                      <ProgressBar
                        now={item.progress}
                        label={`${item.progress}%`}
                        className="mb-3"
                        variant={getProgressVariant(item.progress)}
                        animated
                      />
                      <Card.Text className="text-muted">
                        {item.description}
                      </Card.Text>
                    </>
                  )}

                  {item.type === "exercise" && (
                    <ListGroup variant="flush">
                      <ListGroup.Item className="border-0 px-0">
                        <i className="far fa-calendar me-2"></i>
                        <strong>Date:</strong>{" "}
                        {new Date(item.date).toLocaleDateString()}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 px-0">
                        <i className="fas fa-chart-line me-2"></i>
                        <strong>Progress:</strong>{" "}
                        {item.progress || "Not tracked yet"}
                      </ListGroup.Item>
                    </ListGroup>
                  )}

                  {item.type === "workoutPlan" && (
                    <ListGroup variant="flush">
                      <ListGroup.Item className="border-0 px-0">
                        <i className="fas fa-check-circle me-2"></i>
                        <strong>Workouts:</strong>{" "}
                        <Badge bg="success">{item.progress}</Badge>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 px-0">
                        <i className="fas fa-info-circle me-2"></i>
                        <strong>Description:</strong> {item.description}
                      </ListGroup.Item>
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default ProfilePage;
