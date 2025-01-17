import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ScheduleWorkout() {
  const { id } = useParams();
  const [scheduledDateTime, setScheduledDateTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSchedule = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/workout-plans/${id}/schedule`,
        { scheduledDateTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Workout successfully scheduled!');
    } catch (error) {
      console.error('Error scheduling workout:', error);
      setMessage('Failed to schedule workout.');
    }
  };

  return (
    <div>
      <h1>Schedule Workout</h1>
      <input
        type="datetime-local"
        value={scheduledDateTime}
        onChange={(e) => setScheduledDateTime(e.target.value)}
      />
      <button onClick={handleSchedule}>Schedule</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ScheduleWorkout;
