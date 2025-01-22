import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function TrackProgress() {
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProgressData(data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };
    fetchProgress();
  }, []);

  const chartData = {
    labels: progressData.dates || [],
    datasets: [
      {
        label: 'Progress Over Time',
        data: progressData.values || [],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>Track Progress</h1>
      {progressData.dates ? (
        <Bar data={chartData} />
      ) : (
        <p>Loading progress data...</p>
      )}
    </div>
  );
}

export default TrackProgress;
