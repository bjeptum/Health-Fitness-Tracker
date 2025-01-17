import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function WorkoutPlans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:8000/api/workout-plans', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlans(data);
      } catch (error) {
        console.error('Error fetching workout plans:', error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div>
      <h1>Workout Plans</h1>
      <ul>
        {plans.map((plan) => (
          <li key={plan._id}>
            <Link to={`/workout-plans/${plan._id}`}>{plan.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutPlans;
