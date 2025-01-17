import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function WorkoutPage() {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`http://localhost:8000/api/workout-plans/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkoutPlan(data);
      } catch (error) {
        console.error('Error fetching workout plan:', error);
      }
    };
    fetchPlan();
  }, [id]);

  if (!workoutPlan) return <div>Loading...</div>;

  return (
    <div>
      <h1>{workoutPlan.name}</h1>
      <p>{workoutPlan.description}</p>
      <ul>
        {workoutPlan.workouts.map((workout, index) => (
          <li key={index}>{workout.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutPage;